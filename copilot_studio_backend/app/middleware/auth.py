# Authentication middleware for validating bearer tokens on protected routes.
from collections.abc import Awaitable, Callable

from fastapi import Request, Response
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware

from app.core.security import parse_bearer_token

# FIXED: Added the exact Microsoft OAuth flow routes to the bypass list
PUBLIC_PATHS = {
    "/health",
    "/api/auth/refresh",
    "/api/auth/azure/login",
    "/api/auth/azure/callback"
}


class AuthMiddleware(BaseHTTPMiddleware):
    """Reject unauthenticated access to protected API routes."""

    async def dispatch(
        self,
        request: Request,
        call_next: Callable[[Request], Awaitable[Response]],
    ) -> Response:
        # 1. Allow public endpoints to pass straight through
        if request.url.path in PUBLIC_PATHS:
            return await call_next(request)

        # 2. Allow non-API routes (like documentation or static assets) to pass through
        if not request.url.path.startswith("/api"):
            return await call_next(request)

        # 3. Enforce Bearer token security on all other /api routes
        authorization = request.headers.get("Authorization")
        if authorization is None or not authorization.startswith("Bearer "):
            return JSONResponse(status_code=401, content={"detail": "Not authenticated"})

        token = authorization.removeprefix("Bearer ").strip()
        user = parse_bearer_token(token)
        if user is None:
            return JSONResponse(status_code=401, content={"detail": "Invalid or expired token"})

        request.state.user = user
        return await call_next(request)