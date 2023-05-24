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
        $(newRow).addClass('gameId-'+row);

        // Split by comma (,) to get column Array
        rowColData = rowData[row].split(',');

        // Loop on the row column Array
        for (var col = 0; col < rowColData.length+1; col++) { //+1 for the last row "add"

            if(col == rowColData.length-1){
                var newCell = newRow.insertCell();
                newCell.innerHTML = '<a class="gameUrl" href="text_dumps/'+rowColData[col]+'" target="_blank"><svg id="Livello_1" data-name="Livello 1" xmlns="http://www.w3.org/2000/svg" width="23.97" height="31.99" viewBox="0 0 23.97 31.99"><defs><style>.cls-1 {fill: #fff;}.cls-1, .cls-2 {stroke: #1d1d1b;stroke-miterlimit: 10;stroke-width: 2px;}.cls-2 {fill: none;}</style></defs><polygon class="cls-1" points="13.72 30.99 1 30.99 1 1 22.97 1 22.97 20.65 13.72 30.99"/><polyline class="cls-2" points="13.72 30.99 13.72 20.65 22.97 20.65"/></svg></a>';
            } else if(col == rowColData.length){
                var newCell = newRow.insertCell();
                newCell.innerHTML = '<div onclick="addToCollect(this)"><svg id="Livello_1" data-name="Livello 1" xmlns="http://www.w3.org/2000/svg" width="23.97" height="23.97" viewBox="0 0 23.97 23.97"><defs><style>.cls-1 {fill: #fff;}.cls-1,.cls-2{stroke: #1d1d1b;stroke-miterlimit: 10;stroke-width: 2px;}.cls-2 {fill: none;}</style></defs><circle class="cls-1" cx="11.99" cy="11.99" r="10.99"/><polyline class="cls-2" points="12 18.25 12 11.99 18.24 11.99"/><polyline class="cls-2" points="12 5.73 12 11.99 5.76 11.99"/></svg></div>';
            } else {
                var newCell = newRow.insertCell();
                newCell.innerHTML = rowColData[col];
                $(newCell).on('click', function(){openMoreOnThis(this)});
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
    $('#tblcsvdata').mouseleave(function(e){
        if(( $(e.toElement).is("#myCollection"))||( $(e.toElement).is("#myCollection *"))) {
            return
        } else {
            $(myImage).addClass('hidden');
        }
    })
    $('#tblcsvdata th').mouseenter(function(){
        $(myImage).addClass('hidden');
    })

    //FILTER BUTTONS
    filterButtons();
});



//TOGGLE ABOUT
function toggleAbout() {
    closeMoreOnThis();
    $('#about').toggleClass('hidden');
}


//ADD AND REMOVE TO COLLECTION
function addToCollect(e) {
    closeMoreOnThis();
    if (!$('#about').hasClass('hidden')){
        $('#about').addClass('hidden');
    }

    let gameName = $(e).closest('tr').find('td')[0].innerText;
    let gameConsole = $(e).closest('tr').find('td')[1].innerText;
    let gameYear = $(e).closest('tr').find('td')[2].innerText;
    let gameGenre = $(e).closest('tr').find('td')[3].innerText;
    let gameLang = $(e).closest('tr').find('td')[4].innerText;
    let gameUrl = $($(e).closest('tr').find('td')[5]).find('a').attr('href');
    let gameId = $(e).closest('tr').attr('class');
    let gameCode = gameName.replaceAll('&','').split(/\s/).reduce((response,word)=> response+=word.slice(0,1),'') +"-"+gameYear+"-"+gameLang;

    //console.log(gameCode);

    //console.log(gameName, gameUrl);
    $('#myCollection').removeClass('hidden');

    //if it's already there, remove it and add it again
    if($('#myCollection .entry_group > .'+gameCode).length > 0){
        $('#myCollection .entry_group > .'+gameCode).closest('.entry_group').remove();
    }

    $("<div class='entry_group "+gameId+"'>"+
        "<p class='"+gameCode+"'>"+
        gameName+" ("+gameLang+")"+
        "<div onclick='removeFromCollect(this)'><svg id='Livello_1' data-name='Livello 1' xmlns='http://www.w3.org/2000/svg' width='23.97' height='23.97' viewBox='0 0 23.97 23.97'><defs><style>.cls-1 {fill: #fff;}.cls-1,.cls-2{stroke: #1d1d1b;stroke-miterlimit: 10;stroke-width: 2px;}.cls-2 {fill: none;}</style></defs><circle class='cls-1' cx='11.99' cy='11.99' r='10.99'/><polyline class='cls-2' points='12 18.25 12 11.99 18.24 11.99'/><polyline class='cls-2' points='12 5.73 12 11.99 5.76 11.99'/></svg></div>"+
        "</p></div>").appendTo($('#myCollection .collection_body'));
}

