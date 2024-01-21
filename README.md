# CoSheet
Branch-System:
Every Feature creates a new branch

Pages:
- Homepage
- Signup
- Spreadsheets (Owner-View)
- Spreadsheets (Guest-View) 
- Spreadsheet-Settings 
- Profile Setting

Tasks (Sprint 1):
until 3.12

(includes Backend & Frontend)

Elias: Spreadsheets (Guest-View)
Moritz: Database & Encryption
Anna: Log-In 



How to Start CoSheet:

- pip install -r ./requirements.txt
  - if that throws an error:
    - pip install bcrypt flask rsa flask-cors requests python-dotenv qrcode
- navigate into the "client" folder
- npm install
- npm start 
- start FileServer.py
- Webpage should open by itself. If not "http://localhost:3000"