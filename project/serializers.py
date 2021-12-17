from rest_framework.relations import StringRelatedField
from rest_framework.serializers import ModelSerializer

from project.models import Project, ToDo
from users.serializers import UserModelSerializer


class ProjectModelSerializer(ModelSerializer):

    # users = StringRelatedField(many=True)

    class Meta:
       model = Project
       fields = ('__all__')


class ToDoModelSerializer(ModelSerializer):

    # project = StringRelatedField()
    # creator = StringRelatedField()

    class Meta:
       model = ToDo
       fields = ('__all__')