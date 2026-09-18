from rest_framework.routers import DefaultRouter
from .views import InvoiceViewSet, InvoiceItemViewSet
router = DefaultRouter()
router.register("", InvoiceViewSet, basename="invoice")
router.register("items", InvoiceItemViewSet, basename="invoice-item")
urlpatterns = router.urls
