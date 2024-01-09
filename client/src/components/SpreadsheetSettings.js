import React, { useState } from 'react';
import '../styles/SpreadsheetSettings.css';

export default function SpreadsheetSettings({ onSettingsChange, onApplyFormatting, selectedCell, columnWidths, onColumnWidthChange }) {
    const [showSettings, setShowSettings] = useState(false);
    const [title, setTitle] = useState('Default Title');
    const [editEmptyOnly, setEditEmptyOnly] = useState(false);
    const [numColumns, setNumColumns] = useState(4);
    const [numRows, setNumRows] = useState(20);
    const [columnHeaders, setColumnHeaders] = useState('Default Header');
    const [description, setDescription] = useState('This is a small description for the default spreadsheet.');
    const [allowLoggedInEdit, setAllowLoggedInEdit] = useState(false);
    const [cellWidthCheck, setCellWidthCheck] = useState(false)
    const [isTextBold, setIsTextBold] = useState(false);
    const [cellBackgroundColor, setCellBackgroundColor] = useState('#FFFFFF');

    const handleColumnWidthChange = (index, newWidth) => {
        const newWidths = [...columnWidths];
        newWidths[index] = newWidth;
        onColumnWidthChange(newWidths);
    };

    function validateTitle(title) {
        return typeof title === 'string' && title.trim() !== '';
    }

    function validateNumColumns(numColumns) {
        const number = parseInt(numColumns, 10);
        return !isNaN(number) && number >= 1 && number <= 1000;
    }

    function validateNumRows(numRows) {
        const number = parseInt(numRows, 10);
        return !isNaN(number) && number >= 1 && number <= 1000;
    }

    function validateColumnHeaders(columnHeaders) {
        return typeof columnHeaders === 'string'; // Add more conditions if needed
    }

    function validateDescription(description) {
        return typeof description === 'string'; // Add more conditions if needed
    }

    function validateEditEmptyOnly(editEmptyOnly) {
        return typeof editEmptyOnly === 'boolean';
    }

    function validateAllowLoggedInEdit(allowLoggedInEdit) {
        return typeof allowLoggedInEdit === 'boolean';
    }

    function validateCellWidthCheck(cellWidthCheck) {
        return typeof cellWidthCheck === 'boolean';
    }

    const applyFormatting = () => {
        if (selectedCell) {
            onApplyFormatting({
                bold: isTextBold,
                backgroundColor: cellBackgroundColor,
            });
        }
    };

    function applySettings(e) {
        e.preventDefault();

        if (!validateTitle(title)) {
            alert('Invalid title.');
            return;
        }
        if (!validateNumColumns(numColumns)) {
            alert('Invalid number of columns.');
            return;
        }
        if (!validateNumRows(numRows)) {
            alert('Invalid number of rows.');
            return;
        }
        if (!validateColumnHeaders(columnHeaders)) {
            alert('Invalid column headers.');
            return;
        }
        if (!validateDescription(description)) {
            alert('Invalid description.');
            return;
        }
        if (!validateEditEmptyOnly(editEmptyOnly)) {
            alert('Invalid edit empty only setting.');
            return;
        }
        if (!validateAllowLoggedInEdit(allowLoggedInEdit)) {
            alert('Invalid allow logged in edit setting.');
            return;
        }
        if (!validateCellWidthCheck(cellWidthCheck)) {
            alert('Invalid cell width check setting.');
            return;
        }

        applyFormatting()

        onSettingsChange({
            title,
            editEmptyOnly,
            numColumns: parseInt(numColumns, 10),
            numRows: parseInt(numRows, 10),
            columnHeaders,
            description,
            allowLoggedInEdit,
            isTextBold,
            cellBackgroundColor,
            cellWidthCheck,
        });
    }

    return (
        <div className="ribbon-container">
            <div className="ribbon-header">
                <button onClick={() => setShowSettings(!showSettings)}>
                    {showSettings ? 'Hide Settings' : 'Show Settings'}
                </button>
            </div>
            {showSettings && (
                <div className="ribbon-settings">
                    <div className="setting-group">
                        <label>Title <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" /></label>
                    </div>
                    <div className="setting-group">
                        <label>Description <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" /></label>
                    </div>
                    <div className="setting-group">
                        <label>Column Headers <input type="text" value={columnHeaders} onChange={(e) => setColumnHeaders(e.target.value)} placeholder="Column Headers" /></label>
                    </div>
                    <div className="setting-group">
                        <label>Number of Columns <input type="number" min="1" max="1000" value={numColumns} onChange={(e) => setNumColumns(e.target.value)} /></label>
                    </div>
                    <div className="setting-group">
                        <label>Number of Rows <input type="number" min="1" max="1000" value={numRows} onChange={(e) => setNumRows(e.target.value)} /></label>
                    </div>
                    <div className="setting-group">
                        <label>Cell width <input type="checkbox" checked={cellWidthCheck} onChange={(e) => setCellWidthCheck(e.target.checked)}/></label>
                    </div>
                    <div className="setting-group">
                        <label>Only logged-in <input type="checkbox" checked={allowLoggedInEdit} onChange={(e) => setAllowLoggedInEdit(e.target.checked)} /></label>
                    </div>
                    <div className="setting-group">
                        <label>Only empty cells <input type="checkbox" checked={editEmptyOnly} onChange={(e) => setEditEmptyOnly(e.target.checked)} /></label>
                    </div>
                    <div className="setting-group">
                        <button
                            onClick={() => setIsTextBold(!isTextBold)}
                            className={isTextBold ? 'button-active' : ''}
                        >
                            Bold
                        </button>
                        <input
                            type="color"
                            value={cellBackgroundColor}
                            onChange={(e) => setCellBackgroundColor(e.target.value)}
                            title="Change cell background color"
                        />
                    </div>
                    <div className="apply-button">
                        <button onClick={applySettings}>Apply Changes</button>
                    </div>
                </div>
            )}
        </div>
    );
}
