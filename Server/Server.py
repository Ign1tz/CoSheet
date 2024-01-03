from flask import Flask, send_from_directory, request, Response, session, redirect, jsonify
from flask_session import Session
from flask_cors import CORS
import os
import json
from Backend.Database.Database import Database

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


@app.route("/login", methods=["GET"])
def serve_login():
    return send_from_directory("files", "login.html")


if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True)
