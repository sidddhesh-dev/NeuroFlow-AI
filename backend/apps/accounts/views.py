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
    
@api_view(['GET','PUT','DELETE'])
def user_details(request,PK):

    try :
        user=UserProfile.objects.get(id=PK)

    except UserProfile.DoesNotExist:
        return Response(
            {"Error : User Not Found"},
            status=status.HTTP_404_NOT_FOUND
        )
    
    if request.method=="GET":
        serializer=UserProfileSerializer(user)
        return Response(serializer.data)

    elif request.method=="PUT":
        serializer=UserProfileSerializer(
            user,data=request.data
        )

        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data
            )
        
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )
    
    elif request.method=="DELETE":
        user.delete()
        return Response(
            {'message' : 'User Deleted Succssfully'},
            status=status.HTTP_204_NO_CONTENT

        )
    
    




