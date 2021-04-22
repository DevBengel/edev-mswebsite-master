function checkData() {
     $.ajax({
        url: 'http://10.42.0.40/view.php',
        type: 'get',
        dataType: 'JSON',
        success: function(response){
        	$(".removeRow").remove();
        	var trHTML = '';
        	$.each(response, function (i, item) {
            		trHTML += '<tr class="removeRow" id="' + item.sensor_id + '"><td>' + item.sensor_name + '</td><td>' + item.temp_value + ' Grad</td><td>' + item.temp_timestamp + '</td><td>' + item.sensor_location + '</td><td id="' + item.sensor_id + '"><button class="reserve-button" onclick="UpdateStatus(' + item.sensor_id + ')"><img src="img/deactivate-16.png" alt="Deaktivieren"></button></td></tr>';
        	});
        	$('#demoTable').append(trHTML);
        },
    });
    $.ajax({
        url: 'http://10.42.0.101:9002/sensor?enabled=0',
        type: 'get',
        dataType: 'JSON',
        success: function(response){
                $(".sensorRemove").remove();
                var trHTML = '';
                $.each(response, function (i, item) {
			trHTML += '<tr class="sensorRemove" id="' + item.sensor_id + '"><td>' + item.sensor_name + '</td><td>' + item.sensor_location +'</td><td id="' + item.sensor_id + '"><button class="reserve-button" onclick="Activate(' + item.sensor_id + ')"><img src="img/activate-16.png" alt="Aktivieren"></button></td></tr>';		
                });
                $('#sensordisabled').append(trHTML);
        },
    });
}

function Activate(id){
    var data_tosend = {
            sensor_id: id,
            sensor_enabled: "1",
    }
    $.ajax
    ({
        url: 'http://10.42.0.101:9002/sensor/' + id,
        data: JSON.stringify(data_tosend),
        type: 'PUT',
        dataType: 'json',
        crossDomain: true,
        processData: false,
        contentType: 'application/json',
        success: function(result)
        {
                alert('OK');
        }
    });  //.done(function() { //use this
        // alert("DONE!");
        //});
};


function UpdateStatus(id){
    var data_tosend = {
            sensor_id: id,
            sensor_enabled: "0",
    }
    $.ajax
    ({
        url: 'http://10.42.0.101:9002/sensor/' + id,
        data: JSON.stringify(data_tosend),
        type: 'PUT',
        dataType: 'json',
        crossDomain: true,
        processData: false,
        contentType: 'application/json',
        success: function(result)
        {
		alert('OK');
        }
    });  //.done(function() { //use this
        // alert("DONE!");
        //});
};


$(document).ready(function(){
     $.ajax({
        url: 'http://10.42.0.40/view.php',
        type: 'get',
        dataType: 'JSON',
        success: function(response){
          
        var trHTML = '';
        $.each(response, function (i, item) {
            trHTML += '<tr class="removeRow" id="' + item.sensor_id + '"><td>' + item.sensor_name + '</td><td>' + item.temp_value + ' Grad</td><td>' + item.temp_timestamp + '</td><td>' + item.sensor_location + '</td><td id="' + item.sensor_id + '"><button class="reserve-button" onclick="UpdateStatus(' + item.sensor_id + ')"><img src="img/deactivate-16.png" alt="Deaktivieren"></button></td></tr>';
        });
        $('#demoTable').append(trHTML);
        },
    });

    $.ajax({
        url: 'http://10.42.0.101:9002/sensor?enable=0',
        type: 'get',
        dataType: 'JSON',
        success: function(response){

        var trHTML = '';
        $.each(response, function (i, item) {
            trHTML += '<tr class="sensorRemove" id="' + item.sensor_id + '"><td>' + item.sensor_name + '</td><td>' + item.sensor_location +'</td><td id="' + item.sensor_id + '"><button class="reserve-button" onclick="Activate(' + item.sensor_id + ')"><img src="img/activate-16.png" alt="Aktivieren"></button></td></tr>';
        });
        $('#sensordisabled').append(trHTML);
        },
    });
   setInterval(checkData, 5000);
});
