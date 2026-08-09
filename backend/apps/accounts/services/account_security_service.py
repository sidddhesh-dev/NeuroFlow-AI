from django.contrib.auth.models import User
from django.contrib.auth.hashers import check_password
from rest_framework.exceptions import ValidationError


class AccountSecurityService:

    @staticmethod
    def get_account(user: User) -> dict:

        return {
            "username": user.username,
            "email": user.email,
            "date_joined": user.date_joined,
            "last_login": user.last_login,
            "is_staff": user.is_staff,
            "is_superuser": user.is_superuser,
            "is_active": user.is_active,
            "account_type": (
                "Administrator"
                if user.is_superuser
                else "User"
            ),
            "email_verified": True,
            "timezone": "Asia/Kolkata",
            "language": "English",
            "country": "India",
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

    @staticmethod
    def change_password(
        user: User,
        current_password: str,
        new_password: str,
    ):

        if not check_password(current_password, user.password):

            raise ValidationError({
                "current_password": [
                    "Current password is incorrect."
                ]
            })

        if current_password == new_password:

            raise ValidationError({
                "new_password": [
                    "New password must be different from your current password."
                ]
            })

        user.set_password(new_password)

        user.save(update_fields=["password"])

        return user

    @staticmethod
    def delete_account(user: User):

        user.delete()

        return True