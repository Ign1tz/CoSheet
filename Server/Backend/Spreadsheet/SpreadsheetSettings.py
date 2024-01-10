class SpreadsheetSettings:
    def __init__(self, title, cell_width, edit_empty_only, num_columns, num_rows, column_headers, description,
                 allow_logged_in_edit, link):
        self.title = title  # string
        self.cell_width = cell_width  # percent
        self.edit_empty_only = edit_empty_only  # boolean
        self.num_columns = num_columns
        self.num_rows = num_rows
        self.column_headers = column_headers
        self.description = description  # string
        self.allow_logged_in_edit = allow_logged_in_edit  # boolean
        self.link = link
        #self.text_formatting = text_formatting  # maybe split in color, size, weight...


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

    def to_json(self):
        return {
            "title": self.title,
            "cellWidth": self.cell_width,
            "editEmptyOnly": self.edit_empty_only,
            "numColumns": self.num_columns,
            "numRows": self.num_rows,
            "columnHeadersEditable": self.column_headers,
            "description": self.description,
            "allowLoggedInEdit": self.allow_logged_in_edit,
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

    def update_settings(self, **kwargs):
        for key, value in kwargs.items():
            if hasattr(self, key):
                setattr(self, key, value)
        self.validate_settings()


class SpreadsheetSettingsParser:
    def __init__(self):
        pass

    def to_json(self, spreadsheet_settings):
        return {
            "title": spreadsheet_settings.title,
            "cell_width": spreadsheet_settings.cell_width,
            "edit_empty_only": spreadsheet_settings.edit_empty_only,
            "num_columns": spreadsheet_settings.num_columns,
            "num_rows": spreadsheet_settings.num_rows,
            "column_headers": spreadsheet_settings.column_headers,
            "description": spreadsheet_settings.description,
            "allow_logged_in_edit": spreadsheet_settings.allow_logged_in_edit,
        }

    def from_json(self, json_data):
        return SpreadsheetSettings(
            json_data["title"],
            json_data["cell_width"],
            json_data["edit_empty_only"],
            json_data["num_columns"],
            json_data["num_rows"],
            json_data["column_headers"],
            json_data["description"],
            json_data["allow_logged_in_edit"], "NONE"
        )

if __name__ == "__main__":
    spreadsheetSettings = SpreadsheetSettings()
