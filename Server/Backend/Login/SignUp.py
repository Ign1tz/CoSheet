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
        return  new_account

    def save_new_account(self, new_account):
        database = Database()
        profile_database = database.profiles
        database.add_one_to_database(profile_database, new_account)

    def prohibit_double_username(self, username):
        database = Database()
        get_username_database = database.get_from_database(database.profiles, {"username": username})

        if get_username_database == None:
            return True
        else:
            return False

    def prohibit_double_eMail(self, e_mail):
        database = Database()
        get_e_mail_database = database.get_from_database(database.profiles, {"e_mail": e_mail})

        if get_e_mail_database == None:
            return True
        else:
            return False

    def password_choose_rules(self, password):
        min_length = 8
        max_length = 40
        allowed_characters = re.compile('a-zA-Z0-9%_/.]*$')

        if password >= min_length and max_length <= 40:
            if allowed_characters.match(password):
                return True
            else:
                print("You used an unsupported character.")
                return False
        if (password < min_length):
            print("The password has to be at least 8 characters long.")
            return False
        else:
            print("The password can only be a maximum of 40 characters long-")
            return False

    def proof_passwords_equality(self, password, password_second):
        if password == password_second:
            return True
        else:
            return False

    def username_length_rule(self, username):
        min = 1
        max = 30
        if (username < 1):
            print("Username is too short.")
            return False;

        if (username > max):
            print("Username is too long.")
            return False;

#comment code