from pymongo.mongo_client import MongoClient
from dotenv import load_dotenv
import os
import json
import requests


class Database:

    def get_profile(self, key_pair):
        r = requests.get("http://menews.site/get-profile",
                         data=json.dumps(key_pair), headers={
                "Content-Type": "application/json"})
        data = json.loads(r.text)
        if data is None:
            return None
        return json.loads(r.text)["profiles"]

    def get_spreadsheet(self, key_pair):
        r = requests.get("http://menews.site/get-spreadsheet",
                         data=json.dumps(key_pair), headers={
                "Content-Type": "application/json"})
        return json.loads(r.text)["spreadsheets"]

    def add_profile(self, profile):
        print(type(profile))
        r = requests.post("http://menews.site/add-profile",
                          data=json.dumps(profile), headers={
                "Content-Type": "application/json"})

    def add_spreadsheet(self, spreadsheet):
        r = requests.post("http://menews.site/add-spreadsheet",
                          data=json.dumps(spreadsheet), headers={
                "Content-Type": "application/json"})

    def delete_profile(self, username, password):
        r = requests.post("http://menews.site/remove-profile",
                          data=json.dumps({"username": username, "password": password}), headers={
                "Content-Type": "application/json"})

    def delete_spreadsheet(self, title, owner):
        r = requests.post("http://menews.site/remove-spreadsheet",
                          data=json.dumps({"title": title, "owner": owner}), headers={
                "Content-Type": "application/json"})

    def update_profile(self, old, new):
        r = requests.post("http://menews.site/update-profile", data=json.dumps({"old": old, "new": new}), headers={
            "Content-Type": "application/json"})


    """
    deprecated
    def __init__(self):
        load_dotenv()
        temp_client = MongoClient(os.getenv("DATABASE_LINK"))
        temp_profile_DB = temp_client["ProfileDatabase"]
        temp_spreadsheet_DB = temp_client["SpreadsheetDatabase"]
        self.client = temp_client
        self.profile_cluster = temp_client["ProfileDatabase"]
        self.profile_database = temp_profile_DB["Profiles"]
        self.spreadsheet_cluster = temp_client["SpreadsheetDatabase"]
        self.spreadsheet_database = temp_spreadsheet_DB["UserSpreadsheets"]

    def get_from_database(self, database, key_pair):
        found = database.find(key_pair)
        list = []
        for i in found:
            list.append(i)
        return list

    def add_one_to_database(self, database, entry):
        database.insert_one(entry)

    def remove_account(self, username, password):
        db = Database()
        db.profile_database.delete_one({"Username": username, "Password": password})

    def remove_spreadsheet(self, username, spreadsheet):
        db = Database()
        db.spreadsheet_database.delete_one({"Owner": username, "Title": spreadsheet})

    def update_one_entry(self, database, old_entry, entry):
        database.update_one(old_entry, entry)"""


if __name__ == "__main__":
    data = Database()
    print(data.get_profile({"username":"anna"}))
