from rest_framework import mixins
from rest_framework import generics

from .serializers import UserProfileSerializer
from .models import UserProfile
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated

class UserListCreateAPIView(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    generics.GenericAPIView
):
    
    queryset=UserProfile.objects.all()

    serializer_class=UserProfileSerializer
    authentication_classes=[JWTAuthentication]
    permission_classes=[IsAuthenticated]

    def get(self,request):
        return self.list(request)
    
    def post(self,request):
        return self.create(request)
    
class UserDetailAPIView(
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    generics.GenericAPIView):

    queryset=UserProfile.objects.all()
    serializer_class=UserProfileSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self,request,pk):
        return self.retrieve(request,pk=pk)
    
    def put(self,request,pk):
        return self.update(request,pk=pk)
    
    def delete(self,request,pk):
        return self.destroy(request,pk=pk)

    
