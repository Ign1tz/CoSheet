import React, { useState } from 'react';
import SpreadsheetSettings from "../components/SpreadsheetSettings";
import Spreadsheet from "../components/Spreadsheet";

export default function SpreadsheetPage() {
    const [settings, setSettings] = useState({
        title: 'Default Title',
        editEmptyOnly: false,
        numColumns: 4,
        numRows: 20,
        columnHeadersEditable: false,
        description: 'This is a small description for the default spreadsheet.',
        allowLoggedInEdit: false,
    });

    const [selectedCell, setSelectedCell] = useState(null);
    const [cellFormatting, setCellFormatting] = useState({});

    const handleSettingsChange = (newSettings) => {
        setSettings({ ...settings, ...newSettings });
    };

    const handleSelectCell = (rowIndex, colIndex) => {
        setSelectedCell({ row: rowIndex, col: colIndex });
    };

    const handleApplyFormatting = (formatting) => {
        if (selectedCell) {
            setCellFormatting({
                ...cellFormatting,
                [`${selectedCell.row}-${selectedCell.col}`]: {
                    ...cellFormatting[`${selectedCell.row}-${selectedCell.col}`],
                    ...formatting,
                }
            });
        }
    };

    return (
        <div>
            <SpreadsheetSettings
                onSettingsChange={handleSettingsChange}
                onApplyFormatting={handleApplyFormatting}
                selectedCell={selectedCell}
            />
            <h2 className="spreadsheet-title">{settings.title}</h2>
            <p className="spreadsheet-description">{settings.description}</p>
            <Spreadsheet
                numberOfRows={settings.numRows}
                numberOfColumns={settings.numColumns}
                onCellSelect={handleSelectCell}
                cellFormatting={cellFormatting}
                columnHeadersEditable={settings.columnHeadersEditable}
            />
        </div>
    );
}
