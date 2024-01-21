import base64
import json
from io import BytesIO
import requests
from qrcode import make


class QRCode:
    def __init__(self):
        pass

    def create_qrcode(self, data):
        buffered = BytesIO()
        qrcode = make(data)
        qrcode.save(buffered)
        # print(base64.b64encode(buffered.getvalue()))
        return str(base64.b64encode(buffered.getvalue()))[2:-1]


class MailSharing:
    def send_mail(self, recipients, spreadsheet_title, username, link):
        requests.post("http://menews.site/sendEmail", data=json.dumps(
            {"recipients": recipients, "title": spreadsheet_title, "username": username, "link": link}), headers={
            "Content-Type": "application/json"})

    # info: because of savety reasons (me not pushing passwords to github again) the actual sending of emails
    #       happens on my server but uses the following code
    """
    
import os
from dotenv import load_dotenv
from email.message import EmailMessage
import ssl
import smtplib
import re
    def send_mail_exhibiton(self, recipients, spreadsheet_title, username):
        load_dotenv()
        MS = MailSharing()
        sender = "CoSheet0@gmail.com"
        password = os.getenv("EMAIL_PASSWORD")
        subject = "Spreadsheet invite"
        body = 
        You have been invited by  + username +  to collaborate on  + spreadsheet_title +  using CoSheet. This platform enables seamless teamwork for planning activities and sharing information.

        Access the shared spreadsheet by clicking the following link: [Shareable Link]
        
        for recipient in recipients:
            if not MS.check_valid_email(recipient):
                recipients.remove(recipient)
        em = EmailMessage()
        em["From"] = sender
        em["To"] = ", ".join(recipients)
        em["Subject"] = subject
        em.set_content(body)

        context = ssl.create_default_context()

        with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as smtp:
            smtp.login(sender, password)
            smtp.sendmail(sender, recipients, em.as_string())

    def check_valid_email(self, email):
        regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b'
        return re.fullmatch(regex, email)"""


if __name__ == "__main__":
    qr = QRCode()
    qr.create_qrcode("test")

    ms = MailSharing()
    ms.send_mail(["moritz.pertl@gmx.at", "ignis.hd@gmx.at", "test"], "testing", "Ignitz", "testlink")
