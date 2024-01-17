import React, { useEffect, useState } from 'react';
import { useParams} from "react-router-dom";
import SpreadsheetSettings from "../components/SpreadsheetSettings";
import Spreadsheet from "../components/Spreadsheet";
import '../styles/SpreadsheetPage.css';


export default function SpreadsheetPage() {

    const uuid = "test";
    //const uuid = useParams();

    useEffect(() => {
        fetchSpreadsheetData(uuid);
    }, []);


    const createSpreadsheet = () => {
        setSpreadsheetRows(() => {
            return Array.from({ length: settings.numRows }, () =>
                Array(settings.numColumns).fill('')
            );
        });
    };


    const [settings, setSettings] = useState({
        title: 'Default Title',
        editEmptyOnly: false,
        numColumns: 4,
        numRows: 20,
        columnHeadersEditable: false,
        description: 'This is a small description for the default spreadsheet.',
        allowLoggedInEdit: false,
        cellWidth: 50,
        isTextBold: false,
        cellBackgroundColor: '#FFFFFF'
    });

    const [selectedCell, setSelectedCell] = useState(null);
    const [cellFormatting, setCellFormatting] = useState({});
    const [spreadsheetRows, setSpreadsheetRows] = useState([])

    const handleSelectCell = (rowIndex, colIndex) => {
        setSelectedCell({ row: rowIndex, col: colIndex });
    };

    const fetchSpreadsheetData = async (uuid) => {
        try {
            let response = await fetch(`http://localhost:5000/getspreadsheet/${uuid}`);
            if (!response.ok) {
                response = await fetch(`http://localhost:5000/createnewspreadsheet`);
                if (!response.ok) {
                    console.error("Failed to create a new spreadsheet.");
                }
                createSpreadsheet()     // should not be needed
            }
            const data = await response.json();
            console.log("data:", data)
            updateSpreadsheetData(data);
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

    const handleSettingsChange = (newSettings) => {
        setSettings({ ...settings, ...newSettings });
    };

    const prepareDataForBackend = () => {

        const spreadsheetData = spreadsheetRows.map((row, rowIndex) =>
            row.map((cellContent, colIndex) => {
                const cellId = `${rowIndex}-${colIndex}`;
                const formatting = cellFormatting[cellId] || {};
                return {
                    content: cellContent,
                    formatting: formatting,
                    row: rowIndex,
                    column: colIndex
                };
            }))
        return ({
            settings,
            spreadsheet: spreadsheetData,
        });
    };


    const sendDataToBackend = async () => {
        const data = prepareDataForBackend();
        console.log(data)
        try {
            const response = await fetch('http://localhost:5000/postspreadsheet', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify(data)
            });

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
            <h2 className="spreadsheet-title">{settings.title}</h2>
            <p className="spreadsheet-description">{settings.description}</p>
            <button className="save-button" onClick={sendDataToBackend}>Save Spreadsheet</button>
            <Spreadsheet
                numberOfRows={settings.numRows}
                numberOfColumns={settings.numColumns}
                onCellSelect={handleSelectCell}
                cellFormatting={cellFormatting}
                columnHeadersEditable={settings.columnHeadersEditable}
                editEmptyOnly={settings.editEmptyOnly}
                spreadsheetRows={spreadsheetRows}
                setSpreadsheetRows={setSpreadsheetRows}
            />
        </div>
    );
}
