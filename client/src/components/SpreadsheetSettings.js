import React, { useEffect, useState } from 'react';
import '../styles/SpreadsheetSettings.css';

export default function SpreadsheetSettings({ onSettingsChange, onApplyFormatting, selectedCell, settingsProps }) {
    const [showSettings, setShowSettings] = useState(false);

    const [title, setTitle] = useState(settingsProps.title);
    const [editEmptyOnly, setEditEmptyOnly] = useState(settingsProps.editEmptyOnly);
    const [numColumns, setNumColumns] = useState(settingsProps.numColumns);
    const [numRows, setNumRows] = useState(settingsProps.numRows);
    const [columnHeadersEditable, setColumnHeadersEditable] = useState(settingsProps.columnHeadersEditable);
    const [description, setDescription] = useState(settingsProps.description);
    const [allowLoggedInEdit, setAllowLoggedInEdit] = useState(settingsProps.allowLoggedInEdit);
    const [cellWidth, setCellWidth] = useState(settingsProps.cellWidth);
    const [isTextBold, setIsTextBold] = useState(settingsProps.isTextBold);
    const [cellBackgroundColor, setCellBackgroundColor] = useState(settingsProps.cellBackgroundColor);

    useEffect(() => {
        setTitle(settingsProps.title);
        setEditEmptyOnly(settingsProps.editEmptyOnly);
        setNumColumns(settingsProps.numColumns);
        setNumRows(settingsProps.numRows);
        setColumnHeadersEditable(settingsProps.columnHeadersEditable);
        setDescription(settingsProps.description);
        setAllowLoggedInEdit(settingsProps.allowLoggedInEdit);
        setCellWidth(settingsProps.cellWidth);
        setIsTextBold(settingsProps.isTextBold);
        setCellBackgroundColor(settingsProps.cellBackgroundColor);
    }, [settingsProps]);

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

    function validateColumnHeadersEditable(columnHeadersEditable) {
        return typeof columnHeadersEditable === 'boolean';
    }

    function validateDescription(description) {
        return typeof description === 'string';
    }

    function validateEditEmptyOnly(editEmptyOnly) {
        return typeof editEmptyOnly === 'boolean';
    }

    function validateAllowLoggedInEdit(allowLoggedInEdit) {
        return typeof allowLoggedInEdit === 'boolean';
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
        if (!validateColumnHeadersEditable(columnHeadersEditable)) {
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

        applyFormatting()

        onSettingsChange({
            title,
            editEmptyOnly,
            numColumns: parseInt(numColumns, 10),
            numRows: parseInt(numRows, 10),
            columnHeadersEditable,
            description,
            allowLoggedInEdit,
            isTextBold,
            cellBackgroundColor,
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
                        <label>Number of Columns <input type="number" min="1" max="1000" value={numColumns} onChange={(e) => setNumColumns(e.target.value)} /></label>
                    </div>
                    <div className="setting-group">
                        <label>Number of Rows <input type="number" min="1" max="1000" value={numRows} onChange={(e) => setNumRows(e.target.value)} /></label>
                    </div>
                    <div className="setting-group">
                        <label>Cell Width <input type="range" min="1" max="100" value={cellWidth} onChange={(e) => setCellWidth(e.target.value)} /></label>
                        <div className="range-values">{cellWidth}</div>
                    </div>
                    <div className="setting-group">
                        <label>Headers editable<input type="checkbox" checked={columnHeadersEditable} onChange={(e) => setColumnHeadersEditable(e.target.checked)} /></label>
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
