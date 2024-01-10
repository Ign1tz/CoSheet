from flask import Flask, send_from_directory, request, Response, session, redirect, jsonify
from flask_session import Session
from flask_cors import CORS
import os
import json
from Server.Backend.Database.Database import Database
from Server.Backend.Spreadsheet.SpreadsheetSettings import SpreadsheetSettings, SpreadsheetSettingsParser

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


@app.route("/settings", methods=['GET'])
def settings():
    return send_from_directory('files', "SpreadsheetSettings.html")


@app.route("/login", methods=["GET"])
def serve_login():
    return send_from_directory("files", "login.html")


@app.route("/postspreadsheet", methods=["POST"])
def post_spreadsheets():
    print("Hallo")
    parser = SpreadsheetSettingsParser()
    database = Database()
    data = request.get_json()
    spreadsheet_settings = parser.from_json(data["settings"])
    if spreadsheet_settings.validate_settings():
        print("test")
        database.add_spreadsheet(data)
        pass
    return Response(status=200, mimetype="application/json")


@app.route("/getspreadsheet", methods=["GET"])
def get_spreadsheet():
    return Response(status=200)


if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True)
