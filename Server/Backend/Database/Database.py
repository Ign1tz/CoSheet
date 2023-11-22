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
        self.profile_Database = temp_client["ProfileDatabase"]
        self.profiles = temp_profile_DB["Profiles"]
        self.spreadsheet_Database = temp_client["SpreadsheetDatabase"]
        self.user_spreadsheets = temp_spreadsheet_DB["UserSpreadsheets"]
        pass

    def get_from_database(self, database, key, value):
        return database.find({key: value})

    def add_one_to_database(self, database, entry):
        database.insert_one(entry)

if __name__ == "__main__":
    data = Database()
    data.add_one_to_database(data.profiles, {"Username": "tester2"})
