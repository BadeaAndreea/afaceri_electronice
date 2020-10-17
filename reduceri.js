/*global $*/

$(document).ready(function(){
     readRecords();
     readRecords2();// calling function
})

function readRecords() {
    $.get("/vouchere/", {}, function (data, status) {
        data.forEach(function(value) {
            var row = '<tr id="row_id_'+ value.id +'" onclick="aplicare_reducere(\''+value.id+'\')">'
            			+ displayColumns(value)
        				+ '</tr>';
            $('#articlesVouchere').append(row);
        });
    });
}

function aplicare_reducere(id){
    var url = "/vouchere/" + id;
    var id_sejur = '';
    var end_date = '';
    var valoare = '';
    var voucher={};

    
    $.get(url, {}, function (data2, status) {
        
        voucher = {id:data2.id, id_sejur:data2.id_sejur, valoare:data2.valoare, end_date:(data2.end_date).substr(0,10), status:1};
        id_sejur = data2.id_sejur;
        end_date = data2.end_date;
        valoare = data2.valoare;

        
    });
    var sejururi = [];
    $.get("/sejururi/", {}, function (data, status) {
 
        data.forEach(function(value) {
            if(value.id==id_sejur){
                var sejur = {id_sejur:value.id, titlu:value.titlu, destinatie:value.destinatie, durata:value.durata, pret:value.pret};
                sejururi.push(sejur);
            if(new Date(value.end_date) < new Date()){
                alert("Voucherul a expirat!");
            }else{
               var raspuns= confirm("Doresti sa activezi voucherul?");
               console.log(voucher);
               if(raspuns){
                var tr=document.getElementById("row_id_"+id_sejur);
                var tdPretRedus=document.createElement("td");
                var tdEndDate=document.createElement("td");
                tdPretRedus.innerHTML=value.pret-((valoare*value.pret)/100);
                tdEndDate.innerHTML=end_date.substring(0,10);
                tr.appendChild(tdPretRedus);
                tr.appendChild(tdEndDate);
                
                
                   $.ajax({
                     url: '/vouchere/'+id,
                     type: 'PUT',
                     accepts: {
                         json: 'application/json'
                     },
                     data: voucher,
                     success: function(data) {
                         console.log(end_date);
                         console.log(voucher.end_date);
                         console.log(data.end_date);
                         $('#row_id_'+data.id+'>td.id_sejur').html(data.id_sejur);
                         $('#row_id_'+data.id+'>td.valoare').html(data.valoare);
                         $('#row_id_'+data.id+'>td.end_date').html(data.end_date);
                         $('#row_id_'+data.id+'>td.status').html("1");
                         
                     } 
                 });
                 
                 
                 
                   
               }
            }
            }
        });
        
    });

}


function displayColumns(value) {
    if(new Date(value.end_date) < new Date()){
    return 	'<td>'+value.id+'</td>'
            + '<td class="id_sejur">'+ value.id_sejur +'</td>'
            + '<td class="valoare">'+ value.valoare +'</td>'
            + '<td class="end_date">'+(value.end_date).substring(0,10)+'</td>'
			+ '<td class="status">'+value.status+'</td>';
    }else{
    return 	'<td>'+value.id+'</td>'
            + '<td class="id_sejur">'+ value.id_sejur +'</td>'
            + '<td class="valoare">'+ value.valoare +'</td>'
            + '<td class="end_date">'+(value.end_date).substring(0,10)+'</td>'
			+ '<td class="status">'+value.status+'</td>';
    }
}





               var obiecteVoucher=[];
                var obiectVoucher={};
function readRecords2() {
    
    $.get("/sejururi/", {}, function (data, status) {
        data.forEach(function(value) {
            
                $.get("/vouchere/", {}, function (data, status) {
                    data.forEach(function(value1) {
                        if(value1.id_sejur==value.id && value1.status==1){
                             obiectVoucher = {id:value1.id, id_sejur:value1.id_sejur, valoare:value1.valoare, end_date:value1.end_date, status:value1.status};
                             obiecteVoucher.push(obiectVoucher);
                        }
                    });
                    
            var row = '<tr id="row_id_'+ value.id +'">'
            			+ displayColumns2(value)
        				+ '</tr>';
            $('#articles').append(row);
                });
    
            
            
            
        });
    });
    
    
 
}

function displayColumns2(value) {
    if(obiecteVoucher.length >0){
        var valoare=obiectVoucher.valoare;
        var end_date=obiectVoucher.end_date;
        obiecteVoucher=[];
        return 	'<td class="id">'+ value.id +'</td>'
                + '<td class="titlu"><a id="reference_'+ value.id +'" href="'+value.link+'">'+ value.titlu +'</td>'
                + '<td class="destinatie">'+value.destinatie+'</td>'
	    		+ '<td class="durata">'+value.durata+'</td>'
	    		+ '<td class="pret">'+value.pret+'</td>'
	    		+ '<td class="valoare">'+(value.pret-((valoare*value.pret)/100))+'</td>'
	    		+ '<td class="end_date">'+end_date.substring(0,10)+'</td>';
	    		
    }else{
         return 	'<td class="id">'+ value.id +'</td>'
                + '<td class="titlu"><a href="'+value.link+'">'+ value.titlu +'</td>'
                + '<td class="destinatie">'+value.destinatie+'</td>'
	    		+ '<td class="durata">'+value.durata+'</td>'
	    		+ '<td class="pret">'+value.pret+'</td>'
    }
}


