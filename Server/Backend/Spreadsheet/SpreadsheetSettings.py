import uuid
from Server.Backend.Database.Database import Database


class SpreadsheetSettings:
    def __init__(self, title, cell_width, edit_empty_only, num_columns, num_rows, column_headers, description,
                 allow_logged_in_edit):
        self.title = title  # string
        self.cell_width = cell_width  # percent
        self.edit_empty_only = edit_empty_only  # boolean
        self.num_columns = num_columns
        self.num_rows = num_rows
        self.column_headers = column_headers
        self.description = description  # string
        self.allow_logged_in_edit = allow_logged_in_edit  # boolean

    def validate_settings(self):

        valid = True

        if not isinstance(self.title, str):
            valid = False
            raise ValueError("Title must be a string")

        if not (1 < self.num_columns <= 1000):
            valid = False
            raise ValueError("Number of columns must be a number between 1 and 1000")

        if not isinstance(self.num_columns, int):
            valid = False
            raise ValueError("Number of columns must be an int")

        if not (1 <= self.num_rows <= 1000):
            valid = False
            raise ValueError("Number of rows must be a number between 1 and 1000")

        if not isinstance(self.num_rows, int):
            valid = False
            raise ValueError("Number of rows must be an int")

        if not (1 <= self.cell_width <= 100):
            valid = False
            raise ValueError("Cell width must be a percentage between 1 and 100")

        if not isinstance(self.column_headers, bool):
            valid = False
            raise ValueError("Column headers must be a boolean")

        if not isinstance(self.description, str):
            valid = False
            raise ValueError("Description must be a string")

        if not isinstance(self.edit_empty_only, bool):
            valid = False
            raise ValueError("Edit empty only flag must be a boolean")

        if not isinstance(self.allow_logged_in_edit, bool):
            valid = False
            raise ValueError("Allow logged in to edit flag must be a boolean")

        return valid

    def update_settings(self, **kwargs):
        for key, value in kwargs.items():
            if hasattr(self, key):
                setattr(self, key, value)
        self.validate_settings()


class SpreadsheetSettingsParser:
    def __init__(self):
        pass

    def to_json(self, spreadsheetSettings):
        return {
            "title": spreadsheetSettings.title,
            "cellWidth": spreadsheetSettings.cell_width,
            "editEmptyOnly": spreadsheetSettings.edit_empty_only,
            "numColumns": spreadsheetSettings.num_columns,
            "numRows": spreadsheetSettings.num_rows,
            "columnHeadersEditable": spreadsheetSettings.column_headers,
            "description": spreadsheetSettings.description,
            "allowLoggedInEdit": spreadsheetSettings.allow_logged_in_edit,
        }

    def from_json(self, json_data):
        return SpreadsheetSettings(
            json_data["title"],
            json_data["cellWidth"],
            json_data["editEmptyOnly"],
            json_data["numColumns"],
            json_data["numRows"],
            json_data["columnHeadersEditable"],
            json_data["description"],
            json_data["allowLoggedInEdit"]
        )


class SpreadsheetSettingsLogic:
    def createLink(self):
        database = Database()
        valid = False
        while not valid:

            id = str(uuid.uuid4())
            basicLink = "http://localhost:5000/spreadsheet/"
            link = basicLink + id

            isthere = database.get_spreadsheet({"link": link})
            if len(isthere) == 0:
                valid = True
            print(isthere)
        return link


if __name__ == "__main__":
    spreadsheetSettings = SpreadsheetSettings()
