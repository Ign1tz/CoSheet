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

    def save_new_account(self, new_account):
        database = Database()
        # profile_database = database.profile_database
        database.add_profile(new_account)

    def prohibit_double_username(self, username):
        database = Database()
        # get_username_database = database.get_from_database(database.profile_database, {"username": username})
        get_username_database = database.get_profile({"username": username})

        if len(get_username_database) == 0:
            return True
        else:
            return False

    def prohibit_double_eMail(self, email):
        database = Database()
        get_e_mail_database = database.get_profile({"email": email})

        if len(get_e_mail_database) == 0:
            return True
        else:
            return False

    def password_rules(self, password):
        min_length = 8
        max_length = 40
        allowed_characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$%!?@#&"

        if len(password) >= min_length and len(password) <= max_length:
            for element in password:
                if element not in allowed_characters:
                    print("Character is not supported.")
                    return False
            return True
        if len(password) < min_length:
            print("The password has to be at least 8 characters long.")
            return False
        if len(password) > max_length:
            print("The password has to be shorter than 40 characters.")
            return False

    def proof_passwords_equality(self, password, confirm_password):
        if password == confirm_password:
            return True
        else:
            return False

    def username_rules(self, username):
        min_length = 1
        max_length = 30
        allowed_characters = "abcdefghijklmnopqrstuvwxyz1234567890_."

        if min_length < len(username) < max_length:
            for element in username:
                if element not in allowed_characters:
                    print("Character in username is not supported.")
                    return False
            return True
        if len(username) < min_length:
            print("Username is too short.")
            return False
        if len(username) > max_length:
            print("Username is too long.")
            return False

    def email_rules(self, email):
        ad = "Q"
#ToDo:
# comment code
# add profile settings