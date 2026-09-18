from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Prescription, PrescriptionItem
from .serializers import PrescriptionSerializer, PrescriptionItemSerializer

class PrescriptionViewSet(viewsets.ModelViewSet):
    queryset = Prescription.objects.select_related("patient", "doctor").prefetch_related("items")
    serializer_class = PrescriptionSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(doctor=self.request.user)

class PrescriptionItemViewSet(viewsets.ModelViewSet):
    queryset = PrescriptionItem.objects.all()
    serializer_class = PrescriptionItemSerializer
    permission_classes = [IsAuthenticated]
