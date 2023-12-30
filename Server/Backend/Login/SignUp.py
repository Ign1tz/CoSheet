from Server.Backend.Login.Account import Account
from Server.Backend.Encryption.Encryption import Encryption
from Server.Backend.Database.Database import Database
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
        not_allowed_characters = ["(", ")", "[", "]", "|", "¬", "'", "¦", "§", "$", "^", "°", "&", "*", "~", "<", ">", ":", ";",
        "#", "_", "-", "+", "=", "@", ",", "%", "£", "."]

        if password >= min_length and max_length <= 40:
            if any(not_allowed_characters not in password):
                return True
            # oder Password?
            else:
                print("You are not allowed to use these characters: ()[]{}|¬'¦§$%&°^*~<>:;#_-+=@,%£.")
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
#comment code