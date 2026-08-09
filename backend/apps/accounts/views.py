from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from .serializers import (RegisterSerializer, UserSerializer,UserSettingsSerializer,
                          AccountSecuritySerializer,ChangePasswordSerializer,DeleteAccountSerializer)
from rest_framework.views import APIView
from rest_framework.response import Response
from apps.accounts.services.user_settings_service import UserSettingsService
from rest_framework import status
from apps.accounts.services.account_security_service import AccountSecurityService

class RegisterAPIView(generics.CreateAPIView):

    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]


class CurrentUserAPIView(generics.RetrieveAPIView):

    serializer_class = UserSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

class UserSettingsAPIView(APIView):

    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self, request):

        settings = UserSettingsService.get_settings( request.user)
        serializer = UserSettingsSerializer(settings)
        return Response(serializer.data)

    def put(self, request):

        settings = UserSettingsService.update_settings(request.user,request.data)
        serializer = UserSettingsSerializer(settings)
        return Response(serializer.data,status=status.HTTP_200_OK)

class AccountSecurityAPIView(APIView):

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request):
        account = AccountSecurityService.get_account(request.user)
        serializer = AccountSecuritySerializer( account)
        return Response( serializer.data, status=status.HTTP_200_OK)

class ChangePasswordAPIView(APIView):

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ChangePasswordSerializer( data=request.data)
        serializer.is_valid(raise_exception=True)
        AccountSecurityService.change_password(
            user=request.user,
            current_password=serializer.validated_data["current_password"],
            new_password=serializer.validated_data["new_password"])
        return Response({ "message": "Password updated successfully." },status=status.HTTP_200_OK)
    
class DeleteAccountAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    def delete(self, request):
        serializer = DeleteAccountSerializer( data=request.data)
        serializer.is_valid(raise_exception=True)
        AccountSecurityService.delete_account( request.user)
        return Response(
            {"message": "Account deleted successfully."},status=status.HTTP_200_OK)