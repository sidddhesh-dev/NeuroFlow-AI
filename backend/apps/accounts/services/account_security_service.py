from django.contrib.auth.models import User


class AccountSecurityService:

    @staticmethod
    def get_account(user: User) -> dict:

        return {

            "username": user.username,
            "email": user.email,
            "date_joined": user.date_joined,
            "last_login": user.last_login,

            "password_last_changed": None,

            "provider": "Google Gemini",
            "provider_model": "gemini-2.5-flash",
            "provider_version": "2.5",
            "provider_status": "Connected",

            "embedding_model": "all-MiniLM-L6-v2",
            "embedding_dimensions": 384,
            "vector_store": "ChromaDB",

            "two_factor_enabled": False,
            "active_sessions_supported": False,
            "delete_account_supported": False,

        }