import base64
import json
import requests


class Check:
    def check_username_for_abuse(self, username):
        check = Check()
        return check.check_if_data_is_abusiv(username)

    def check_sreadsheet(self, spreadsheet):
        check = Check()
        for row in spreadsheet:
            for cell in row:
                content = cell["content"]
                #print(content)
                if content and not check.check_if_data_is_abusiv(content):
                    #print("1")
                    cell["content"] = ""

    def check_if_data_is_abusiv(self, data):
        data = {"language": "*", "content": data, "settings": {}}
        headers = {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': 'f16fcb4b2e6545ca992a23f144c92509'
        }
        url = 'https://api.tisane.ai/parse'
        response = requests.request("Post", url, headers=headers, data=json.dumps(data))
        # #print(response.json())
        if "abuse" in response.json() and response.json()["abuse"][0]["severity"] != "low":
            #print(json.dumps(response.json()["abuse"], indent=4))
            return True
        else:
            #print("Not abusive")
            return False




if __name__ == "__main__":
    check = Check()

    with open("CoSheet logo idea.png", "rb") as file:
        a = str(file.read())
        ##print(a)
        ##print()

    with open("test.png", "wb") as file:
        a = a[2:-1]
        a = bytes(a, "utf-8")
        #print(type(a))
        file.write(a)
    pass
    """image = Image.open("./CoSheet logo idea.png")
    image_bytes = image.tobytes("xbm", "rgb")
    #print(image_bytes)"""

    #check = Check()
    #check.check_sreadsheet([[{"content": "test"}], [{"content": ""}]])
