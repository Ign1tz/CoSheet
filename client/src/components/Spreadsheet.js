import React, {useState} from 'react';
import '../styles/Spreadsheet.css';

/**
 * class to display a spreadsheet
 */
export default function Spreadsheet({
                                        numberOfColumns,
                                        cellFormatting,
                                        onCellSelect,
                                        selectedCell,
                                        columnHeadersEditable,
                                        editEmptyOnly,
                                        setSpreadsheetRows,
                                        spreadsheetRows,
                                        cellWidth,
                                        setColumnHeaders,
                                        columnHeaders,
                                        isLoggedIn,
                                        allowLoggedInEdit,
                                        columWidths
                                    }) {

    const handleCellContentChange = (rowIndex, colIndex, content) => {
        if (editEmptyOnly && spreadsheetRows[rowIndex][colIndex] !== '') {
            return;
        }
        const newRows = [...spreadsheetRows];
        newRows[rowIndex][colIndex] = content;
        setSpreadsheetRows(newRows);
    };

    const tableStyle = {
        tableLayout: "fixed",
        width: columWidths.reduce((a, b) => a + b, 0) + "px"
    };
    let columns = [<tr style={{width: columWidths[0]}}></tr>]
    //console.log(columWidths)
    for (let i = 0; i < numberOfColumns; i++) {
        columns.push(<th key={i} contentEditable={columnHeadersEditable} style={{width: columWidths[i+1]-3}}
                                    suppressContentEditableWarning={true} className="spreadsheetHeader"
                         onBlur={(e) => {
                             const newHeaders = [...columnHeaders];
                             newHeaders[i] = e.target.innerText;
                             setColumnHeaders(newHeaders);
                         }}>
            {columnHeaders[i]}
        </th>)
    }


    return (
        <div className="spreadsheetContainer">
            <table className="table" style={tableStyle} >
                <thead >
                <tr style={{width: 1040}}>
                    {columns}
                </tr>
                </thead>
                <tbody>
                {spreadsheetRows.map((row, rowIndex) => (
                    <tr key={`row-${rowIndex}`}>
                        <th key={"row"+ (rowIndex + 1)}>{rowIndex + 1}</th>
                        {row.map((cellContent, colIndex) => {
                            const cellId = `${rowIndex}-${colIndex}`;
                            const formatting = cellFormatting[cellId] || {};
                            const isCellEmpty = spreadsheetRows[rowIndex][colIndex] === '';
                            const canEdit = (!editEmptyOnly || isCellEmpty) && (!allowLoggedInEdit || isLoggedIn);
                            return (
                                <td
                                    suppressContentEditableWarning={true}
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