from flask import Flask, send_from_directory, request, Response, session, redirect, jsonify
from flask_session import Session
from flask_cors import CORS
import os
import json
from Backend.Login.SignUp import SignUp

app = Flask(__name__)
app.debug = True
app._staic_folder = os.path.abspath("static/")
CORS(app, support_credentials=True)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

@app.route('/default-spreadsheet', methods=['GET'])
def default_spreadsheet_page():
    return send_from_directory('files', "default-spreadsheet.html")


@app.route('/', methods=['GET'])
def serve_files():
    return send_from_directory('files', "homepage.html")

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data['username']
    email = data['email']
    password = data['password']
    second_password = data['second_password']
    sign_up = SignUp()
    correct_username = sign_up.prohibit_double_username(username)
    correct_email = sign_up.prohibit_double_eMail(email)
    #correct_password

    if correct_username and correct_email:
        response = Response(status=200, response=json.dumps({'response': "Perfect"}), mimetype="application/json")
    else:
        errors = []
        if not correct_username:
            errors.append("Username is already taken.")
        if not correct_email:
            errors.append("Email is already taken.")
    #   if not correct_password:
            #erros.append
        response = Response(status=406, response=json.dumps({'errors': errors}), mimetype="application/json")
    return response


if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True)
