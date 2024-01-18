import React, { useEffect, useState } from 'react';
import SpreadsheetSettings from "../components/SpreadsheetSettings";
import Spreadsheet from "../components/Spreadsheet";
import '../styles/SpreadsheetPage.css';


export default function SpreadsheetPage() {

    let uuid = window.location.pathname.replace('/spreadsheet/', '');

    const [settings, setSettings] = useState({
        title: 'Default Title',
        editEmptyOnly: false,
        numColumns: 4,
        numRows: 20,
        columnHeadersEditable: false,
        description: 'This is a small description for the default spreadsheet.',
        allowLoggedInEdit: false,
        cellWidth: false,
        isTextBold: false,
        cellBackgroundColor: '#FFFFFF',
        selectedFont: 'Arial',
    });

    const getColumnName = (columnNumber) => {
        let columnName = '';
        let base = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let num = columnNumber;

        while (num >= 26) {
            columnName = base[num % 26] + columnName;
            num = Math.floor(num / 26) - 1;
        }
        return base[num] + columnName;
    };

    const [columnHeaders, setColumnHeaders] = useState(
        [...Array(settings.numColumns)].map((_, index) => getColumnName(index))
    );

    const [spreadsheetExists, setSpreadsheetExists] = useState(false);
    const [oldSpreadsheetData, setOldSpreadsheetData] = useState(null);
    const [selectedCell, setSelectedCell] = useState(null);
    const [cellFormatting, setCellFormatting] = useState({});
    const [spreadsheetRows, setSpreadsheetRows] = useState([])
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    // TODO: isloggedin check

    const createSpreadsheet = () => {
        setSpreadsheetRows(() => {
            return Array.from({ length: settings.numRows }, () =>
                Array(settings.numColumns).fill('')
            );
        });
    };

    const handleSettingsChange = (newSettings) => {
        setSettings({ ...settings, ...newSettings });
    };

    useEffect(() => {
        fetchSpreadsheetData(uuid);
    }, []);

    const handleSelectCell = (rowIndex, colIndex) => {
        setSelectedCell({ row: rowIndex, col: colIndex });
    };

    const fetchSpreadsheetData = async (uuid) => {
        try {
            let response = await fetch(`http://localhost:5000/getspreadsheet/`+uuid);
            console.log("response:", response)
            if (!response.ok) {
                setSpreadsheetExists(false);
                response = await fetch(`http://localhost:5000/createnewspreadsheet`);
                if (!response.ok) {
                    console.error("Failed to create a new spreadsheet.");
                }
                createSpreadsheet()
            } else {
                setSpreadsheetExists(true);
                const data = await response.json();
                console.log("data:", data)
                setOldSpreadsheetData(data);
                updateSpreadsheetData(data);
            }
        } catch (error) {
            console.error('Error fetching spreadsheet data:', error);
        }
    };

    const updateSpreadsheetData = (data) => {
        if (data) {
            const spreadsheetInfo = data[0];
            setSettings(spreadsheetInfo.settings || {});
            const normalizeSpreadsheet = spreadsheetInfo.spreadsheet.map(row =>
                row.map(cell => cell.content)
            )
            setSpreadsheetRows(normalizeSpreadsheet)
        } else {
            console.error("No data received to update spreadsheet.")
        }

    };

    const prepareDataForBackend = () => {

        const spreadsheetData = {
            headers: columnHeaders,
            rows: spreadsheetRows.map((row, rowIndex) =>
                row.map((cellContent, colIndex) => {
                    const cellId = `${rowIndex}-${colIndex}`;
                    const formatting = cellFormatting[cellId] || {};
                    return {
                        content: cellContent,
                        formatting: formatting,
                        row: rowIndex,
                        column: colIndex
                    };
                })
            ),
        };

        return ({
            settings,
            spreadsheet: spreadsheetData,
        });
    };


    const sendDataToBackend = async () => {
        const newData = prepareDataForBackend();
        console.log("newData:", newData)
        let requestBody;
        const endpoint = spreadsheetExists ? 'updatespreadsheet' : 'postspreadsheet';

        if (spreadsheetExists) {
            const oldData = oldSpreadsheetData;
            console.log("oldData:", oldData)
            requestBody = JSON.stringify({ old: oldData, new: newData});
        } else {
            requestBody = JSON.stringify(newData);
        }
        console.log("old and new:", requestBody)

        try {
            const response = await fetch(`http://localhost:5000/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: requestBody
            });
            if (!response.ok) {
            console.error("Failed to send data to the backend.");
        }
        } catch (error) {
            console.error('Failed to send data to the backend:', error);
        }
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
                settingsProps={settings}
            />
            <div className="header-container">
                <div className="title-description-container">
                    <h2 className="spreadsheet-title">{settings.title}</h2>
                    <p className="spreadsheet-description">{settings.description}</p>
                </div>
                <button className="save-button" onClick={sendDataToBackend}>Save Spreadsheet</button>
            </div>
            <Spreadsheet
                numberOfRows={settings.numRows}
                numberOfColumns={settings.numColumns}
                onCellSelect={handleSelectCell}
                cellFormatting={cellFormatting}
                columnHeadersEditable={settings.columnHeadersEditable}
                editEmptyOnly={settings.editEmptyOnly}
                spreadsheetRows={spreadsheetRows}
                setSpreadsheetRows={setSpreadsheetRows}
                cellWidth={settings.cellWidth}
                setColumnHeaders={setColumnHeaders}
                columnHeaders={columnHeaders}
                isLoggedIn={isLoggedIn}
                allowLoggedInEdit={settings.allowLoggedInEdit}
            />
        </div>
    );
}
