from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Room, Bed, Hospitalization
from .serializers import RoomSerializer, BedSerializer, HospitalizationSerializer

class RoomViewSet(viewsets.ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    permission_classes = [IsAuthenticated]

class BedViewSet(viewsets.ModelViewSet):
    queryset = Bed.objects.select_related("room").all()
    serializer_class = BedSerializer
    permission_classes = [IsAuthenticated]

class HospitalizationViewSet(viewsets.ModelViewSet):
    queryset = Hospitalization.objects.select_related("patient", "bed").all()
    serializer_class = HospitalizationSerializer
    permission_classes = [IsAuthenticated]
