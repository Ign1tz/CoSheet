from Server.Backend.Login.Account import Account
from Server.Backend.Encryption.Encryption import Encryption
from Server.Backend.Database.Database import Database
class sign_up:
    def __init__(self):
        pass
    def create_new_account(self, username, password, eMail):
        encrypt = Encryption()

        whole_key = encrypt.generate_whole_key()
        public_key = encrypt.generate_public_key()

        newAccount = Account(username, password, eMail, None, whole_key, public_key)
        return  newAccount

    def save_new_account(self, newAccount):
        pass