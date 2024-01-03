import React, { useState, useEffect } from 'react';
import '../Spreadsheet.css';

export default function Spreadsheet() {
    const [numberOfRows, setNumberOfRows] = useState(20);
    const [numberOfColumns, setNumberOfColumns] = useState(4);
    const [spreadsheetRows, setSpreadsheetRows] = useState([]);

     useEffect(() => {
        createSpreadsheet();
    }, [numberOfRows, numberOfColumns]);

    const createSpreadsheet = () => {
        const rows = [];
        for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
            const columns = [];
            for (let colIndex = 0; colIndex < numberOfColumns; colIndex++) {
                columns.push('');
            }
            rows.push(columns);
        }
        setSpreadsheetRows(rows);
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

    return (
        <div>
            <button className="createButton" onClick={createSpreadsheet}>
                Create Spreadsheet
            </button>
            <label htmlFor="numberOfRows">
                Rows:
                <input
                    type="number"
                    id="numberOfRows"
                    className="input"
                    value={numberOfRows}
                    onChange={(e) => setNumberOfRows(parseInt(e.target.value, 10))}
                />
            </label>
            <label htmlFor="numberOfColumns">
                Columns:
                <input
                    type="number"
                    id="numberOfColumns"
                    className="input"
                    value={numberOfColumns}
                    onChange={(e) => setNumberOfColumns(parseInt(e.target.value, 10))}
                />
            </label>
            <div className="spreadsheetContainer">
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            {[...Array(numberOfColumns)].map((_, colIndex) => (
                                <th key={colIndex} contentEditable className="header">{getColumnName(colIndex)}</th>

                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {spreadsheetRows.map((row, rowIndex) => (
                            <tr key={`row-${rowIndex}`}>
                                <th>{rowIndex + 1}</th>
                                {row.map((_, colIndex) => (
                                    <td
                                        key={`${rowIndex}-${colIndex}`}
                                        contentEditable
                                        className="cell"
                                    ></td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
