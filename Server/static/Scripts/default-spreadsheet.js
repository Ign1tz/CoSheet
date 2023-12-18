/*
let numberOfRows = 20;
let numberOfColumns = 4;
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('createButton').addEventListener('click', function() {
        createSpreadsheet(numberOfColumns, numberOfRows);
    });
});
 */

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('createButton').addEventListener('click', function() {
        let numberOfRows = document.getElementById('numberOfRows').value;
        let numberOfColumns = document.getElementById('numberOfColumns').value;
        createSpreadsheet(parseInt(numberOfRows, 10), parseInt(numberOfColumns, 10));
    });
});


function createSpreadsheet(rows, columns) {

    let container = document.getElementById('spreadsheetContainer');
    container.innerHTML = ''; //delete existing table

     let table = document.createElement('table');

    // create header row with letters
    let headerRow = document.createElement('tr');
    let cornerCell = document.createElement('th'); // corner cell
    headerRow.appendChild(cornerCell);
    for (let col = 0; col < columns; col++) {
        let th = document.createElement('th');
        th.textContent = getColumnName(col); // column number to letter
        headerRow.appendChild(th);
    }
    table.appendChild(headerRow);

    // create table rows with row numbers
    for (let row = 0; row < rows; row++) {
        let tr = document.createElement('tr');
        let rowHeader = document.createElement('th');
        rowHeader.textContent = row + 1;
        tr.appendChild(rowHeader);
        for (let col = 0; col < columns; col++) {
            let td = document.createElement('td');
            td.classList.add('editable');
            td.contentEditable = "true";
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    container.appendChild(table);
}

// convert column number to letter
function getColumnName(columnNumber) {
    let columnName = '';
    let base = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let num = columnNumber;

    while (num >= 26) {
        columnName = base[num % 26] + columnName;
        num = Math.floor(num / 26) - 1;
    }
    return base[num] + columnName;
}