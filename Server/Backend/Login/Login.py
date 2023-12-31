from Server.Backend.Database.Database import Database
from Server.Backend.Login.Account import Account
from Server.Backend.Encryption.Encryption import Encryption

class Login:

    def username_password_match(self, password, username):
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

def email_password_match(self, password, email):
    database = Database()
    encryption = Encryption()

    email_database = database.get_from_database(database.profiles, {"email": email})

    if email_database == None:
        return False

    password_database = email_database.password

    public_key = email_database.public_key

    encrypted_password = encryption.encrypt(password, public_key)

    if password_database == encrypted_password:
        return True
    else:
        return False
#kommentieren vom code