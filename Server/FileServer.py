from flask import Flask, send_from_directory, request, Response, session, redirect, jsonify
from flask_session import Session
from flask_cors import CORS
import os
import json
from Server.Backend.Spreadsheet.SpreadsheetSettings import SpreadsheetSettings, SpreadsheetSettingsParser, \
    SpreadsheetSettingsLogic
from Backend.Database.Database import Database
import requests
from Server.Backend.Login.SignUp import SignUp
from Server.Backend.Login.Login import Login

app = Flask(__name__)
app.debug = True
app._static_folder = os.path.abspath("static/")
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


@app.route("/postspreadsheet", methods=["POST"])
def post_spreadsheets():
    parser = SpreadsheetSettingsParser()
    database = Database()
    data = request.get_json()
    print(data)
    spreadsheet_settings = parser.from_json(data["settings"])
    if spreadsheet_settings.validate_settings():
        database.add_spreadsheet(data)
        pass
    return Response(status=200, mimetype="application/json")


@app.route("/createnewspreadsheet", methods=["GET"])
def create_new_spreadsheet():
    spreadsheet_settings_logic = SpreadsheetSettingsLogic()
    link = spreadsheet_settings_logic.createLink()
    parser = SpreadsheetSettingsParser()
    database = Database()
    owner = "TestOwner"     # change to real owner

    default_spreadsheet_settings = SpreadsheetSettings(
        "Default Title", 50, False, 4, 20, False, "This is a small description for the default spreadsheet.",
        False
    )
    json_of_default = parser.to_json(default_spreadsheet_settings)

    default_spreadsheet = {"link": link, "settings": json_of_default, "spreadsheet": "NONE", "owner": "NONE"}
    database.add_spreadsheet(default_spreadsheet)
    return jsonify(default_spreadsheet), 200


@app.route("/getspreadsheet/<uuid>", methods=["GET"])
def get_spreadsheet(uuid):
    database = Database()
    spreadsheet = database.get_spreadsheet({"link": f"http://localhost:5000/spreadsheet/{uuid}"})
    if spreadsheet:
        return jsonify(spreadsheet), 200
    else:
        return jsonify({"error": "Spreadsheet not found"}), 404


if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True)
