from django.contrib.auth.decorators import login_required
from django.shortcuts import render


@login_required
def reports(request):
    return render(request, "reports/reports.html")


@login_required
def email_report(request):
    return render(request, "reports/email.html")


@login_required
def map_report(request):
    return render(request, "reports/map.html")


@login_required
def ai_report(request):
    return render(request, "reports/ai.html")


@login_required
def analytics(request):
    return render(request, "analytics/analytics.html")