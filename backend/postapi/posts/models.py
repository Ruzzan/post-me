from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class Post(models.Model):
    author = models.ForeignKey(User,on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    body = models.TextField()
    timestamp = models.DateField(auto_now_add=True)

    class Meta:
        ordering = ('-id',)

    def __str__(self):
        return self.title