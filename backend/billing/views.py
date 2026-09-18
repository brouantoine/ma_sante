from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Invoice, InvoiceItem
from .serializers import InvoiceSerializer, InvoiceItemSerializer

class InvoiceViewSet(viewsets.ModelViewSet):
    queryset = Invoice.objects.select_related("patient").prefetch_related("items")
    serializer_class = InvoiceSerializer
    permission_classes = [IsAuthenticated]

class InvoiceItemViewSet(viewsets.ModelViewSet):
    queryset = InvoiceItem.objects.all()
    serializer_class = InvoiceItemSerializer
    permission_classes = [IsAuthenticated]
