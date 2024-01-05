from Server.Backend.Database.Database import Database
from Server.Backend.Login.Account import AccountParser
from Server.Backend.Encryption.Encryption import Encryption


class Login:

    def username_password_match(self, password, username):
        database = Database()
        encryption = Encryption()
        accountParser = AccountParser()

        username_database_json = database.get_profile({"username": username})

        if len(username_database_json) is 0:
            return False
        for element in username_database_json:
            username_database = accountParser.json_to_account(element)

            password_database = username_database.password

            public_key = username_database.public_key

            encrypted_password = encryption.encrypt(password, public_key)

            if password_database == encrypted_password:
                return True
        return False


    def email_password_match(self, password, email):
        database = Database()
        encryption = Encryption()
        accountParser = AccountParser()

        email_database_json = database.get_profile({"email": email})

        if len(email_database_json) is 0:
            return False
        for element in email_database_json:
            email_database = accountParser.json_to_account(element)

            password_database = email_database.password

            public_key = email_database.public_key

            encrypted_password = encryption.encrypt(password, public_key)

            if password_database == encrypted_password:
                return True
        return False
# kommentieren vom code
