from rest_framework import serializers
from .models import Invoice, InvoiceItem

class InvoiceItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = InvoiceItem
        fields = "__all__"

class InvoiceSerializer(serializers.ModelSerializer):
    items = InvoiceItemSerializer(many=True, read_only=True)
    remaining = serializers.SerializerMethodField()

    class Meta:
        model = Invoice
        fields = "__all__"

    def get_remaining(self, obj):
        return max(obj.total - obj.amount_paid, 0)
