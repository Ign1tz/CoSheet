import base64

from flask import Flask, send_from_directory, request, Response, session, redirect, jsonify
from flask_session import Session
from flask_cors import CORS
import os
import json
from Backend.Database.Database import Database
import requests
from Server.Backend.Login.SignUp import SignUp
from Server.Backend.Login.Login import Login
from Server.Backend.Login.Account import AccountParser

app = Flask(__name__)
app.debug = True
app._staic_folder = os.path.abspath("static/")
CORS(app, support_credentials=True)
app.config["SESSION_PERMANENT"] = True
app.config["SESSION_TYPE"] = "filesystem"
Session(app)



@app.route('/', methods=['GET'])
def serve_files():
    return send_from_directory('files', "homepage.html")


@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data['username']
    email = data['email']
    print(email)
    password = data['password']
    confirm_password = data['confirm_password']
    sign_up = SignUp()
    correct_username = sign_up.prohibit_double_username(username)
    username_rules = sign_up.username_rules(username)
    correct_email = sign_up.prohibit_double_eMail(email)
    password_equality = sign_up.proof_passwords_equality(password, confirm_password)
    password_rules = sign_up.password_rules(password)

    if correct_username and correct_email and password_rules and password_equality:
        new_account = sign_up.create_new_account(username, password, email)
        sign_up.save_new_account(new_account)
        response = Response(status=200, response=json.dumps({'response': "Perfect"}), mimetype="application/json")
    else:
        errors = []
        if not correct_username:
            errors.append("Username is already taken.")
        if not username_rules:
            errors.append("A character you chose in your username is not supported.")
        if not password_equality:
            errors.append("Passwords are not equal.")
        if not password_rules:
            errors.append("Password does not fulfill the requirements.")
        if not correct_email:
            errors.append("Email is not correct.")
        response = Response(status=406, response=json.dumps({'errors': errors}), mimetype="application/json")
    return response


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data['email']
    password = data['password']
    atSign = "@"
    login_class = Login()

    username_password_match = False
    email_password_match = False

    if atSign not in email:
        username_password_match = login_class.username_password_match(password, email)
    else:
        email_password_match = login_class.email_password_match(password, email)

    if username_password_match or email_password_match:
        response = Response(status=200, response=json.dumps({'response': "Perfect"}), mimetype="application/json")
        session["username"] = email
    else:
        errors = []
        if not username_password_match:
            errors.append("Username or password is not correct.")
        if not email_password_match:
            errors.append("Email or password is not correct.")
        response = Response(status=406, response=json.dumps({'errors': errors}), mimetype="application/json")
    return response


@app.route("/getUser", methods=["GET"])
def get_user():
    if session.get("username"):
        response = Response(status=200, response=json.dumps({"username": session.get("username")}),
                            mimetype="application/json")
    else:
        response = Response(status=406, response=json.dumps({"username": "noone"}), mimetype="application/json")
    return response

@app.route("/getProfilePicture", methods=["GET"])
def get_profile_picture():
    db = Database()
    account_parser = AccountParser()
    username = session.get("username")
    if session.get("username"):
        username = session.get("username")
        profile = db.get_profile({"username": username})
        profile = account_parser.json_to_account(profile)
        if profile.profile_picture != "None":
            profile_picture = profile.profile_picture
        else:
            with open("./DefaultPictures/defaultProfileCoSheet.png", "rb") as file:
                profile_picture = str(file.read())
                print(profile_picture)
        response = Response(status=200, response=json.dumps({"profilePicture": profile_picture}),
                            mimetype="application/json")
    else:
        with open("./DefaultPictures/defaultProfileCoSheet.png", "rb") as file:
            profile_picture = file.read()
            print(base64.b64encode(profile_picture))
            profile_picture = str(base64.b64encode(profile_picture))
        response = Response(status=406, response=json.dumps({"profilePicture": profile_picture}),
                        mimetype="application/json")
    return response


@app.route("/get-spreadsheet-titles", methods=["GET"])
def return_spreadsheets_titles():
    database = Database()
    username = session.get("username")
    username = "Moritz" #TODO: remove
    key_pair = {"owner": username}
    spreadsheets = database.get_spreadsheet(key_pair)
    spreadsheet_data = {"titles": [], "links": []}
    if spreadsheets:
        for sheet in spreadsheets:
            spreadsheet_data["titles"].append(sheet["settings"]["title"])
            spreadsheet_data["links"].append(sheet["link"])
        response = Response(status=200, response=json.dumps(spreadsheet_data), mimetype="application/json")
    else:
        response = Response(status=406)
    return response

    """session["username"] = "test"
    username = session.get('username')
    print(username)
    db = Database()
    spreadsheet_db = db.user_spreadsheet_database
    spreadsheets = db.get_from_database(spreadsheet_db, {"username": username})
    titles = []
    if spreadsheets:
        for i in spreadsheets:
            titles.append(i["title"])
    response = {
    response.headers.add("Access-Control-Allow-Origin", '*')
    return response
    return Response(response=json.dumps({"titles": titles}), status=200, mimetype="application/json")"""


@app.route("/deleteSpreadsheet", methods=["POST"])
def delete_spreadsheet():
    data = request.get_json()
    owner = session.get('username')
    owner = "Moritz"  #TODO: remove
    link = data["link"]
    db = Database()
    db.delete_spreadsheet(link, owner)
    return Response(status=200, mimetype="application/json")


if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True, threaded=True)
