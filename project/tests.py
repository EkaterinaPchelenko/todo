from django.test import TestCase
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from mixer.backend.django import mixer
from django.contrib.auth.models import User
from .views import ToDoModelViewSet
from .models import User, ToDo, Project


class TestToDoViewSet(APITestCase):

    def setUp(self) -> None:
        self.name = 'Kate'
        self.password = 'Kate_222222'

        self.url = '/api/todo/'
        self.data = {'username':'Ivan', 'first_name': 'Ivan', 'last_name': 'Ivanov', 'email': 'Ivan@mail.com'}
        self.admin = User.objects.create_superuser(self.name, 'kate@mail.ru', self.password)

    def test_get_list(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_admin(self):
        creator = User.objects.create(**self.data)
        project = Project.objects.create(name='test')
        todo = ToDo.objects.create(text='test', creator=creator, project=project)
        new_project = Project.objects.create(name='test1')
        self.client.login(username=self.name, password=self.password)
        response = self.client.put(f'{self.url}{todo.id}/', {'text':'ToDo', 'creator':todo.creator.id, 'project': new_project.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        to_do = ToDo.objects.get(id=todo.id)
        self.assertEqual(to_do.text, 'ToDo')
        self.client.logout()

    def test_edit_mixer(self):
        todo = mixer.blend(ToDo)
        new_project = Project.objects.create(name='test1')
        self.client.login(username=self.name, password=self.password)
        response = self.client.put(f'{self.url}{todo.id}/', {'text':'ToDo', 'creator':todo.creator.id, 'project': new_project.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        to_do = ToDo.objects.get(id=todo.id)
        self.assertEqual(to_do.text, 'ToDo')
        self.client.logout()

    def test_edit_mixer_text(self):
        todo = mixer.blend(ToDo, text='kitten')
        new_project = Project.objects.create(name='test1')
        self.client.login(username=self.name, password=self.password)
        response = self.client.put(f'{self.url}{todo.id}/', {'text':'ToDo', 'creator':todo.creator.id, 'project': new_project.id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        to_do = ToDo.objects.get(id=todo.id)
        self.assertEqual(to_do.text, 'ToDo')
        self.client.logout()