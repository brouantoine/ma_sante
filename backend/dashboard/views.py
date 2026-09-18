from django.db.models import Count, Sum
from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from patients.models import Patient
from appointments.models import Appointment
from consultations.models import Consultation
from hospitalization.models import Bed
from billing.models import Invoice

class DashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        today = timezone.localdate()
        return Response({
            "patients": Patient.objects.count(),
            "new_patients": Patient.objects.filter(created_at__date=today).count(),
            "consultations_today": Consultation.objects.filter(date_time__date=today).count(),
            "appointments_today": Appointment.objects.filter(date_time__date=today).count(),
            "beds_available": Bed.objects.filter(status="AVAILABLE").count(),
            "beds_occupied": Bed.objects.filter(status="OCCUPIED").count(),
            "beds_reserved": Bed.objects.filter(status="RESERVED").count(),
            "beds_cleaning": Bed.objects.filter(status="CLEANING").count(),
            "unpaid_invoices": Invoice.objects.filter(status__in=["UNPAID", "PARTIAL"]).count(),
            "revenue_today": 0,
            "alerts": [
                "Surveillez les stocks critiques.",
                "Vérifiez les maintenances prévues.",
                "Consultez les résultats de laboratoire disponibles.",
            ],
        })
