from Server.Backend.Login.Account import Account
from Server.Backend.Encryption.Encryption import Encryption
from Server.Backend.Database.Database import Database
class sign_up:
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

    def prohibit_double_username(self, new_account):
        database = Database()
        get_username_database = database.get_from_database(database.profiles, {"username":new_account.username})

        if get_username_database == None:
            return True
        else:
            return False

    def prohibit_double_eMail(self, new_account):
        database = Database()
        get_e_mail_database = database.get_from_database(database.profiles, {"e_mail": new_account.e_mail})

        if get_e_mail_database == None:
            return True
        else:
            return False