function removeFromCollect(e) {
    $( e ).closest('.entry_group').remove();
}

function closeCollection() {
    $('#myCollection').addClass('hidden');
}

/*function downloadCollection() {
    //console.log($('#myCollection .collection_body .entry_group'));
    import { jsPDF } from "jspdf";
    const doc = new jsPDF();
    doc.text("Hello world!", 10, 10);
    doc.save("a4.pdf");
}*/

/*function downloadCollection() {
        var pdf = new jsPDF('p', 'pt', 'letter');
        // source can be HTML-formatted string, or a reference
        // to an actual DOM element from which the text will be scraped.
        source = $('.collection_body')[0];

        // we support special element handlers. Register them with jQuery-style 
        // ID selector for either ID or node name. ("#iAmID", "div", "span" etc.)
        // There is no support for any other type of selectors 
        // (class, of compound) at this time.
        specialElementHandlers = {
            // element with id of "bypass" - jQuery style selector
            '#bypassme': function (element, renderer) {
                // true = "handled elsewhere, bypass text extraction"
                return true
            }
        };
        margins = {
            top: 80,
            bottom: 60,
            left: 40,
            width: 522
        };
        // all coords and widths are in jsPDF instance's declared units
        // 'inches' in this case
        pdf.fromHTML(
            source, // HTML string or DOM elem ref.
            margins.left, // x coord
            margins.top, { // y coord
                'width': margins.width, // max width of content on PDF
                'elementHandlers': specialElementHandlers
            },

            function (dispose) {
                // dispose: object with X, Y of the last line add to the PDF 
                //          this allow the insertion of new lines after html
                pdf.save('Test.pdf');
            }, margins
        );
    }
    */

function readyToPrint(itemToPrint) {
    //var newWin=window.open('','Print-Window');
    newWin.document.open();
    newWin.document.write('<html><body onload="window.print()">'+itemToPrint.innerHTML+'</body></html>');
    newWin.document.close();
    setTimeout(function(){newWin.close();},10);
    /*var newWin=window.open('','', 'height=650, width=650');
    newWin.document.write('');
    newWin.document.write('<title>Print Content of Div element by  using Javascript</title>');
    newWin.document.write(' <h1>Content of Div element: <br>');
    newWin.document.write(itemToPrint.innerHTML);
    newWin.document.write('');
    newWin.document.close();
    newWin.print();*/
}

