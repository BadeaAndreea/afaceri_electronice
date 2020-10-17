/*global $*/

$(document).ready(function(){
     readRecords(); // calling function
     setDropdown();
})

function updateTableSejur(destinatieSelectata){
    $.get("/sejururi/"+ destinatieSelectata, function(data){
        var html="";
        console.log(data)
        var row="<table id='articles'class='table table-dark table-bordered table-striped'>";
         row += "<tr><th>Id</th><th>Titlu</th><th>Destinatie</th><th>Durata</th><th>Pret</th></tr></tr>";
        data.forEach(function(sejur) {
            $("#articles").detach();
           
            row += '<tr id="row_id_'+ sejur.id_sejur +'">'
            			+ displayColumns(sejur)
        				+ '</tr>';
            $('#sejururiTitle').append(row);
            
        })
        row+="</table>";
    })
}

function setDropdown(){
    $.get("/sejururi",function(data){
        var html="";
        var uniqueDestinations=[];
        var destinatii=[];
        data.forEach(function(sejur) {
            destinatii.push(sejur.destinatie);
        })
        $.each(destinatii, function(i, el){
             if($.inArray(el, uniqueDestinations) === -1) uniqueDestinations.push(el);
        });
        uniqueDestinations.forEach(function(sejur) {
            html = html + '<option value="'+sejur+'" >'+sejur+'</option>';
        })
        $('#destinatieSelect').html(html);
    })
}


// READ records
function readRecords() {
    $.get("/sejururi/", {}, function (data, status) {
        data.forEach(function(value) {
            var row = '<tr id="row_id_'+ value.id_sejur +'">'
            			+ displayColumns(value)
        				+ '</tr>';
            $('#articles').append(row);
        });
    });
}

function displayColumns(value) {
    return 	'<td class="id">'+ value.id +'</td>'
            + '<td class="titlu"><a href="'+value.link+'">'+ value.titlu +'</td>'
            + '<td class="destinatie">'+value.destinatie+'</td>'
			+ '<td class="durata">'+value.durata+'</td>'
			+ '<td class="pret">'+value.pret+'</td>';
}


