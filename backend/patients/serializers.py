from rest_framework import serializers
from .models import Patient

class PatientSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = Patient
        fields = "__all__"
        read_only_fields = ["created_at", "full_name"]

    def get_full_name(self, obj):
        return f"{obj.last_name} {obj.first_names}"
