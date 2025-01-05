"""
Production settings for the project.
"""

from typing import List

from .base import *  # noqa: F403

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

# Security settings
SECURE_BROWSER_XSS_FILTER: bool = True
SECURE_CONTENT_TYPE_NOSNIFF: bool = True
SECURE_HSTS_INCLUDE_SUBDOMAINS: bool = True
SECURE_HSTS_PRELOAD: bool = True
SECURE_HSTS_SECONDS: int = 31536000  # 1 year
SECURE_SSL_REDIRECT: bool = True
SESSION_COOKIE_SECURE: bool = True
CSRF_COOKIE_SECURE: bool = True
X_FRAME_OPTIONS: str = "DENY"

# Static files settings
STATICFILES_STORAGE: str = (
    "whitenoise.storage.CompressedManifestStaticFilesStorage"
)

# Email backend for production
EMAIL_BACKEND: str = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST: str = env("EMAIL_HOST", default="smtp.gmail.com")  # type: ignore[name-defined]
EMAIL_PORT: int = env.int("EMAIL_PORT", default=587)  # type: ignore[name-defined]
EMAIL_HOST_USER: str = env("EMAIL_HOST_USER", default="")  # type: ignore[name-defined]
EMAIL_HOST_PASSWORD: str = env("EMAIL_HOST_PASSWORD", default="")  # type: ignore[name-defined]
EMAIL_USE_TLS: bool = True
DEFAULT_FROM_EMAIL: str = env(  # type: ignore[name-defined]
    "DEFAULT_FROM_EMAIL", default="webmaster@localhost"
)

# Logging configuration
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "verbose": {
            "format": "{levelname} {asctime} {module} {process:d} {thread:d} {message}",
            "style": "{",
        },
    },
    "handlers": {
        "console": {
            "class": "logging.StreamHandler",
            "formatter": "verbose",
        },
    },
    "root": {
        "handlers": ["console"],
        "level": "INFO",
    },
    "loggers": {
        "django": {
            "handlers": ["console"],
            "level": env("DJANGO_LOG_LEVEL", default="INFO"),  # type: ignore[name-defined]
            "propagate": False,
        },
    },
}
