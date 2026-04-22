from django.urls import path
from .auth_views import signup, login

urlpatterns = [
    path('signup/', signup),
    path('login/', login),
]