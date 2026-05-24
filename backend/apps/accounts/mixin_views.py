from rest_framework import mixins
from rest_framework import generics

from .serializers import UserProfileSerializer
from .models import UserProfile

class UserListCreateMixinView(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    generics.GenericAPIView
):
    
    queryset=UserProfile.objects.all()

    serializer_class=UserProfileSerializer

    def get(self,request):
        return self.list(request)
    
    def post(self,request):
        return self.create(request)
    
class UserDetailMixinView(mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    generics.GenericAPIView):

    queryset=UserProfile.objects.all()
    serializer_class=UserProfileSerializer

    def get(self,request,Pk):
        return self.retrieve(request,Pk)
    
    def update(self,request,PK):
        return self.update(request,PK)
    
    def delete(self,request,Pk):
        return self.destroy(request,Pk)

    
