from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .otp_service import generate_otp
from django.contrib.auth import authenticate


# SIGNUP
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .otp_service import generate_otp
from django.contrib.auth import authenticate
from django.core.mail import send_mail
from django.conf import settings

# SIGNUP
@api_view(['POST'])
def signup(request):
    username = request.data.get('username')
    password = request.data.get('password')
    email = request.data.get('email')

    if User.objects.filter(username=username).exists():
        return Response({'error': 'User already exists'})

    otp = generate_otp()

    user = User.objects.create_user(
        username=username,
        password=password,
        email=email
    )

    user.first_name = otp
    user.save()

    # send email
    send_mail(
        subject='SmartHealth OTP Verification',
        message=f'Your OTP is {otp}',
        from_email=settings.EMAIL_HOST_USER,
        recipient_list=[email],
        fail_silently=False,
    )

    return Response({'message': 'OTP sent to email'})


# VERIFY OTP  ✅ SEPARATE FUNCTION
@api_view(['POST'])
def verify_otp(request):
    email = request.data.get('email')
    otp = request.data.get('otp')

    try:
        user = User.objects.get(email=email)

        if user.first_name == otp:
            return Response({'message': 'Verified'})
        else:
            return Response({'error': 'Wrong OTP'})

    except User.DoesNotExist:
        return Response({'error': 'User not found'})


# LOGIN
@api_view(['POST'])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)

    if user is not None:
        return Response({'message': 'Login successful'})
    else:
        return Response({'error': 'Invalid credentials'})