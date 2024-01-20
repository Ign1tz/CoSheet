import React, { useEffect, useState } from 'react';
import '../styles/SpreadsheetSettings.css';

/**
 * class with all settings for spreadsheets
 */
export default function SpreadsheetSettings({ onSettingsChange, onApplyFormatting, selectedCell, settingsProps, saveSpreadsheet }) {

    // get most things from spreadsheet page with settingsProps.
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
    const [selectedFont, setSelectedFont] = useState(settingsProps.selectedFont);

    // set all settings
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
        setSelectedFont(settingsProps.selectedFont)
    }, [settingsProps]);

    // frontend validation for some settings
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
                fontFamily: selectedFont,
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
            cellWidth,
            isTextBold,
            cellBackgroundColor,
            selectedFont,
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
                        <label>Columns <input type="number" min="1" max="1000" value={numColumns} onChange={(e) => setNumColumns(e.target.value)} /></label>
                    </div>
                    <div className="setting-group">
                        <label>Rows <input type="number" min="1" max="1000" value={numRows} onChange={(e) => setNumRows(e.target.value)} /></label>
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
                        <label>Font
                            <select value={selectedFont} onChange={(e) => setSelectedFont(e.target.value)}>
                                <option value="Arial">Arial</option>
                                <option value="Courier New">Courier New</option>
                                <option value="Verdana">Verdana</option>
                                <option value="Georgia">Georgia</option>
                                <option value="Tahoma">Tahoma</option>
                                <option value="Comic Sans MS">Comic Sans MS</option>
                                <option value="Impact">Impact</option>
                                <option value="Brush Script MT">Brush Script MT</option>
                            </select>
                        </label>
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
