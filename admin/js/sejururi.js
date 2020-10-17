/*global $*/

// READ recods on page load
$(document).ready(function () {
    readRecords(); // calling function
});

// READ records
function readRecords() {
    $.get("/sejururi/", {}, function (data, status) {
        data.forEach(function(value) {
            var row = '<tr id="row_id_'+ value.id +'">'
            			+ displayColumns(value)
        				+ '</tr>';
            $('#articles').append(row);
        });
    });
}

function displayColumns(value) {
    return 	'<td class="id">'+ value.id +'</td>'
            + '<td class="titlu" ><a href="'+value.link+'">'+ value.titlu +'</td>'
            + '<td class="destinatie">'+value.destinatie+'</td>'
			+ '<td class="durata">'+value.durata+'</td>'
			+ '<td class="pret">'+value.pret+'</td>'
			+ '<td align="center">'
			+	'<button onclick="viewRecord('+ value.id +')" class="btn btn-edit">Update</button>'
			+ '</td>'
			+ '<td align="center">'
			+	'<button onclick="deleteRecord('+ value.id +')" class="btn btn-danger">Delete</button>'
			+ '</td>';
}

function addRecord() {
    $('#titlu').val('');
    $('#destinatie').val('');
    $('#durata').val('');
    $('#pret').val('');
    
    $('#myModalLabel').html('Adauga un nou sejur');
}

function viewRecord(id) {
    var url = "/sejururi/" + id;
    console.log(url);
    $.get(url, {}, function (data, status) {
        //bind the values to the form fields
        $('#id').val(id);
        $('#titlu').val(data.titlu);
        $('#destinatie').val(data.destinatie);
        $('#durata').val(data.durata);
        $('#pret').val(data.pret);
        $('#link').val(data.link);
        $('#myModalLabel').html('Editare sejur');
        
        $('#add_new_record_modal').modal('show');
    });
}

function saveRecord() {
    //get data from the html form
    var formData = $('#record_form').serializeObject();
    
    //decide if it's an edit or create
    if(formData.id) {
         console.log("Updated");
        updateRecord(formData);
       
    } else {
         console.log("Created "+ formData.id);
        createRecord(formData);
       
    }
}

function createRecord(formData) {
    $.ajax({
        url: '/sejururi/',
        type: 'POST',
        accepts: {
            json: 'application/json'
        },
        data: formData,
        success: function(data) {
            $('#add_new_record_modal').modal('hide');
            
            var row = '<tr id="row_id_'+ data.id +'">'
            			+ displayColumns(data)
        				+ '</tr>';
            $('#articles').append(row);
        } 
    });
}

function updateRecord(formData) {
    console.log("updateRecordID: "+formData);
    $.ajax({
        url: '/sejururi/'+formData.id,
        type: 'PUT',
        accepts: {
            json: 'application/json'
        },
        data: formData,
        success: function(data) {
            $('#row_id_'+formData.id+'>td.titlu').html(formData.titlu);
            $('#row_id_'+formData.id+'>td.destinatie').html(formData.destinatie);
            $('#row_id_'+formData.id+'>td.durata').html(formData.durata);
            $('#row_id_'+formData.id+'>td.pret').html(formData.pret);
            $('#add_new_record_modal').modal('hide');
        } 
    });
}

function deleteRecord(id) {
    $.ajax({
        url: '/sejururi/'+id,
        type: 'DELETE',
        success: function(data) {
            $('#row_id_'+id).remove();
        }
    });
}