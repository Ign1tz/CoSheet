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
        let newColumns = columnHeaders;
        let newRows = spreadsheetRows;
        let newNumberOfColumns = newColumns.length;
        let newNumberOfRows = newSettings.numRows;

        if (newSettings.numColumns > newNumberOfColumns) {
            for (let i = 0; i < (newSettings.numColumns - newNumberOfColumns); i++) {
                newColumns.push(getColumnName(newNumberOfColumns + i));
                for (let row of newRows) {
                    row.push('');
                }
            }
            setColumnHeaders(newColumns);
        } else if (newSettings.numColumns < newNumberOfColumns) {
            for (let i = 0; i < (newNumberOfColumns - newSettings.numColumns); i++) {
                newColumns.pop();
                for (let row of newRows) {
                    row.pop();
                }
            }
        }

        if (newRows.length < newNumberOfRows) {
            const newRow = Array(newSettings.numColumns).fill('');
            for (let i = newRows.length; i < newNumberOfRows; i++) {
                newRows.push([...newRow]);
            }
        } else if (newRows.length > newNumberOfRows) {
            newRows = newRows.slice(0, newNumberOfRows);
        }

        setColumnHeaders(newColumns);
        setSpreadsheetRows(newRows)
        setSettings({...settings, ...newSettings});
    };

    useEffect(() => {
        fetchSpreadsheetData(uuid);
    }, []);

    const handleSelectCell = (rowIndex, colIndex) => {
        setSelectedCell({row: rowIndex, col: colIndex});
    };

    const fetchSpreadsheetData = async (uuid) => {
        try {
            let response = await fetch(`http://localhost:5000/getspreadsheet/` + uuid);
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
                setOldSpreadsheetData(data);
                updateSpreadsheetData(data);
                console.log("data:", data)
            }
        } catch (error) {
            console.error('Error fetching spreadsheet data:', error);
        }
    };

    const updateSpreadsheetData = (data) => {
        if (data) {
            const spreadsheetInfo = data[0];
            setSettings(spreadsheetInfo.settings || {});
            setColumnHeaders(spreadsheetInfo.spreadsheet.headers)
            const normalizeSpreadsheet = spreadsheetInfo.spreadsheet.rows.map(row =>
                row.map(cell => cell.content)
            )
            setSpreadsheetRows(normalizeSpreadsheet)

            const newCellFormatting = {};
            spreadsheetInfo.spreadsheet.rows.forEach((row, rowIndex) => {
                row.forEach((cell, colIndex) => {
                    const cellId = `${rowIndex}-${colIndex}`;
                    newCellFormatting[cellId] = cell.formatting || {};
                });
            });
            setCellFormatting(newCellFormatting);
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
        let requestBody;
        const endpoint = spreadsheetExists ? 'updatespreadsheet' : 'postspreadsheet';

        if (spreadsheetExists) {
            const oldData = oldSpreadsheetData;
            requestBody = JSON.stringify({old: oldData, new: newData});
        } else {
            requestBody = JSON.stringify(newData);
        }

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

    const [showShareMenu, setShowShareMenu] = useState(false);
    const toggleShareMenu = () => setShowShareMenu(!showShareMenu);
    const handleShareLink = () => {
        const currentUrl = window.location.href;
        navigator.clipboard.writeText(currentUrl);
    };
    const handleShareQRCode = () => {
        console.log("Share via QR Code");
    };
    const handleShareEmail = () => {
        console.log("Share via Email");
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
                <div className="share-options">
                    <button onClick={toggleShareMenu}>Share</button>
                    {showShareMenu && (
                        <div className="share-menu">
                            <ul>
                                <li onClick={handleShareLink}>Copy Link</li>
                                <li onClick={handleShareQRCode}>QR Code</li>
                                <li onClick={handleShareEmail}>Email</li>
                            </ul>
                        </div>
                    )}
                </div>
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
