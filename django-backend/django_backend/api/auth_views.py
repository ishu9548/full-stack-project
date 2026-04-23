from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate
from django.core.mail import send_mail
from django.conf import settings
from .otp_service import generate_otp

# temporary OTP storage
otp_storage = {}

# SIGNUP
@api_view(['POST'])
def signup(request):
    username = request.data.get('username')
    password = request.data.get('password')
    email = request.data.get('email')

    if not username or not password or not email:
        return Response({'error': 'All fields are required'}, status=400)

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists'}, status=400)

    if User.objects.filter(email=email).exists():
        return Response({'error': 'Email already exists'}, status=400)

    otp = generate_otp()

    user = User.objects.create_user(
        username=username,
        password=password,
        email=email
    )

    otp_storage[email] = otp

    send_mail(
        subject='MYProject OTP',
        message=f'Your OTP is {otp}',
        from_email=settings.EMAIL_HOST_USER,
        recipient_list=[email],
        fail_silently=False,
    )

    return Response({'message': 'OTP sent to email'}, status=201)


# VERIFY OTP
@api_view(['POST'])
def verify_otp(request):
    email = request.data.get('email')
    otp = request.data.get('otp')

    if not email or not otp:
        return Response({'error': 'Email and OTP required'}, status=400)

    if not User.objects.filter(email=email).exists():
        return Response({'error': 'User not found'}, status=404)

    if otp_storage.get(email) == otp:
        otp_storage.pop(email, None)  # 🔥 remove after success

        return Response({'message': 'OTP verified ✅'}, status=200)

    return Response({'error': 'Wrong OTP ❌'}, status=400)


# 🔁 RESEND OTP (NEW)
@api_view(['POST'])
def resend_otp(request):
    email = request.data.get('email')

    if not email:
        return Response({'error': 'Email required'}, status=400)

    if not User.objects.filter(email=email).exists():
        return Response({'error': 'User not found'}, status=404)

    otp = generate_otp()
    otp_storage[email] = otp

    send_mail(
        subject='MYProject OTP (Resent)',
        message=f'Your new OTP is {otp}',
        from_email=settings.EMAIL_HOST_USER,
        recipient_list=[email],
        fail_silently=False,
    )

    return Response({'message': 'OTP resent successfully ✅'}, status=200)


# LOGIN
@api_view(['POST'])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({'error': 'Username and password required'}, status=400)

    user = authenticate(username=username, password=password)

    if user is None:
        return Response({'error': 'Invalid credentials ❌'}, status=401)

    # 🔥 IMPORTANT: block login if OTP not verified
    if user.email in otp_storage:
        return Response({'error': 'Please verify OTP first ❌'}, status=403)

    return Response({'message': 'Login successful ✅'}, status=200)