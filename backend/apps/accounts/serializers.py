from django.contrib.auth.models import User
from rest_framework import serializers
from apps.accounts.models import UserSettings


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ["id", "username", "email", "date_joined",]

        read_only_fields = ["id","date_joined",]


class RegisterSerializer(serializers.ModelSerializer):
 
    password = serializers.CharField( write_only=True,min_length=8)

    class Meta:
        model = User

        fields = ["id","username","email","password",]

        read_only_fields = [
            "id",
        ]

    def create(self, validated_data):

        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
        )

        return user


class UserSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSettings
        fields = [
            "landing_page",
            "confirm_before_delete",
            "animations",
            "conversation_memory",
            "auto_generate_chat_titles",
        ]
        read_only_fields = []



class AccountSecuritySerializer(serializers.Serializer):

    username = serializers.CharField()
    email = serializers.EmailField()
    date_joined = serializers.DateTimeField()
    last_login = serializers.DateTimeField(allow_null=True)
    password_last_changed = serializers.DateTimeField(allow_null=True)
    provider = serializers.CharField()
    provider_model = serializers.CharField()
    provider_version = serializers.CharField()
    provider_status = serializers.CharField()
    embedding_model = serializers.CharField()
    embedding_dimensions = serializers.IntegerField()
    vector_store = serializers.CharField()
    two_factor_enabled = serializers.BooleanField()
    active_sessions_supported = serializers.BooleanField()
    delete_account_supported = serializers.BooleanField()