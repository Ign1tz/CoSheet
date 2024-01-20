import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SpreadsheetSettings from "../components/SpreadsheetSettings";
import Spreadsheet from "../components/Spreadsheet";
import WidthBar  from "../components/widthBar";
import '../styles/SpreadsheetPage.css';

/**
 * The page where a spreadsheet and its settings get displayed
 */
export default function SpreadsheetPage() {

    let uuid = window.location.pathname.replace('/spreadsheet/', '');
    const navigate = useNavigate();

    // states to store all default settings
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
        columWidths: [40,250,250,250,250]
    });

    // get for each column header its own name
    const getColumnName = (columnNumber) => {
        let columnName = '';
        let base = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let num = columnNumber;

        // after the alphabet is ending a new letter gets added
        while (num >= 26) {
            columnName = base[num % 26] + columnName;
            num = Math.floor(num / 26) - 1;
        }
        return base[num] + columnName;
    };

    // state of headers and give them their name
    const [columnHeaders, setColumnHeaders] = useState(
        [...Array(settings.numColumns)].map((_, index) => getColumnName(index))
    );

    // to check if the spreadsheet already exists
    const [spreadsheetExists, setSpreadsheetExists] = useState(false);
    // for updating I need the old spreadsheet
    const [oldSpreadsheetData, setOldSpreadsheetData] = useState(null);
    // the cell the user selected
    const [selectedCell, setSelectedCell] = useState(null);
    // including bold, color of cell and font
    const [cellFormatting, setCellFormatting] = useState({});
    // each row has its own columns
    const [spreadsheetRows, setSpreadsheetRows] = useState([])
    // to check if a user is logged in
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    // TODO: isloggedin check

    // create a default spreadsheet just in the frontend
    const createSpreadsheet = () => {
        setSpreadsheetRows(() => {
            return Array.from({ length: settings.numRows }, () =>
                Array(settings.numColumns).fill('')
            );
        });
    };

    // if the settings apply button is clicked
    const handleSettingsChange = (newSettings) => {
        let newColumns = columnHeaders;
        let newRows = spreadsheetRows;
        let newNumberOfColumns = newColumns.length;
        let newNumberOfRows = newSettings.numRows;
        let newColumWidths = settings.columWidths
        // add columns
        console.log(newColumWidths)
        if (newSettings.numColumns > newNumberOfColumns) {
            for (let i = 0; i < (newSettings.numColumns - newNumberOfColumns); i++) {
                newColumns.push(getColumnName(newNumberOfColumns + i));
                for (let row of newRows) {
                    row.push('');
                }
                newColumWidths.push(250)
                if (newColumWidths.reduce((a,b) => a+b,0) >1750){
                    let index = newColumWidths.indexOf(Math.max(...newColumWidths))
                    newColumWidths[index] = newColumWidths[index] - (newColumWidths.reduce((a,b) => a+b,0) - 1750)
                }
            }
            setColumnHeaders(newColumns);

        // remove columns
        } else if (newSettings.numColumns < newNumberOfColumns) {
            for (let i = 0; i < (newNumberOfColumns - newSettings.numColumns); i++) {
                newColumns.pop();
                for (let row of newRows) {
                    row.pop();
                }
                newColumWidths.pop()
            }
        }

        // add rows
        if (newRows.length < newNumberOfRows) {
            const newRow = Array(newSettings.numColumns).fill('');
            for (let i = newRows.length; i < newNumberOfRows; i++) {
                newRows.push([...newRow]);
            }

        // remove rows
        } else if (newRows.length > newNumberOfRows) {
            newRows = newRows.slice(0, newNumberOfRows);
        }
        console.log(newColumWidths)
        newSettings.columWidths = newColumWidths
        setColumnHeaders(newColumns);
        setSpreadsheetRows(newRows)
        setSettings({...settings, ...newSettings});
    };

    // select cell with indexes of rows and columns
    const handleSelectCell = (rowIndex, colIndex) => {
        setSelectedCell({row: rowIndex, col: colIndex});
    };

    // call fetch when uuid is there
    useEffect(() => {
        if (uuid) {
            fetchSpreadsheetData(uuid);
        }
    }, [uuid]);

    // when creating a new spreadsheet we go to its new url
    const createNewSpreadsheet = async () => {
        try {
            const response = await fetch(`http://localhost:5000/createnewspreadsheet`);
            if (response.ok) {
                const data = await response.json();
                createSpreadsheet();

                const urlParts = data.link.split('/');
                const realUuid = urlParts[urlParts.length - 1];
                navigate(`/spreadsheet/${realUuid}`); // go to url


                await sendDataToBackend();
            } else {
                console.error("Failed to create a new spreadsheet.");
            }
        } catch (error) {
            console.error('Error creating a new spreadsheet:', error);
        }
    };

    // get a spreadsheet by its uuid
    const fetchSpreadsheetData = async (uuid) => {
        try {
            let response = await fetch(`http://localhost:5000/getspreadsheet/${uuid}`);
            if (response.ok) {
                const data = await response.json();
                setOldSpreadsheetData(data);    // needed for the update method
                updateSpreadsheetData(data);
                setSpreadsheetExists(true); // needed for the update method
            } else {
                console.error("Spreadsheet not found.");
                setSpreadsheetExists(false);
            }
        } catch (error) {
            console.error('Error fetching spreadsheet data:', error);
        }
    };

    // use data from request to fill the spreadsheet
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

            // add formatting to each cell
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

    // collect everything including settings and spreadsheet data
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

    // collected data gets sent to backend
    const sendDataToBackend = async () => {
        const newData = prepareDataForBackend();
        let requestBody;
        // decide endpoint depending on existence
        const endpoint = spreadsheetExists ? 'updatespreadsheet' : 'postspreadsheet';

        if (spreadsheetExists) { // send old and new
            const oldData = oldSpreadsheetData;
            requestBody = JSON.stringify({old: oldData, new: newData});
        } else {    // only new
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

    // apply formatting
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

    // share menu currently just as placeholder
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
                <div>
                    <button onClick={createNewSpreadsheet}>New</button>
                </div>
            </div>
            <WidthBar onSettingsChange={handleSettingsChange} settings = {settings} setSettings={setSettings}></WidthBar>
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
                columWidths={settings.columWidths}
            />
        </div>
    );
}
