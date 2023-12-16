import time
import rsa
import bcrypt


class Encryption:

    def __init__(self):
        pass

    def gen_whole_key(self):
        return rsa.newkeys(4096)

    def gen_public_key(self):
        print("a")
        (public_key, _) = rsa.newkeys(4096)
        return public_key

    def encrypt(self, text, key):
        return rsa.encrypt(text.encode("ascii"), key)

    def decrypt(self, text, key):
        try:
            return rsa.decrypt(text, key).decode("ascii")
        except:
            return False

    def gen_salt(self):
        return bcrypt.gensalt()

    def hash_password(self, password, salt):
        return bcrypt.hashpw(password, salt)


if __name__ == "__main__":
    e = Encryption()
    start = time.time()
    #key = e.generate_whole_key()
    #print(e.encrypt("hallo", key))
    print(e.gen_whole_key())
    print("--- %s seconds ---" % (time.time() - start))