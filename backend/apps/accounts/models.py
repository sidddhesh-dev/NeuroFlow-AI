from django.db import models

class UserProfile(models.Model):
    fullname=models.CharField(max_length=100)
    email=models.EmailField(unique=True)
    create_at=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.fullname
