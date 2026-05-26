from rest_framework import serializers
from apps.workspace.models import Note


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model=Note
        fields=['id','title','content']

