from Server.Backend.Database.Database import Database
from Server.Backend.Login.Account import Account
from Server.Backend.Encryption.Encryption import Encryption

class Login:

    def do_password_and_username_match_in_database(self, password, username):
        database = Database()
        encryption = Encryption()
        username_database = database.get_from_database(database.profiles, {"username": username})
        if username_database == None:
            return False

        password_database = username_database.password

        public_key = username_database.public_key

        encrypted_password = encryption.encrypt(password, public_key)

        if password_database == encrypted_password:
            return True
        else:
            return False


#merk dir passwort ist verschlüsselt - dafür ist public key
#methoden name ändern
#kommentieren vom code