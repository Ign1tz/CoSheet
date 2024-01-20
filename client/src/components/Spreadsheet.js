import React, {useState} from 'react';
import '../styles/Spreadsheet.css';

/**
 * class to display a spreadsheet
 */
export default function Spreadsheet({numberOfColumns, cellFormatting, onCellSelect, selectedCell, columnHeadersEditable, editEmptyOnly, setSpreadsheetRows, spreadsheetRows, cellWidth, setColumnHeaders, columnHeaders, isLoggedIn, allowLoggedInEdit }) {

    const handleCellContentChange = (rowIndex, colIndex, content) => {
        if (editEmptyOnly && spreadsheetRows[rowIndex][colIndex] !== '') {
            return;
        }
        const newRows = [...spreadsheetRows];
        newRows[rowIndex][colIndex] = content;
        setSpreadsheetRows(newRows);
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
                            <th key={colIndex} contentEditable={columnHeadersEditable} className="spreadsheetHeader"
                                onBlur={(e) => {
                                    const newHeaders = [...columnHeaders];
                                    newHeaders[colIndex] = e.target.innerText;
                                    setColumnHeaders(newHeaders);
                                }}>
                                {columnHeaders[colIndex]}
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
                                 const isCellEmpty = spreadsheetRows[rowIndex][colIndex] === '';
                                const canEdit = (!editEmptyOnly || isCellEmpty) && (!allowLoggedInEdit || isLoggedIn);
                                return (
                                    <td
                                        key={cellId}
                                        contentEditable={canEdit}
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