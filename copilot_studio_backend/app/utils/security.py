import base64
import json
from urllib.request import urlopen
import jwt
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric.rsa import RSAPublicNumbers
from fastapi import HTTPException


def ensure_bytes(key):
    if isinstance(key, str):
        key = key.encode("utf-8")
    return key


def decode_value(val):
    decoded = base64.urlsafe_b64decode(ensure_bytes(val) + b"==")
    return int.from_bytes(decoded, "big")


def rsa_pem_from_jwk(jwk):
    """Converts Microsoft's JSON Web Key format to a PEM formatted public key."""
    return (
        RSAPublicNumbers(n=decode_value(jwk["n"]), e=decode_value(jwk["e"]))
        .public_key(default_backend())
        .public_bytes(
            encoding=serialization.Encoding.PEM,
            format=serialization.PublicFormat.SubjectPublicKeyInfo,
        )
    )


def find_rsa_key(jwks, unverified_header):
    """Locates the correct public key matching the token's header key ID (kid)."""
    for key in jwks["keys"]:
        if key["kid"] == unverified_header["kid"]:
            return {
                "kty": key["kty"],
                "kid": key["kid"],
                "use": key["use"],
                "n": key["n"],
                "e": key["e"],
            }
    return None


def verify_azure_token(token: str, tenant_id: str, client_id: str) -> dict:
    """Fetches Microsoft's public keys, validates the token signature, and checks target audience."""
    try:
        # Microsoft's public keys endpoint
        jwks_url = f"https://login.microsoftonline.com/{tenant_id}/discovery/v2.0/keys"
        issuer_url = f"https://login.microsoftonline.com/{tenant_id}/v2.0"

        # Load public keys from Microsoft
        jwks = json.loads(urlopen(jwks_url).read())
        unverified_header = jwt.get_unverified_header(token)

        rsa_key = find_rsa_key(jwks, unverified_header)
        if not rsa_key:
            raise HTTPException(status_code=401, detail="Invalid token header metadata.")

        public_key = rsa_pem_from_jwk(rsa_key)

        # Cryptographically decode and validate token signatures and expiration timestamps
        decoded_claims = jwt.decode(
            token,
            public_key,
            verify=True,
            algorithms=["RS256"],
            audience=client_id,
            issuer=issuer_url,
        )
        return decoded_claims

    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Microsoft login session has expired.")
    except jwt.InvalidTokenError as e:
        raise HTTPException(status_code=401, detail=f"Invalid security token signature: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Token verification error: {str(e)}")