from rest_framework import routers
from . import views 


router = routers.DefaultRouter(trailing_slash=False)
router.register('activity', views.ActivityView, basename='activity')
router.register('sport', views.SportView, basename='sport')

urlpatterns = router.urls
