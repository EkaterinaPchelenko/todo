from rest_framework.mixins import ListModelMixin, UpdateModelMixin, CreateModelMixin
from rest_framework.permissions import IsAdminUser
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from .models import User
from .serializers import UserModelSerializer, NewUserModelSerializer


class UserCustomViewSet(ListModelMixin, UpdateModelMixin, GenericViewSet, CreateModelMixin):
   queryset = User.objects.all()
   serializer_class = UserModelSerializer
   renderer_classes = [JSONRenderer, BrowsableAPIRenderer]

   def get_serializer_class(self):
      if self.request.version == 'v2':
         return NewUserModelSerializer
      return UserModelSerializer