from flask import Flask, send_from_directory, request, Response, session, redirect, jsonify
from flask_session import Session
from flask_cors import CORS
import os
import json
from Backend.Database.Database import Database

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


@app.route('/default-spreadsheet', methods=['GET'])
def default_spreadsheet_page():
    return send_from_directory('files', "default-spreadsheet.html")


@app.route("/login", methods=["GET"])
def serve_login():
    return send_from_directory("files", "login.html")


@app.route("/get-spreadsheet-titles", methods=["GET"])
def return_spreadsheets_titles():
    print("test")
    response = Response(status=200, response=json.dumps({"titles": ["Elternsprechtag", "BBQ"]}), mimetype="application/json")
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


@app.route("/deleteSpreadsheet", methods=["DELETE"])
def delete_spreadsheet():
    data = request.get_json()
    username = session.get('username')
    spreadsheet = data["spreadsheet"]
    db = Database()
    db.delete_from_database(db.spreadsheet_database, username, spreadsheet)


if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True)
