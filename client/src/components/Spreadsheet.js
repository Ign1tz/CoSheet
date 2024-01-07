import React, { useState, useEffect } from 'react';
import '../styles/Spreadsheet.css';

export default function Spreadsheet({ numberOfRows, numberOfColumns, cellFormatting, onCellSelect, selectedCell}) {
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

    const handleCellClick = (rowIndex, colIndex) => {
        onCellSelect(rowIndex, colIndex);
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
        <div className="spreadsheetContainer">
            <table className="table">
                <thead>
                    <tr>
                        <th></th>
                        {[...Array(numberOfColumns)].map((_, colIndex) => (
                            <th key={colIndex} contentEditable className="header">
                                {getColumnName(colIndex)}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {spreadsheetRows.map((row, rowIndex) => (
                        <tr key={`row-${rowIndex}`}>
                            <th>{rowIndex + 1}</th>
                            {row.map((_, colIndex) => {
                                const cellId = `${rowIndex}-${colIndex}`;
                                const formatting = cellFormatting[cellId] || {};
                                return (
                                    <td
                                        key={cellId}
                                        onClick={() => handleCellClick(rowIndex, colIndex)}
                                        contentEditable
                                        className={`cell ${selectedCell && selectedCell.row === rowIndex && selectedCell.col === colIndex ? 'selected' : ''}`}
                                        style={{
                                            fontWeight: formatting.bold ? 'bold' : 'normal',
                                            backgroundColor: formatting.backgroundColor || 'transparent',
                                        }}
                                    >
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
