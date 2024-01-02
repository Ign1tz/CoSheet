from Server.Backend.Login.Account import Account
from Server.Backend.Encryption.Encryption import Encryption
from Server.Backend.Database.Database import Database
import re


class SignUp:
    def __init__(self):
        pass

    def create_new_account(self, username, password, e_mail):
        encrypt = Encryption()

        whole_key = encrypt.generate_whole_key()
        public_key = encrypt.generate_public_key()

        new_account = Account(username, password, e_mail, None, whole_key, public_key)
        return new_account

    def save_new_account(self, new_account):
        database = Database()
        profile_database = database.profile_database
        database.add_one_to_database(profile_database, new_account)

    def prohibit_double_username(self, username):
        database = Database()
        get_username_database = database.get_from_database(database.profile_database, {"username": username})

        if not len(get_username_database):
            return True
        else:
            return False

    def prohibit_double_eMail(self, e_mail):
        database = Database()
        get_e_mail_database = database.get_from_database(database.profile_database, {"e_mail": e_mail})

        if not len(get_e_mail_database):
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

    def proof_passwords_equality(self, password, password_second):
        if password == password_second:
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
                    print("The username has to be shorter than 30 characters.")
                    return False
            return True
        if len(username) < min_length:
            print("Username is too short.")
            return False
        if len(username) > max_length:
            print("Username is too long.")
            return False

#ToDo:
# comment code
# add profile settings