(async() => {
	//const URL = "text_dumps";
	const URL = 'https://github.com/schlatterca/vg_text/tree/main/text_dumps';
	//const doc = await fetch(URL+"?filter[metadata.mimeType]=application%2Fvnd.google-apps.spreadsheet").then(r => r.json());
	const doc = await fetch(URL).then(r => r.json());
	console.log(URL, doc);
	console.log('1');
});

console.log('2');

jQuery.get('text_dumps', function(data) {
    var myText = data;
    console.log(data);
    console.log('3');
});

console.log('4');

var filenames=[], foldernames=[];

$.get("text_dumps",function(response){
    document.write(response);
    getNames();
    console.log('5');
});

function getNames()
{
    var files = document.querySelectorAll("a.icon.file");
    var folders = document.querySelectorAll("a.icon.dir");
    files.forEach(function(item){filenames.push(item.textContent)})
    folders.forEach(function(item){foldernames.push(item.textContent.slice(0,-1))})
    console.log(filenames);
    console.log(foldernames);
}

console.log('6');
