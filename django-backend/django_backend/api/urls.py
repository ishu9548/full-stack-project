from django.urls import path
from .auth_views import signup, login
from .views import verify_otp


urlpatterns = [
    path('signup/', signup),
    path('login/', login),
    path('verify-otp/', verify_otp),
]