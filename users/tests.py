from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from mixer.backend.django import mixer
from django.contrib.auth.models import User
from .views import UserCustomViewSet
from .models import User

# Create your tests here.

# class TestUserCustomViewSet(TestCase):
#     url = '/api/users/'
#
#
#     def test_get_list(self):
#         factory = APIRequestFactory()
#         request = factory.get(self.url)
#         view = UserCustomViewSet.as_view({'get':'list'})
#         response = view(request)
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#
#     def test_create_guest(self):
#         factory = APIRequestFactory()
#         data = {'username':'Ivan', 'first_name': 'Ivan', 'last_name': 'Ivanov', 'email': 'Ivan@mail.com'}
#
#         request = factory.post(self.url, data, format='json')
#         view = UserCustomViewSet.as_view({'post':'create'})
#         response = view(request)
#         self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
#
#     def test_create_admin(self):
#         data = {'username':'Ivan', 'first_name': 'Ivan', 'last_name': 'Ivanov', 'email': 'Ivan@mail.com'}
#         admin = User.objects.create_superuser('admin', 'admin@mail.com', 'admin_111111111')
#
#         factory = APIRequestFactory()
#         request = factory.post(self.url, data, format='json')
#         force_authenticate(request, admin)
#         view = UserCustomViewSet.as_view({'post':'create'})
#         response = view(request)
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)
#
#     def test_get_detail(self):
#         client = APIClient()
#         data = {'username':'Ivan', 'first_name': 'Ivan', 'last_name': 'Ivanov', 'email': 'Ivan@mail.com'}
#
#         user = User.objects.create(**data)
#         response = client.get(f'{self.url}{user.id}/')
#         self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
#
#     def test_get_guest(self):
#         client = APIClient()
#         data = {'username':'Igor', 'first_name': 'Igor', 'last_name': 'Igorev', 'email': 'Igor@mail.com'}
#
#         user = User.objects.create(**data)
#         response = client.put(f'{self.url}{user.id}/', data)
#         self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
#
#     # def test_get_admin(self):
#     #     client = APIClient()
#     #     data = {'username':'Igor1', 'first_name': 'Igor1', 'last_name': 'Igorev', 'email': 'Igor1@mail.com'}
#     #     username = 'admin'
#     #     password = 'admin_111111111'
#     #
#     #     user = User.objects.create(**data)
#     #     client.login(username=username, password=password)
#     #
#     #     response = client.put(f'{self.url}{user.id}/', data)
#     #     self.assertEqual(response.status_code, status.HTTP_200_OK)
#     #
#     #     user_update = User.objects.get(id=user.id)
#     #     self.assertEqual(user_update.first_name, 'Igor1')
#     #     self.assertEqual(user_update.last_name, 'Igorev')
#     #     self.assertEqual(user_update.username, 'Igor1')
#     #     client.logout()
#
#
# class TestMath(APISimpleTestCase):
#
#     def test_sqrt(self):
#         import math
#         response = math.sqrt(9)
#         self.assertEqual(response, 3)
#
