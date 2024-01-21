from Server.Backend.Login.Account import Account
from Server.Backend.Encryption.Encryption import Encryption
from Server.Backend.Database.Database import Database
from Server.Backend.Login.Account import AccountParser
from dotenv import load_dotenv
import os
import re


class SignUp:
    def __init__(self):
        pass

#die untere Methode erstellt einen neues Acount-Objekt und wandelt ihn in ein Json-Objekt
    def create_new_account(self, username, password, email):
        encrypt = Encryption()
        account = AccountParser()
        salt = encrypt.gen_salt()

        hashed_password = encrypt.hash_password(password, salt)
        path = os.path.join(os.path.join(os.path.dirname(__file__), './default_picture.txt'))
        with open(path, "r") as file:
            picture = file.read()
        new_account = Account(username, str(hashed_password), email, picture, str(salt))

        new_account = account.account_to_json(new_account)
        return new_account

#die Methode speichert das Account-Json-Objekt in der Datenbank ab
    def save_new_account(self, new_account):
        database = Database()
        # profile_database = database.profile_database
        database.add_profile(new_account)

#Hier wird geschaut ob der Username bereits verwendet wird in der Datenbank
    def prohibit_double_username(self, username):
        database = Database()
        # get_username_database = database.get_from_database(database.profile_database, {"username": username})
        get_username_database = database.get_profile({"username": username})

        if len(get_username_database) == 0:
            return True
        else:
            return False

#Hier wird geschaut ob die E-Mail in der Datenbank bereits benutzt wird
    def prohibit_double_eMail(self, email):
        database = Database()
        get_e_mail_database = database.get_profile({"email": email})

        if len(get_e_mail_database) == 0:
            return True
        else:
            return False
#Hier wird geschaut ob das password eine gewisse Länge hat und welche Zeichen benutzt werden
    def password_rules(self, password):
        min_length = 8
        max_length = 40
        allowed_characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$%!?@#&"

        if len(password) >= min_length and len(password) <= max_length:
            for element in password:
                if element not in allowed_characters:
                    #print("Character is not supported.")
                    return False
            return True
        if len(password) < min_length:
            #print("The password has to be at least 8 characters long.")
            return False
        if len(password) > max_length:
            #print("The password has to be shorter than 40 characters.")
            return False

#Diese Methode überprüft ob das Passwort mit dem Confirm Passwort übereinstimmt
    def proof_passwords_equality(self, password, confirm_password):
        if password == confirm_password:
            return True
        else:
            return False

#Die untere Methode überprüft ob der Username gewisse Kriterien erfüllt (Länge, Zeichen)
    def username_rules(self, username):
        min_length = 1
        max_length = 30
        allowed_characters = "abcdefghijklmnopqrstuvwxyz1234567890_."

        if min_length < len(username) < max_length:
            for element in username:
                if element not in allowed_characters:
                    #print("Character in username is not supported.")
                    return False
            return True
        if len(username) < min_length:
            #print("Username is too short.")
            return False
        if len(username) > max_length:
            #print("Username is too long.")
            return False

    def email_rules(self, email):
        ad = "Q"
