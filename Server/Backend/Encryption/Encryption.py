import time
import rsa


class Encryption:


    def __init__(self):
        pass

    def generate_whole_key(self):
        return rsa.newkeys(4096)

    def generate_public_key(self):
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


if __name__ == "__main__":
    e = Encryption()
    start = time.time()
    #key = e.generate_whole_key()
    #print(e.encrypt("hallo", key))
    print(e.generate_whole_key())
    print("--- %s seconds ---" % (time.time() - start))