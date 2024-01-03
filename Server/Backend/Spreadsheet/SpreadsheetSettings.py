class SpreadsheetSettings:
    def __init__(self, title, cell_width, edit_empty_only, num_columns, num_rows, column_headers, description,
                 allow_logged_in_edit, text_formatting):
        self.title = title  # string
        self.cell_width = cell_width  # percent
        self.edit_empty_only = edit_empty_only  # boolean
        self.num_columns = num_columns
        self.num_rows = num_rows
        self.column_headers = column_headers
        self.description = description  # string
        self.allow_logged_in_edit = allow_logged_in_edit  # boolean
        self.text_formatting = text_formatting  # maybe split in color, size, weight...


def validate_settings(self):
    if not isinstance(self.title, str):
        raise ValueError("Title must be a string")

    if not (1 < self.num_columns <= 1000):
        raise ValueError("Number of columns must be a number between 1 and 1000")

    if not isinstance(self.num_columns, int):
        raise ValueError("Number of columns must be an int")

    if not (1 < self.num_rows <= 1000):
        raise ValueError("Number of rows must be a number between 1 and 1000")

    if not isinstance(self.num_rows, int):
        raise ValueError("Number of rows must be an int")

    if not (1 < self.cell_width <= 100):
        raise ValueError("Cell width must be a percentage between 1 and 100")

    if not isinstance(self.column_headers, str):
        raise ValueError("Column headers must be a string")

    if not isinstance(self.description, str):
        raise ValueError("Description must be a string")

    if not isinstance(self.edit_empty_only, bool):
        raise ValueError("Edit empty only flag must be a boolean")

    if not isinstance(self.allow_logged_in_edit, bool):
        raise ValueError("Allow logged in to edit flag must be a boolean")

    # text formatting ?????


def to_json(self):
    return {
        "title": self.title,
        "cell_width": self.cell_width,
        "edit_empty_only": self.edit_empty_only,
        "num_columns": self.num_columns,
        "num_rows": self.num_rows,
        "column_headers": self.column_headers,
        "description": self.description,
        "allow_logged_in_edit": self.allow_logged_in_edit,
        "text_formatting": self.text_formatting
    }


def from_json(cls, json_data):
    return cls(
        title=json_data.get("title"),
        cell_width=json_data.get("cell_width"),
        edit_empty_only=json_data.get("edit_empty_only"),
        num_columns=json_data.get("num_columns"),
        num_rows=json_data.get("num_rows"),
        column_headers=json_data.get("column_headers"),
        description=json_data.get("description"),
        allow_logged_in_edit=json_data.get("allow_logged_in_edit"),
        text_formatting=json_data.get("text_formatting")
    )


def update_settings(self, **kwargs):
    for key, value in kwargs.items():
        if hasattr(self, key):
            setattr(self, key, value)
    self.validate_settings()


if __name__ == "__main__":
    spreadsheetSettings = SpreadsheetSettings()
