from rest_framework.decorators import api_view,schema
from rest_framework.response import Response
from rest_framework import status
from .models import UserProfile
from apps.accounts.serializers import UserProfileSerializer

@api_view(['GET','POST'])
def User_list(request):

    if request.method=="GET":
        user=UserProfile.objects.all()
        serialize=UserProfileSerializer(user,many=True)
        data=serialize.data
        return Response(data)
    
    if request.method=="POST":
        user=UserProfileSerializer(data=request.data)

        if user.is_valid():
            user.save()
            return Response(
                user.data,
                status=status.HTTP_201_CREATED
            )
            
        return Response(
            user.errors,
            status=status.HTTP_401_UNAUTHORIZED,
        

        )
