from flask import Flask, send_from_directory, request, Response, session, redirect, jsonify
import os


app = Flask(__name__)
app.debug = True
app._staic_folder = os.path.abspath("static/")


@app.route('/default-spreadsheet', methods=['GET'])
def default_spreadsheet_page():
    return send_from_directory('files', "default-spreadsheet.html")


@app.route('/', methods=['GET'])
def serve_files():
    return send_from_directory('files', "homepage.html")


if __name__ == '__main__':
    app.run(host='localhost', port=3000, debug=True)
