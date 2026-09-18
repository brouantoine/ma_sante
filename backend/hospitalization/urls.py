from rest_framework.routers import DefaultRouter
from .views import RoomViewSet, BedViewSet, HospitalizationViewSet
router = DefaultRouter()
router.register("rooms", RoomViewSet, basename="room")
router.register("beds", BedViewSet, basename="bed")
router.register("", HospitalizationViewSet, basename="hospitalization")
urlpatterns = router.urls
