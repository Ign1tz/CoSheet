class Account:
    def __init__(self, username, password, eMail, profile_picture, encryption_key, public_key):
        self.username = username
        self.password = password
        self.eMail = eMail
        self.profile_picture = profile_picture
        self.encryptionKey = encryption_key
        self.public_key = public_key
