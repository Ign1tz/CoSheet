import React, { useState, useEffect } from 'react';
import '../SpreadsheetSettings.css';


export default function SpreadsheetSettings() {


    const [showSettings, setShowSettings] = useState(false);

    // State for each setting
    const [title, setTitle] = useState('Default Title');
    const [cellWidth, setCellWidth] = useState(50);
    const [editEmptyOnly, setEditEmptyOnly] = useState(false);
    const [numColumns, setNumColumns] = useState(20);
    const [numRows, setNumRows] = useState(4);
    const [columnHeaders, setColumnHeaders] = useState('Default Header');
    const [description, setDescription] = useState('Default Description');
    const [allowLoggedInEdit, setAllowLoggedInEdit] = useState(false);


    function applySettings(e) {
        e.preventDefault()

        if (!validateTitle()) {
            return;
        }
        if (!validateNumColumns()) {
            return;
        }
        if (!validateNumRows()) {
            return;
        }
        if (!validateCellWidth()) {
            return;
        }
        if (!validateColumnHeaders()) {
            return;
        }
        if (!validateDescription()) {
            return;
        }
        if (!validateEditEmptyOnly()) {
            return;
        }
        if (!validateAllowLoggedInEdit()) {
            return;
        }

       function validateTitle(title) {
            return typeof title === 'string';
       }

        function validateNumColumns(numColumns) {
            return typeof numColumns === 'number' && numColumns > 1 && numColumns <= 1000;
        }

        function validateNumRows(numRows) {
            return typeof numRows === 'number' && numRows > 1 && numRows <= 1000;
        }

        function validateCellWidth(cellWidth) {
            return typeof cellWidth === 'number' && cellWidth >= 1 && cellWidth <= 100;
        }

        function validateColumnHeaders(columnHeaders) {
            return typeof columnHeaders === 'string';
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


        //TODO: logic to send values to backend

    }
    return (
        <div className="ribbon-container">
            <div className="ribbon-header">
                <button onClick={() => setShowSettings(!showSettings)}>Spreadsheet Settings</button>
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
                        <div className="range-values">1 - 100</div>
                    </div>
                    <div className="setting-group">
                        <label>Only logged-in users can edit<input type="checkbox" checked={allowLoggedInEdit} onChange={(e) => setAllowLoggedInEdit(e.target.checked)} /></label>
                    </div>
                    <div className="setting-group">
                        <label>Only empty cells can be edited<input type="checkbox" checked={editEmptyOnly} onChange={(e) => setEditEmptyOnly(e.target.checked)} /></label>
                    </div>
                    <div className="apply-button">
                        <button onClick={applySettings}>Apply Changes</button>
                    </div>
                </div>
            )}
        </div>
    );
}