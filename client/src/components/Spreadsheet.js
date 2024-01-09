import React, {useEffect, useState} from 'react';
import '../styles/Spreadsheet.css';

export default function Spreadsheet({ numberOfRows, numberOfColumns, cellFormatting, onCellSelect, selectedCell, columnHeadersEditable}) {
    const [spreadsheetRows, setSpreadsheetRows] = useState([]);

     useEffect(() => {
            fetchData();
     }, [numberOfRows, numberOfColumns]);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:5000/getspreadsheet');

            const data = await response.json();
            if (data && data.length > 0) {
                setSpreadsheetRows(data);
            } else {
                createSpreadsheet();
            }
        } catch (error) {
            console.error('Failed to fetch data:', error);
            createSpreadsheet();
        }
    };

    const createSpreadsheet = () => {
        const rows = Array.from({ length: numberOfRows }, () =>
            Array.from({ length: numberOfColumns }, () => '')
        );
        setSpreadsheetRows(rows);
    };

    const handleCellContentChange = (rowIndex, colIndex, content) => {
        const newRows = [...spreadsheetRows];
        newRows[rowIndex][colIndex] = content;
        setSpreadsheetRows(newRows);
    };

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

    const prepareDataForBackend = () => {
        return spreadsheetRows.map((row, rowIndex) =>
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
        );
    };

    const sendDataToBackend = async () => {
        const data = prepareDataForBackend();

        try {
            const response = await fetch('http://localhost:5000/postspreadsheet', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify(data)
            });

           const result = await response.json();
        } catch (error) {
            console.error('Failed to send data to the backend:', error);
        }
    };

    return (
        <div className="spreadsheetContainer">
            <table className="table">
                <thead>
                    <tr>
                        <th></th>
                        {[...Array(numberOfColumns)].map((_, colIndex) => (
                            <th key={colIndex} contentEditable={columnHeadersEditable} className="spreadsheetHeader">
                                {getColumnName(colIndex)}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {spreadsheetRows.map((row, rowIndex) => (
                        <tr key={`row-${rowIndex}`}>
                            <th>{rowIndex + 1}</th>
                            {row.map((cellContent, colIndex) => {
                                const cellId = `${rowIndex}-${colIndex}`;
                                const formatting = cellFormatting[cellId] || {};
                                return (
                                    <td
                                        key={cellId}
                                        contentEditable
                                        onClick={() => onCellSelect(rowIndex, colIndex)}
                                        onBlur={(e) => handleCellContentChange(rowIndex, colIndex, e.target.innerText)}
                                        className={`cell ${selectedCell && selectedCell.row === rowIndex && selectedCell.col === colIndex ? 'selected' : ''}`}
                                        style={{
                                            fontWeight: formatting.bold ? 'bold' : 'normal',
                                            backgroundColor: formatting.backgroundColor || 'transparent',
                                        }}
                                    >
                                        {cellContent}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
