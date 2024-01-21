from Server.Backend.Encryption.Encryption import Encryption
class Account:
    def __init__(self, username, password, email, profile_picture, salt):
        #ggf. encryptionkey und public key der methode übergeben
        self.username = username
        self.password = password
        self.email = email
        self.profile_picture = profile_picture
        self.salt = salt

class AccountParser:
    def __init__(self):
        pass

    #die untere Methode wandelt einen Account zu einem Json Objekt um
    def account_to_json(self, account):
        return {"username": account.username, "email": account.email, "password": account.password,
                "profile_picture": account.profile_picture, "salt": account.salt}

    # die untere Methode wandelt ein Json Objekt  zu einem Account Objekt um
    def json_to_account(self, json):
        return Account(json["username"], json["password"], json["email"], json["profile_picture"], json["salt"])




