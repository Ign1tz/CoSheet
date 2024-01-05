from Server.Backend.Database.Database import Database
from Server.Backend.Login.Account import AccountParser
from Server.Backend.Encryption.Encryption import Encryption


class Login:

    def username_password_match(self, password, username):
        database = Database()
        encryption = Encryption()
        accountParser = AccountParser()

        username_database_json = database.get_profile({"username": username})
        print(username_database_json)

        if len(username_database_json) == 0:
            return False
        for element in username_database_json:
            username_database = accountParser.json_to_account(element)

            password_database = username_database.password

            salt = bytes(username_database.salt[2:-1], "ascii")

            hashed_password = str(encryption.hash_password(password, salt))

            if password_database == hashed_password:
                return True
        return False


    def email_password_match(self, password, email):
        database = Database()
        encryption = Encryption()
        accountParser = AccountParser()

        email_database_json = database.get_profile({"email": email})

        if len(email_database_json) == 0:
            return False
        for element in email_database_json:
            email_database = accountParser.json_to_account(element)

            password_database = email_database.password

            salt = bytes(email_database.salt[2:-1], "ascii")

            hashed_password = str(encryption.hash_password(password, salt))

            if password_database == hashed_password:
                return True
        return False
# kommentieren vom code
