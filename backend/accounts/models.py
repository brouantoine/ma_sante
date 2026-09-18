from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    # Rôle métier utilisé pour le RBAC.
    ROLE_CHOICES = [
        ("ADMIN", "Administrateur"),
        ("DIRECTOR", "Directeur de clinique"),
        ("DOCTOR", "Médecin"),
        ("NURSE", "Infirmier/infirmière"),
        ("RECEPTION", "Réceptionniste"),
        ("LAB", "Laborantin"),
        ("PHARMACY", "Pharmacien"),
        ("ACCOUNTING", "Comptable"),
        ("STOCK", "Responsable des stocks"),
        ("HR", "Responsable RH"),
        ("MAINTENANCE", "Responsable maintenance"),
    ]
    role = models.CharField(max_length=30, choices=ROLE_CHOICES, default="RECEPTION")
    phone = models.CharField(max_length=30, blank=True)
    department = models.CharField(max_length=120, blank=True)

    def __str__(self):
        return f"{self.get_full_name() or self.username} — {self.get_role_display()}"
