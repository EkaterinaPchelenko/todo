from django.shortcuts import render
from django_filters.rest_framework import FilterSet, CharFilter
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAdminUser
from rest_framework.viewsets import ModelViewSet

from project.models import Project, ToDo
from project.serializers import ProjectModelSerializer, ToDoModelSerializer


class ProjectLimitOffsetPagination(LimitOffsetPagination):
   default_limit = 10

class ToDoLimitOffsetPagination(LimitOffsetPagination):
   default_limit = 20

class ProjectFilter(FilterSet):
   name = CharFilter(lookup_expr='contains')

   class Meta:
       model = Project
       fields = ['name']



class ProjectModelViewSet(ModelViewSet):
   queryset = Project.objects.all()
   serializer_class = ProjectModelSerializer
   pagination_class = ProjectLimitOffsetPagination
   filterset_class = ProjectFilter


class ToDoModelViewSet(ModelViewSet):
   queryset = ToDo.objects.all()
   serializer_class = ToDoModelSerializer
   pagination_class = ToDoLimitOffsetPagination
   filterset_fields = ['project']
   def perform_destroy(self, instance):
      instance.is_active = False
      instance.save()



# Create your views here.
