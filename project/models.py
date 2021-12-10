from django.db import models
from users.models import User

class Project(models.Model):
    name = models.CharField(max_length=150)
    repository_link = models.URLField(blank=True, null=False)
    users = models.ManyToManyField(User)

    def __str__(self):
        return self.name

class ToDo(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    creator = models.ForeignKey(User, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True, db_index=True)
# Create your models here.
