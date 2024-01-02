from flask import Flask, send_from_directory, request, Response, session, redirect, jsonify
from flask_cors import CORS
import os
import json

app = Flask(__name__)
app.debug = True
app._static_folder = os.path.abspath("static/")


@app.route('/default-spreadsheet', methods=['GET'])
def default_spreadsheet_page():
    return send_from_directory('files', "default-spreadsheet.html")


@app.route('/spreadsheet', methods=['GET'])
def spreadsheet():

    data = {'response': "Perfect"}
    return Response(response=json.dumps(data), mimetype="application/json")


@app.route('/', methods=['GET'])
def serve_files():
    return send_from_directory('files', "homepage.html")


@app.route("/login", methods=["GET"])
def serve_login():
    return send_from_directory("files", "login.html")


if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True)
