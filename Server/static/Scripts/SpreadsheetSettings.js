document.getElementById('apply-settings').addEventListener('click', function() {
    const title = document.getElementById('spreadsheet-title').value;
    const cellWidth = document.getElementById('cell-width').value;
    const editEmptyCells = document.getElementById('edit-empty-cells').checked;
    const numColumns = document.getElementById('num-columns').value;
    const numRows = document.getElementById('num-rows').value;
    const allowEdit = document.getElementById('allow-edit').checked;
});
