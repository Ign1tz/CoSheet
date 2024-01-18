#ToDo:
# frontend: change profile picture
# wenn 'LogOut' Session in Fileserver muss auf "nichts" gesetzt werden/"gelöscht" werden
# wenn username geändert dann session name ändern

from Server.Backend.Login.SignUp import SignUp
from Server.Backend.Database.Database import Database
class ProfileSettings:


    def username_already_taken(self, username):
        sign_up = SignUp()
        if sign_up.prohibit_double_username(username) is False:
            print("Username is already taken")
            return False
        return username

    def username_rules(self, username):
        sign_up = SignUp()
        sign_up.username_rules(username)

    def password_equals_previous_password(self, new_password, password):
        database = Database()

        current_password = database.get_profile({"password": password})

        if current_password == new_password:
            print("Don't use the same password twice.")
            return False
        else:
            return True

    def new_password_equals_confirm_password(self, new_password, confirm_password):
        sign_up = SignUp()
        sign_up.proof_passwords_equality(new_password, confirm_password)

    def password_rules(self, new_password):
        sign_up = SignUp()
        sign_up.password_rules(new_password)

    def email_already_taken(self, email):
        sign_up = SignUp()
        sign_up.prohibit_double_eMail(email)


