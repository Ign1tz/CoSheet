from flask import Flask, send_from_directory, request, Response, session, redirect, jsonify
import os


app = Flask(__name__)
app.debug = True
app._staic_folder = os.path.abspath("static/")


@app.route('/', methods=['GET'])
def serve_files():
    return send_from_directory('files', "homepage.html")

@app.route('/login', methods=['GET'])
def serve_login():
    return send_from_directory('files', "login.html")

@app.route('/profile/login', methods=['GET'])
def login():
    print("Welcome")
    return redirect('/')

@app.route('/signup', methods=['GET'])
def serve_signup():
    return send_from_directory('files', "signup.html")

@app.route('/profile/signup', methods=['GET'])
def signup():
    print("Hello")
    return redirect('/')

if __name__ == '__main__':
    app.run(host='localhost', port=3000, debug=True)
