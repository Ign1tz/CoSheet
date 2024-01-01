from pymongo.mongo_client import MongoClient
from dotenv import load_dotenv
import os
class Database:
    def __init__(self):
        load_dotenv()
        temp_client = MongoClient(os.getenv("DATABASE_LINK"))
        temp_profile_DB = temp_client["ProfileDatabase"]
        temp_spreadsheet_DB = temp_client["SpreadsheetDatabase"]
        self.client = temp_client
        self.profile_cluster = temp_client["ProfileDatabase"]
        self.profile_database = temp_profile_DB["Profiles"]
        self.spreadsheet_cluster = temp_client["SpreadsheetDatabase"]
        self.user_spreadsheet_database = temp_spreadsheet_DB["UserSpreadsheets"]

    def get_from_database(self, database, key_pair):
        return list(database.find(key_pair))

    def add_one_to_database(self, database, entry):
        database.insert_one(entry)

    def remove_one_from_database(self, database, username, password):
        database.delete_one({"Username": username, "Password": password})

    def update_one_entry(self, database, old_entry, entry):
        database.update_one(old_entry, entry)


if __name__ == "__main__":
    data = Database()
    data.add_one_to_database(data.profile_database, {"Username": "tester2"})
