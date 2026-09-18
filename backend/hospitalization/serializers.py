from rest_framework import serializers
from .models import Room, Bed, Hospitalization

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = "__all__"

class BedSerializer(serializers.ModelSerializer):
    room_name = serializers.CharField(source="room.name", read_only=True)
    class Meta:
        model = Bed
        fields = "__all__"

class HospitalizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hospitalization
        fields = "__all__"
