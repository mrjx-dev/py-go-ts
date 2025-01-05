"""
Development settings for the project.
"""

from typing import List

from .base import *  # noqa: F403

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

# Allow all hosts in development
ALLOWED_HOSTS: List[str] = ["*"]

# Enable Django Debug Toolbar
INSTALLED_APPS += ["debug_toolbar"]  # type: ignore[name-defined]
MIDDLEWARE.insert(0, "debug_toolbar.middleware.DebugToolbarMiddleware")  # type: ignore[name-defined]

# Debug toolbar settings
INTERNAL_IPS: List[str] = [
    "127.0.0.1",
]

# Email backend for development
EMAIL_BACKEND: str = "django.core.mail.backends.console.EmailBackend"

# Disable password validation in development
AUTH_PASSWORD_VALIDATORS = []  # type: ignore[name-defined]

# CORS settings for development
CORS_ALLOW_ALL_ORIGINS: bool = True

# Static files settings
STATICFILES_STORAGE: str = (
    "django.contrib.staticfiles.storage.StaticFilesStorage"
)
