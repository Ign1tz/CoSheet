import React from 'react';
import '../styles/Spreadsheet.css';

export default function Spreadsheet({numberOfColumns, cellFormatting, onCellSelect, selectedCell, columnHeadersEditable, editEmptyOnly, setSpreadsheetRows, spreadsheetRows, cellWidth }) {

    const handleCellContentChange = (rowIndex, colIndex, content) => {
        if (editEmptyOnly && spreadsheetRows[rowIndex][colIndex] !== '') {
            return;
        }
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

    const tableStyle = {
        tableLayout: cellWidth ? 'fixed' : 'auto'
    };

    return (
        <div className="spreadsheetContainer">
            <table className="table" style={tableStyle}>
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
                                        contentEditable={!editEmptyOnly || spreadsheetRows[rowIndex][colIndex] === ''}
                                        onClick={() => onCellSelect(rowIndex, colIndex)}
                                        onBlur={(e) => handleCellContentChange(rowIndex, colIndex, e.target.innerText)}
                                        className={`cell ${selectedCell && selectedCell.row === rowIndex && selectedCell.col === colIndex ? 'selected' : ''}`}
                                        style={{
                                            fontWeight: formatting.bold ? 'bold' : 'normal',
                                            backgroundColor: formatting.backgroundColor || 'transparent',
                                            fontFamily: formatting.fontFamily || 'inherit',
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