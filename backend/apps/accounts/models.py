from django.db import models
from django.contrib.auth.models import User

class UserSettings(models.Model):

    LANDING_PAGE_CHOICES = [
        ("chat", "Chat"),
        ("documents", "Documents"),
        ("notes", "Notes"),
        ("history", "History"),
    ]

    user = models.OneToOneField( User, on_delete=models.CASCADE, related_name="settings")
    landing_page = models.CharField( max_length=20, choices=LANDING_PAGE_CHOICES, default="chat")
    confirm_before_delete = models.BooleanField( default=True)
    animations = models.BooleanField( default=True,)
    conversation_memory = models.BooleanField( default=True)
    auto_generate_chat_titles = models.BooleanField( default=True)
    created_at = models.DateTimeField( auto_now_add=True)
    updated_at = models.DateTimeField( auto_now=True)

    def __str__(self):
        return self.user.username

