import graphene
from graphene import ObjectType
from graphene_django import DjangoObjectType
from users.models import User
from project.models import Project, ToDo

# Level 1
# class Query(ObjectType):
#     hello = graphene.String(default_value="Hi!")
#
# schema = graphene.Schema(query=Query)

# Level 2

# class UserType(DjangoObjectType):
#
#     class Meta:
#         model = User
#         fields = '__all__'
#
# class Query(ObjectType):
#     all_users = graphene.List(UserType)
#
#     def resolve_all_users(self, root, info):
#         return User.objects.all()
#
# schema = graphene.Schema(query=Query)

# Level 3

# class UserType(DjangoObjectType):
#
#     class Meta:
#         model = User
#         fields = '__all__'
#
# class ProjectType(DjangoObjectType):
#
#     class Meta:
#         model = Project
#         fields = '__all__'
#
# class Query(ObjectType):
#     all_users = graphene.List(UserType)
#     all_projects = graphene.List(ProjectType)
#
#     def resolve_all_users(root, info):
#         return User.objects.all()
#
#     def resolve_all_projects(root, info):
#         return Project.objects.all()
#
# schema = graphene.Schema(query=Query)

# Level 4

# class UserType(DjangoObjectType):
#
#     class Meta:
#         model = User
#         fields = '__all__'
#
# class ProjectType(DjangoObjectType):
#
#     class Meta:
#         model = Project
#         fields = '__all__'
#
# class Query(ObjectType):
#
#     user_by_id = graphene.Field(UserType, id=graphene.Int(required=False))
#
#     def resolve_user_by_id(self, root, info, id=None):
#         if id:
#             return User.objects.get(id=id)
#         return None
#
#     project_by_user = graphene.List(ProjectType, first_name = graphene.String(required=False))
#
#     def resolve_project_by_user(self, root, info, first_name=None):
#         projects = Project.objects.all()
#
#         if first_name:
#             return projects.filter(users__first_name=first_name)
#         return projects
#
# schema = graphene.Schema(query=Query)

# Level 5

class UserType(DjangoObjectType):

    class Meta:
        model = User
        fields = '__all__'

class ProjectType(DjangoObjectType):

    class Meta:
        model = Project
        fields = '__all__'

class ToDoType(DjangoObjectType):

    class Meta:
        model = ToDo
        fields = '__all__'

class Query(ObjectType):

    user_by_id = graphene.Field(UserType, id=graphene.Int(required=False))

    all_users = graphene.List(UserType)
    all_projects = graphene.List(ProjectType)
    all_todo = graphene.List(ToDoType)

    def resolve_all_users(root, info):
        return User.objects.all()

    def resolve_all_projects(root, info):
        return Project.objects.all()

    def resolve_all_todo(root, info):
        return ToDo.objects.all()

    def resolve_user_by_id(self, root, info, id=None):
        if id:
            return User.objects.get(id=id)
        return None

    project_by_user = graphene.List(ProjectType, first_name = graphene.String(required=False))

    def resolve_project_by_user(self, root, info, first_name=None):
        projects = Project.objects.all()

        if first_name:
            return projects.filter(users__first_name=first_name)
        return projects

class UserUpdateMutation(graphene.Mutation):

    class Arguments:
        email = graphene.String(required=True)
        id = graphene.ID()

    user = graphene.Field(UserType)

    @classmethod
    def mutate(self, root, info, email, id):
        user = User.objects.get(id=id)
        user.email = email
        user.save()
        return UserUpdateMutation(user=user)

class UserCreateMutation(graphene.Mutation):

    class Arguments:
        email = graphene.String(required=True)
        first_name = graphene.String(required=True)
        last_name = graphene.String(required=True)
        username = graphene.String(required=True)


    user = graphene.Field(UserType)

    @classmethod
    def mutate(self, root, info, email, last_name, username, first_name):
        user = User.objects.create(username=username, first_name=first_name, last_name=last_name, email=email)
        return UserCreateMutation(user=user)

class UserDeleteMutation(graphene.Mutation):

    class Arguments:
        id = graphene.ID()

    user = graphene.List(UserType)

    @classmethod
    def mutate(self, root, info, id):
        User.objects.get(id=id).delete()
        user = User.objects.all()
        return UserDeleteMutation(user=user)

class Mutation(graphene.ObjectType):
    update_user = UserUpdateMutation.Field()
    create_user = UserCreateMutation.Field()
    delete_user = UserDeleteMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)