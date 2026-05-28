from django.db import models
from django.contrib.auth.models import User

class Note(models.Model):

    user=models.ForeignKey(User,on_delete=models.CASCADE)
    title=models.CharField(max_length=300)
    content=models.TextField()

    def __str__(self):
        return self.title
    
class Document(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    # title=models.CharField(max_length=200)
    file=models.FileField(upload_to='documents/')
    uploaded_at=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.file.name