function downloadCollection() {
    //console.log($('#myCollection .collection_body .entry_group'));
    //var listOfTitles = [];
    //var listOfUrls = [];
    //var listOfFullTextDumps = [];

    const divToPrint = document.createElement("div");
    let collectionTitles = $('#myCollection .collection_body .entry_group');
    let titleOfMyCollection = 'My Collection';

    if ($('#title_textarea').val() != ''){
        titleOfMyCollection = $('#title_textarea').val().replaceAll(' ','_');
    } else {
        titleOfMyCollection = 'My Collection';
    }

    for (var i = 0; i < collectionTitles.length; i++) {

        const divTitle = document.createElement("div");
        const divUrl = document.createElement("div");
        const divFullTextDump = document.createElement("div");

        let thisGameTitleLang = $(collectionTitles[i]).find('p')[0].innerText;
        let thisGameTitle = $(collectionTitles[i]).find('p')[0].innerText.split(' (')[0];
        let thisGameId = $(collectionTitles[i]).attr('class').split(/\s+/)[1];
        let thisGameUrl = $('#tblcsvdata .'+thisGameId+' .gameUrl').attr('href');
        
        divTitle.innerText = thisGameTitle;
        divUrl.innerText = thisGameUrl;

        divToPrint.appendChild(divTitle);
        divToPrint.appendChild(divUrl);

        /*$.ajax({
            type: "GET",
            url: thisGameUrl, 
            data: "{}",
            success: function(data){
                let thisGameFullTextDump = data;
                listOfFullTextDumps.push(thisGameFullTextDump);
                console.log(listOfFullTextDumps);
            }
        });*/

        //console.log(i, collectionTitles.length);
        if(i+1 == collectionTitles.length) {
            var newWin=window.open('','Print-Window');
            
            (async() => {
                const doc = await fetch(thisGameUrl).then(response => response.text());
                divFullTextDump.innerText = doc;

                defer(function () {
                    //alert("doc is loaded");
                });
                function defer(method) {
                    if (doc) {
                        method();

                        newWin.location = '';
                        newWin.document.open();
                        newWin.document.write('<html><title>'+titleOfMyCollection+'</title><body onload="window.print()">'+divToPrint.innerHTML+'</body></html>');
                        newWin.document.close();
                        setTimeout(function(){newWin.close();},10);

                    } else {
                        setTimeout(function() { defer(method) }, 50);
                    }
                }
            })();
        } else {

            (async() => {
                const doc = await fetch(thisGameUrl).then(response => response.text());
                divFullTextDump.innerText = doc;

                defer(function () {
                    //alert("doc is loaded");
                });
                function defer(method) {
                    if (doc) {
                        method();

                        /*newWin.location = '';
                        newWin.document.open();
                        newWin.document.write('<html><body onload="window.print()">'+divToPrint.innerHTML+'</body></html>');
                        newWin.document.close();
                        setTimeout(function(){newWin.close();},10);*/

                    } else {
                        setTimeout(function() { defer(method) }, 50);
                    }
                }
            })();
        }

        divToPrint.appendChild(divFullTextDump);
    }
}





/*MORE ON THIS*/
function openMoreOnThis(el) {
    closeCollection();
    if (!$('#about').hasClass('hidden')){
        $('#about').addClass('hidden');
    }

    myRow = el.parentNode;
    console.log($('#moreOnThis p.collection_title > span'));
    $('#moreOnThis').removeClass('hidden');
    $('#moreOnThis p.collection_title > span')[0].innerText = $(myRow).find('td')[0].innerText;
}

function closeMoreOnThis(el) {
    $('#moreOnThis').addClass('hidden');
}



/*FILTERS*/
function changeConsole(el) {
    var myValue = el.value.toLowerCase();
    var allRows = $('.table_container tbody > tr');
    for(let i=0; i<allRows.length; i++){
        if(($(allRows[i]).find('td')[1].innerText.toLowerCase() == myValue)||(myValue == "all")){
            $(allRows[i]).removeClass('invisible_console');
        } else {
            $(allRows[i]).addClass('invisible_console');
        }
    }
}

function changeYear(el) {
    var myValue = el.value.toLowerCase();
    var allRows = $('.table_container tbody > tr');
    for(let i=0; i<allRows.length; i++){
        if(($(allRows[i]).find('td')[2].innerText == myValue)||(myValue == "all")){
            $(allRows[i]).removeClass('invisible_year');
        } else {
            $(allRows[i]).addClass('invisible_year');
        }
    }
}

function changeLang(el) {
    var myValue = el.value.toLowerCase();
    var allRows = $('.table_container tbody > tr');
    for(let i=0; i<allRows.length; i++){
        if(($(allRows[i]).find('td')[4].innerText.toLowerCase() == myValue)||(myValue == "all")){
            $(allRows[i]).removeClass('invisible_lang');
        } else {
            $(allRows[i]).addClass('invisible_lang');
        }
    }
}

function filterButtons() {
    var allRows = $('.table_container tbody > tr');

    $('.filters > .genres > button').on( "click", function() {
        if($(this).hasClass('active')){
            $(this).removeClass('active');
        } else {
            $('.filters > .genres > button').each(function(){
                $(this).removeClass('active');
            });
            $(this).addClass('active');
        }
        let myValue = this.innerText.toLowerCase();
        console.log(myValue);

        for(let i=0; i<allRows.length; i++){
            if($(allRows[i]).find('td')[3].innerText.toLowerCase() == myValue){
                $(allRows[i]).removeClass('invisible_genre');
            } else {
                $(allRows[i]).addClass('invisible_genre');
            }
        } 
    } );
}

/*function toggleButton() {
    var target = $( event.target );
    var allRows = $('.table_container tbody > tr');
    //for(let i=0; i<allRows.length; i++){
    console.log(target);
}*/
