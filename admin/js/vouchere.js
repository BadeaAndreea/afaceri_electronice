/*global $*/

// READ recods on page load
$(document).ready(function () {
    document.getElementById('status').addEventListener('keydown', function(ev) {
        if(ev.keyCode != 48 && ev.keyCode != 49 && ev.keyCode != 8) {
            ev.preventDefault();
         }
    });
    readRecords(); // calling function
});

// READ records
function readRecords() {
    $.get("/vouchere/", {}, function (data, status) {
        data.forEach(function(value) {
            var row = '<tr id="row_id_'+ value.id +'">'
            			+ displayColumns(value)
        				+ '</tr>';
            $('#articles').append(row);
        });
    });
}

function displayColumns(value) {
    console.log(value.status);
    return 	'<td>'+value.id+'</td>'
            + '<td class="id_sejur">'+ value.id_sejur +'</td>'
            + '<td class="valoare">'+ value.valoare +'</td>'
            + '<td class="end_date">'+(value.end_date).substring(0,10)+'</td>'
			+ '<td class="status">'+value.status+'</td>'
			+ '<td align="center">'
			+	'<button onclick="viewRecord('+ value.id +')" class="btn btn-edit">Update</button>'
			+ '</td>'
			+ '<td align="center">'
			+	'<button onclick="deleteRecord('+ value.id +')" class="btn btn-danger">Delete</button>'
			+ '</td>';
}

function addRecord() {
    $('#id').val('');
    $('#id_sejur').val('');
    $('#valoare').val('');
    $('#end_date').val('');
    $('#status').val('');
    
    $('#myModalLabel').html('Adauga voucher nou');
}

function viewRecord(id) {
    var url = "/vouchere/" + id;
    
    $.get(url, {}, function (data, status) {
        //bind the values to the form fields
        $('#id_sejur').val(data.id_sejur);
        $('#valoare').val(data.valoare);
        $('#end_date').val((data.end_date).substring(0,10));
        $('#status').val(data.status);
        $('#id').val(id);
        $('#myModalLabel').html('Edit Product');
        
        $('#add_new_record_modal').modal('show');
    });
}

function saveRecord() {
    //get data from the html form
    var formData = $('#record_form').serializeObject();
    
    //decide if it's an edit or create
    if(formData.id) {
        console.log("is updating");
        updateRecord(formData);
    } else {
        createRecord(formData);
    }
}

function createRecord(formData) {
    $.ajax({
        url: '/vouchere/',
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
    console.log("updateStatus "+formData.status);
    $.ajax({
        url: '/vouchere/'+formData.id,
        type: 'PUT',
        accepts: {
            json: 'application/json'
        },
        data: formData,
        success: function(data) {
            $('#row_id_'+formData.id+'>td.id_sejur').html(formData.id_sejur);
            $('#row_id_'+formData.id+'>td.valoare').html(formData.valoare);
            $('#row_id_'+formData.id+'>td.end_date').html(formData.end_date);
            $('#row_id_'+formData.id+'>td.status').html(formData.status);
            $('#add_new_record_modal').modal('hide');
        } 
    });
}

function deleteRecord(id) {
    $.ajax({
        url: '/vouchere/'+id,
        type: 'DELETE',
        success: function(data) {
            $('#row_id_'+id).remove();
        }
    });
}


