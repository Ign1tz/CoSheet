#ToDo:
#   frontend: change profile picture
#          display current profile settings + option to change them
from Server.Backend.Login.SignUp import SignUp
class ProfileSettings:



    def username_already_taken(self, username):
        sign_up = SignUp()
        if sign_up.prohibit_double_username(username) is False:
            print("Username is already taken")
            return False
        return username

    def password_equals_previous_password(self, new_password):

        current_password =