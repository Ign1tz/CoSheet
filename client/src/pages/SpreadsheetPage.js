import React, { useState } from 'react';
import SpreadsheetSettings from "../components/SpreadsheetSettings";
import Spreadsheet from "../components/Spreadsheet";

export default function SpreadsheetPage() {
    const [settings, setSettings] = useState({
        title: 'Default Title',
        editEmptyOnly: false,
        numColumns: 4,
        numRows: 20,
        columnHeaders: 'Default Header',
        description: 'This is a small description for the default spreadsheet.',
        allowLoggedInEdit: false,
    });

    const handleSettingsChange = (newSettings) => {
        setSettings(newSettings);
    };

    return (
        <div>
            <SpreadsheetSettings
                onSettingsChange={handleSettingsChange}
            />
            <h2 className="spreadsheet-title">{settings.title}</h2>
            <p className="spreadsheet-description">{settings.description}</p>
            <Spreadsheet
                numberOfRows={settings.numRows}
                numberOfColumns={settings.numColumns}
            />
        </div>
    );
}
