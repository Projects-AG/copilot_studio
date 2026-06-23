# Authentication router with token lifecycle endpoints.
from fastapi import APIRouter, Depends, Request, HTTPException
from authlib.integrations.starlette_client import OAuth
from app.config import get_settings, Settings
from app.utils.security import verify_azure_token

# Initialize a single router instance for all authentication routes
router = APIRouter(prefix="/api/auth", tags=["Authentication"])

# Initialize Authlib OAuth registry
oauth = OAuth()


# Helper dependency to fetch registered Microsoft client dynamically
def get_ms_client(settings: Settings = Depends(get_settings)):
    # Register if not already present in this instance
    if "microsoft" not in oauth._clients:
        oauth.register(
            name="microsoft",
            client_id=settings.AZURE_CLIENT_ID,
            client_secret=settings.AZURE_CLIENT_SECRET,
            authorize_url=f"https://login.microsoftonline.com/{settings.AZURE_TENANT_ID}/oauth2/v2.0/authorize",
            access_token_url=f"https://login.microsoftonline.com/{settings.AZURE_TENANT_ID}/oauth2/v2.0/token",
            client_kwargs={
                "scope": "openid profile email",
            },
        )
    return oauth.microsoft


# --- Microsoft OAuth Flow Endpoints ---

@router.get("/azure/login")
async def azure_login(
        request: Request,
        settings: Settings = Depends(get_settings),
        ms_client=Depends(get_ms_client)
):
    """Redirects the user's browser to the Microsoft Sign-In interface."""
    return await ms_client.authorize_redirect(request, settings.AZURE_REDIRECT_URI)

@router.get("/azure/callback")
async def azure_callback(
        request: Request,
        settings: Settings = Depends(get_settings),
        ms_client=Depends(get_ms_client)
):
    """Receives the code from Microsoft, exchanges it, and cryptographically verifies claims."""
    try:
        token_data = await ms_client.authorize_access_token(request, redirect_uri=settings.AZURE_REDIRECT_URI)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Authentication failed: {str(e)}")

    raw_id_token = token_data.get("id_token")
    if not raw_id_token:
        raise HTTPException(status_code=400, detail="Missing ID token from Microsoft response.")

    # CRYPTOGRAPHIC VERIFICATION STEP:
    # Validates against forgery, correct client audience, and extracts the confirmed tenant ID (tid)
    verified_user_claims = verify_azure_token(
        token=raw_id_token,
        tenant_id=settings.AZURE_TENANT_ID,  # "common"
        client_id=settings.AZURE_CLIENT_ID
    )

    # Success! You now have highly secure user data
    return {
        "message": "Successfully authenticated via Microsoft with a verified signature!",
        "user_email": verified_user_claims.get("email"),
        "user_name": verified_user_claims.get("name"),
        "azure_tenant_id": verified_user_claims.get("tid"),  # Here is the tenant ID you wanted!
    }

# --- Token Lifecycle & Session Endpoints ---

@router.post("/refresh")
def refresh_token() -> dict[str, str]:
    """Return a placeholder refreshed access token response."""
    return {"access_token": "test-admin-token-org001-admin"}


@router.get("/me")
def get_current_user(request: Request) -> dict[str, str]:
    """Return the authenticated user profile."""
    # Added safety check in case request.state.user is not yet populated by middleware
    user = getattr(request.state, "user", None)
    if not user:
        raise HTTPException(status_code=401, detail="No active session or unauthenticated user.")
    return user