import React, { useState } from 'react';
import '../styles/SpreadsheetSettings.css';

export default function SpreadsheetSettings({ onSettingsChange }) {
    const [showSettings, setShowSettings] = useState(false);
    const [title, setTitle] = useState('Default Title');
    const [editEmptyOnly, setEditEmptyOnly] = useState(false);
    const [numColumns, setNumColumns] = useState(4);
    const [numRows, setNumRows] = useState(20);
    const [columnHeaders, setColumnHeaders] = useState('Default Header');
    const [description, setDescription] = useState('This is a small description for the default spreadsheet.');
    const [allowLoggedInEdit, setAllowLoggedInEdit] = useState(false);
    const [cellWidth, setCellWidth] = useState(50);

    function validateTitle(title) {
        return typeof title === 'string' && title.trim() !== '';
    }

    function validateNumColumns(numColumns) {
        const number = parseInt(numColumns, 10);
        return !isNaN(number) && number > 1 && number <= 1000;
    }

    function validateNumRows(numRows) {
        const number = parseInt(numRows, 10);
        return !isNaN(number) && number > 1 && number <= 1000;
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

        onSettingsChange({
            title,
            editEmptyOnly,
            numColumns: parseInt(numColumns, 10),
            numRows: parseInt(numRows, 10),
            columnHeaders,
            description,
            allowLoggedInEdit,
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
                        <label>Cell Width <input type="range" min="1" max="100" value={cellWidth} onChange={(e) => setCellWidth(e.target.value)} /></label>
                        <div className="range-values">{cellWidth}</div>
                    </div>
                    <div className="setting-group">
                        <label>Only logged-in users can edit <input type="checkbox" checked={allowLoggedInEdit} onChange={(e) => setAllowLoggedInEdit(e.target.checked)} /></label>
                    </div>
                    <div className="setting-group">
                        <label>Only empty cells can be edited <input type="checkbox" checked={editEmptyOnly} onChange={(e) => setEditEmptyOnly(e.target.checked)} /></label>
                    </div>
                    <div className="apply-button">
                        <button onClick={applySettings}>Apply Changes</button>
                    </div>
                </div>
            )}
        </div>
    );
}
