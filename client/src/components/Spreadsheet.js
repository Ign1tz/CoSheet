import React, { useState, useEffect } from 'react';
import '../styles/Spreadsheet.css';

export default function Spreadsheet({ numberOfRows, numberOfColumns, cellFormatting, onCellSelect, selectedCell, columnWidths, onColumnWidthChange}) {
    const [spreadsheetRows, setSpreadsheetRows] = useState([]);

    useEffect(() => {
        createSpreadsheet();
    }, [numberOfRows, numberOfColumns]);

    useEffect(() => {
        onColumnWidthChange(Array(numberOfColumns).fill(100)); // Reset widths to default
    }, [numberOfColumns, onColumnWidthChange]);

   const startResizing = (colIndex, event) => {
        event.preventDefault();
        const startX = event.clientX;
        const startWidth = columnWidths[colIndex];
        let newWidth = startWidth;

        const handleMouseMove = (moveEvent) => {
            const currentX = moveEvent.clientX;
            newWidth = Math.max(startWidth + (currentX - startX), 10); // Calculate new width but don't set state yet
        };

        const handleMouseUp = () => {
            const newColumnWidths = [...columnWidths];
            newColumnWidths[colIndex] = newWidth; // Update the state on mouse up
            onColumnWidthChange(newColumnWidths);

            // Cleanup: Remove event listeners
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
   };



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
                        {columnWidths.map((width, colIndex) => (
                            <th key={colIndex} className="header" style={{ width: `${width}px` }}>
                                {getColumnName(colIndex)}
                                <div
                                    className="resize-handle"
                                    onMouseDown={(e) => startResizing(colIndex, e)}
                                    style={{ userSelect: 'none' }} // Prevents the resize handle from being selected
                                ></div>
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
