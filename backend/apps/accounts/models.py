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

class DeveloperProfile(models.Model):
    full_name = models.CharField(max_length=120)
    role = models.CharField(max_length=120)
    tagline = models.CharField(max_length=200)
    location = models.CharField(max_length=120)
    open_to_work = models.BooleanField(default=True)
    profile_photo = models.ImageField( upload_to="developer/", blank=True, null=True)
    resume = models.FileField( upload_to="developer/", blank=True, null=True)
    about = models.TextField()
    email = models.EmailField()
    github = models.URLField(blank=True)
    linkedin = models.URLField(blank=True)
    portfolio = models.URLField(blank=True)
    leetcode = models.URLField(blank=True)
    hackerrank = models.URLField(blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Developer Portfolio"
        verbose_name_plural = "Developer Portfolio"

    def __str__(self):
        return self.full_name