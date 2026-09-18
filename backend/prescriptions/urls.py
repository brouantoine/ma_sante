from rest_framework.routers import DefaultRouter
from .views import PrescriptionViewSet, PrescriptionItemViewSet
router = DefaultRouter()
router.register("", PrescriptionViewSet, basename="prescription")
router.register("items", PrescriptionItemViewSet, basename="prescription-item")
urlpatterns = router.urls
