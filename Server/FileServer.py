import base64

from flask import Flask, send_from_directory, request, Response, session, redirect, jsonify, url_for, make_response

from Server.Backend.Encryption.Encryption import Encryption
from Server.Backend.Login.Account import AccountParser
from flask_session import Session
from flask_cors import CORS
import os
import json
from Server.Backend.Spreadsheet.SpreadsheetSettings import SpreadsheetSettings, SpreadsheetSettingsParser, SpreadsheetSettingsLogic
from Backend.Database.Database import Database
import requests
from Server.Backend.Login.SignUp import SignUp
from Server.Backend.Login.Login import Login
from Server.Backend.Login.Account import AccountParser
from Server.Backend.ProfileSettings.ProfileSettings import ProfileSettings
from Server.Backend.Login.Account import Account
from PIL import Image
import numpy as np

app = Flask(__name__)
app.debug = True
app._staic_folder = os.path.abspath("static/")
CORS(app, support_credentials=True)
app.config["SESSION_PERMANENT"] = False
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
    password = data['password']
    confirm_password = data['confirm_password']
    sign_up = SignUp()
    correct_username = sign_up.prohibit_double_username(username)
    username_rules = sign_up.username_rules(username)
    double_email = sign_up.prohibit_double_eMail(email)
    password_equality = sign_up.proof_passwords_equality(password, confirm_password)
    password_rules = sign_up.password_rules(password)

    if correct_username and double_email and password_rules and password_equality:
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
        if not double_email:
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
    database = Database()

    username_password_match = False
    email_password_match = False

    if atSign not in email:
        username_password_match = login_class.username_password_match(password, email)
        username = email
    else:
        email_password_match = login_class.email_password_match(password, email)
        profile = database.get_profile({"email": email})
        print(profile)
        username = profile[0]["username"]

    if username_password_match or email_password_match:

        response = Response(status=200, response=json.dumps({'response': "Perfect"}), mimetype="application/json")
        #session["username"] = username
        #print(session.get("username"))
        #return redirect(url_for('get_username_email'))
        # Initializing response object

        resp = make_response({"username": username})
        print(request.cookies.get("username"))
        resp.set_cookie("username", value=username, domain="http:localhost")
        return resp
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


@app.route('/profileSettings/<username>', methods=['POST'])
def profileSettings(username):
    data = request.get_json()
    setting = ProfileSettings()
    database = Database()
    encryption = Encryption()

    new_username = data['username']
    email = data['email']
    password = data['password']
    newPassword = data['newPassword']
    confirm_password = data["confirm_password"]
    profile_picture = data['profile_picture']

    old_account = database.get_profile({"username": username})

    new_account = old_account
    resp = None

    if username != new_username:
        username_rules = setting.username_rules(new_username)
        username_taken = setting.username_already_taken(new_username)
        if not username_taken and not username_rules:
            response = Response(status=406, response=json.dumps({'response': "Something went wrong"}),
                                mimetype="application/json")
        else:
            new_account["username"] = new_username
            resp = make_response({"username": new_username})
            resp.set_cookie("username", value=new_username, domain="http://localhost")
    if email != old_account["email"]:
        email_taken = setting.email_already_taken(email)
        if not email_taken:
            response = Response(status=406, response=json.dumps({'response': "Something went wrong"}),
                                mimetype="application/json")
        else:
            new_account["email"] = email
    if newPassword:
        old_password_correct = setting.old_password_correct_check(password, old_account["salt"], old_account["password"])
        password_rules = setting.password_rules(password)
        confirm_password_check = setting.new_password_equals_confirm_password(newPassword, confirm_password)

        password_equals = setting.old_password_correct_check(newPassword, old_account["salt"], old_account["password"])


        if  password_equals:
            response = Response(status=406, response=json.dumps({'response': "Something went wrong"}),
                                mimetype="application/json")
        elif not confirm_password_check:
            response = Response(status=406, response=json.dumps({'response': "Something went wrong"}),
                                mimetype="application/json")
        elif not old_password_correct:
            response = Response(status=406, response=json.dumps({'response': "Something went wrong"}),
                                mimetype="application/json")
        elif not password_rules:
            response = Response(status=406, response=json.dumps({'response': "Something went wrong"}),
                                mimetype="application/json")
        else:

            new_account["password"] = encryption.hash_password(newPassword, old_account["salt"])
    if old_account != new_account:
        database.update_profile(old_account, new_account)
    if resp:
        return resp


@app.route("/getProfilePicture/<username>", methods=["GET"])
def get_profile_picture(username):
    db = Database()
    profile = db.get_profile({"username": username})
    if profile:
        response = Response(status=200, response=json.dumps({"profilePicture": profile["profile_picture"]}),
                            mimetype="application/json")
    else:
        response = Response(status=406)
    return response


@app.route('/getUsernameEmail/<username>', methods=["GET"])
def get_username_email(username):
    database = Database()
    test = request.url.replace("http://localhost:5000/getUsernameEmail?username=", "")

    data = database.get_profile({"username": username})

    data = data[0]
    username = data["username"]
    email = data["email"]
    profile_picture = data["profile_picture"]
    return_data = {"username": username, "email": email, "profile_picture": profile_picture}
    return return_data

# add a new spreadsheet to the database
@app.route("/postspreadsheet", methods=["POST"])
def post_spreadsheets():
    parser = SpreadsheetSettingsParser()
    database = Database()
    data = request.get_json()
    print(data)
    # check if settings are correct on backend
    spreadsheet_settings = parser.from_json(data["settings"])
    if spreadsheet_settings.validate_settings():
        database.add_spreadsheet(data)
        pass
    return Response(status=200, mimetype="application/json")


# add default spreadsheet to the database
@app.route("/createnewspreadsheet", methods=["GET"])
def create_new_spreadsheet():
    spreadsheet_settings_logic = SpreadsheetSettingsLogic()
    link = spreadsheet_settings_logic.createLink()  # link including uuid
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


# get specific spreadsheet by uuid
@app.route("/getspreadsheet/<uuid>", methods=["GET"])
def get_spreadsheet(uuid):
    database = Database()
    # search the link in the database
    spreadsheet = database.get_spreadsheet({"link": f"http://localhost:3000/spreadsheet/{uuid}"})
    if spreadsheet:
        return jsonify(spreadsheet), 200
    else:
        return jsonify({"error": "Spreadsheet not found"}), 406


# update an already existing spreadsheet
@app.route("/updatespreadsheet", methods=["POST"])
def update_spreadsheet():
    database = Database()
    data = request.get_json()
    print("data:", data)

    # only if old and new are correct
    if not data or 'old' not in data or 'new' not in data:
        return jsonify({"error": "Invalid data provided"}), 400

    new_data = data['new']
    # get old data from database
    old = database.get_spreadsheet({"link": data["old"][0]["link"]})[0]

    success = database.update_spreadsheet(old, new_data)

    if success:
        return jsonify({"message": "Spreadsheet updated successfully"}), 200
    else:
        return jsonify({"error": "Failed to update spreadsheet"}), 500



if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True, threaded=True)
