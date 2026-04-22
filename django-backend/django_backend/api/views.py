from django.http import JsonResponse
from django.contrib.auth.models import User
from .otp_service import generate_otp
import json


# SIGNUP API
def signup(request):
    if request.method == "POST":
        data = json.loads(request.body)

        email = data.get("email")
        password = data.get("password")

        otp = generate_otp()

        user = User.objects.create_user(
            username=email,
            email=email,
            password=password,
            otp=otp,
            is_verified=False
        )

        print("OTP:", otp)

        return JsonResponse({"message": "OTP generated"})

    return JsonResponse({"error": "Invalid request"})


# VERIFY OTP API  ✅ MUST BE OUTSIDE
def verify_otp(request):
    if request.method == "POST":
        data = json.loads(request.body)

        email = data.get("email")
        otp = data.get("otp")

        user = User.objects.get(email=email)

        if user.otp == otp:
            user.is_verified = True
            user.save()
            return JsonResponse({"message": "Verified"})
        else:
            return JsonResponse({"error": "Wrong OTP"})

    return JsonResponse({"error": "Invalid request"})