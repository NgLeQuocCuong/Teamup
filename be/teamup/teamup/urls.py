from django.contrib import admin
from django.urls import path, include

from user import urls as user_urls

from activity import urls as activity_urls

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include([
        path('', include(user_urls.urlpatterns)),
        path('activity/', include(activity_urls.urlpatterns)),
    ]))
]
