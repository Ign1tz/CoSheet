from Server.Backend.Login.SignUp import SignUp
from Server.Backend.Database.Database import Database
from Server.Backend.Login.Account import Account
from Server.Backend.Encryption.Encryption import Encryption
from Server.Backend.Login.Account import AccountParser


class ProfileSettings:

    def username_already_taken(self, username):
        sign_up = SignUp()
        if sign_up.prohibit_double_username(username) is False:
            # print("Username is already taken")
            return False
        return username

    def username_rules(self, username):
        sign_up = SignUp()
        return sign_up.username_rules(username)

    def old_password_correct_check(self, password, salt, old_password):
        database = Database()
        encryption = Encryption()
        accountParser = AccountParser()

        hashed_password = str(encryption.hash_password(password, salt))

        return old_password == hashed_password

    def password_equals_previous_password(self, password, new_password):
        database = Database()

        database_password = database.get_profile({"password": password})

        if database_password == new_password:
            # print("Don't use the same password twice.")
            return False
        else:
            return True

    def new_password_equals_confirm_password(self, new_password, confirm_password):
        sign_up = SignUp()
        return sign_up.proof_passwords_equality(new_password, confirm_password)

    def password_rules(self, new_password):
        sign_up = SignUp()

        return sign_up.password_rules(new_password)

    def email_already_taken(self, email):
        sign_up = SignUp()
        return sign_up.prohibit_double_eMail(email)

    def create_new_account(self, username, password, email, profile_picture):
        encrypt = Encryption()
        account = AccountParser()
        salt = encrypt.gen_salt()

        hashed_password = encrypt.hash_password(password, salt)

        new_account = Account(username, str(hashed_password), email, "None", str(salt))

        new_account = account.account_to_json(new_account)
        return new_account
