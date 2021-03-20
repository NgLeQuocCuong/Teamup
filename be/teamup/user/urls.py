from rest_framework import routers
from . import views 

router = routers.DefaultRouter(trailing_slash=False)
router.register('auth', views.AuthViewSet, basename='authorization')
router.register('user', views.UserInformationViewSet, basename='information')

urlpatterns = router.urls


