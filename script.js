jQuery.get('list.csv', function(data) {
    //console.log(data);

    var rowData = data.split('\n');

    // <table > <tbody>
    var tbodyEl = document.getElementById('tblcsvdata').getElementsByTagName('tbody')[0];
    tbodyEl.innerHTML = "";

    // Loop on the row Array (change row=0 if you also want to read 1st row)
    for (var row = 1; row < rowData.length; row++) {

        // Insert a row at the end of table
        var newRow = tbodyEl.insertRow();

        // Split by comma (,) to get column Array
        rowColData = rowData[row].split(',');

        // Loop on the row column Array
        for (var col = 0; col < rowColData.length; col++) {

            // Insert a cell at the end of the row
            var newCell = newRow.insertCell();

            if(col == rowColData.length-1){
                console.log(rowColData[col]);
                newCell.innerHTML = '<a href="'+rowColData[col]+'" target="_blank">'+rowColData[col]+'</a>';
            } else {
                newCell.innerHTML = rowColData[col];
            }
        }
    }
});