class Account:
    def __init__(self, username, password, email, profile_picture, encryption_key, public_key):
        self.username = username
        self.password = password
        self.email = email
        self.profile_picture = profile_picture
        self.encryption_key = encryption_key
        self.public_key = public_key

class AccountParser:
    def __init__(self):
        pass
    def account_to_json(self, account):
        return {"username": account.username, "email": account.email, "password": account.password,
                "profile_picture": account.profile_picture, "encryption_key": account.encryption_key,
                "public_key": account.public_key}

    def json_to_account(self, json):
        return Account(json["username"], json["password"], json["email"], json["profile_picture"],
                       json["encryption_key"], json["public_key"])
