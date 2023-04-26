function checkPrompt() {
    //console.log($('#prompt_textarea').val());
    let promptContent = $('#prompt_textarea').val();
    if (promptContent == 'L'){
        window.location.href = "list.html";
    } else if (promptContent == 'G'){
        window.location.href = "web/index.html";
    } else {
        $('p.alert').css('display', 'block');
    }
}


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

            if(col == rowColData.length-1){
                var newCell = newRow.insertCell();
                newCell.innerHTML = '<a href="text_dumps/'+rowColData[col]+'" target="_blank"><svg id="Livello_1" data-name="Livello 1" xmlns="http://www.w3.org/2000/svg" width="23.97" height="31.99" viewBox="0 0 23.97 31.99"><defs><style>.cls-1 {fill: #fff;}.cls-1, .cls-2 {stroke: #1d1d1b;stroke-miterlimit: 10;stroke-width: 2px;}.cls-2 {fill: none;}</style></defs><polygon class="cls-1" points="13.72 30.99 1 30.99 1 1 22.97 1 22.97 20.65 13.72 30.99"/><polyline class="cls-2" points="13.72 30.99 13.72 20.65 22.97 20.65"/></svg></a>';
            } else {
                var newCell = newRow.insertCell();
                newCell.innerHTML = rowColData[col];
            }
        }
    }
});

//SORT TABLE
function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("tblcsvdata");
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc"; 
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < (rows.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /* Check if the two rows should switch place,
      based on the direction, asc or desc: */
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount ++; 
    } else {
      /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}



//IMAGE IN PREVIEW
$(document).ready(function(){
    let myImage = $('div.preview_image img')[0];
    $('#tblcsvdata > tbody > tr').mouseenter(function(){
        let myTitle = $(this).find('td')[0].textContent.replaceAll(' ','-').replaceAll('&','').replaceAll('é','e').replaceAll(':','').toLowerCase()+'.jpg';
        myImage.src = 'images/'+myTitle;
        $(myImage).removeClass('hidden');
    })
    $('#tblcsvdata').mouseleave(function(){
        $(myImage).addClass('hidden');
    })
    $('#tblcsvdata th').mouseenter(function(){
        $(myImage).addClass('hidden');
    })
});
