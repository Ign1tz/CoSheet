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
        columnWidths: Array(4).fill(100),
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
                columnWidths={settings.columnWidths}
                onColumnWidthChange={(newWidths) => handleSettingsChange({columnWidths: newWidths})}
            />
            <h2 className="spreadsheet-title">{settings.title}</h2>
            <p className="spreadsheet-description">{settings.description}</p>
            <Spreadsheet
                numberOfRows={settings.numRows}
                numberOfColumns={settings.numColumns}
                 onCellSelect={handleSelectCell}
                cellFormatting={cellFormatting}
                columnWidths={settings.columnWidths}
                onColumnWidthChange={(widths) => handleSettingsChange({columnWidths: widths})}
            />
        </div>
    );
}
