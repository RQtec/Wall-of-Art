"""Views for the Jidar Al-Fan company profile site."""
import logging

from django.shortcuts import render

logger = logging.getLogger(__name__)


def home(request):
    """Render the company profile landing page and handle the contact form.

    On POST we simply acknowledge receipt so the page works out of the box
    without a database. To deliver leads to the company, wire the captured
    fields below to email (django.core.mail.send_mail) or a CRM/webhook.
    """
    sent = False
    if request.method == "POST":
        lead = {
            "name": request.POST.get("name", "").strip(),
            "phone": request.POST.get("phone", "").strip(),
            "email": request.POST.get("email", "").strip(),
            "service": request.POST.get("service", "").strip(),
            "message": request.POST.get("message", "").strip(),
        }
        logger.info("New contact request: %s", lead)
        # TODO: send_mail(...) or post to a CRM/webhook here.
        sent = True
    return render(request, "profile/index.html", {"sent": sent})
