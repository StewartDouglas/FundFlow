$(function(){  // $(document).ready shorthand
  $('.jumbotron').css('visibility','visible').hide().fadeIn(1000, function(){
 	  	  $('.col-md-6').css('visibility','visible').hide().fadeIn('slow'); 	
  });

  $('#giveFunds').submit(function(event) {
  	var form = this;        // cache a reference to the form
    var total_amount = this.fund.value;
    var debit_amount = total_amount * 0.05;
  	event.preventDefault(); // prevent the form from submitting

    $('#amount').html(debit_amount);
  	$('#myModal').modal('show');
  	
  	$('#confirm').click(function(){
  		form.submit(); // user has confirm, submit the form data
  	});
  	$("#cancel").click(function(){
  		$('#myModal').modal('hide'); // user has cancelled, hide the modal window
  	});
  });

  $('#makeRepayment').submit(function(event) {
    //var form = this;        // cache a reference to the form
    //var total_amount = this.fund.value;
    //var debit_amount = total_amount * 0.05;
    event.preventDefault(); // prevent the form from submitting

    console.log('got here');
    //$('#amount').html(debit_amount);
    $('#myRepaymentModal').modal('show');
    
    $('#confirm').click(function(){
      form.submit(); // user has confirm, submit the form data
    });
    $("#cancel").click(function(){
      $('#myModal').modal('hide'); // user has cancelled, hide the modal window
    });
  });

 $(".dialog").dialog({

    autoOpen: false,
    show: {
        effect: "blind",
        duration: 100
    },
    hide: {
        effect: "blind",
        duration: 100
    }
});

  $(".helpBorrower").click(function () {
    var target = $(this);
    $( "#dialogBorrower" ).dialog( "option", "position", { my: "left top", at: "left bottom", of: target } )
    $( "#dialogBorrower" ).dialog("open");
  });

  $("#helpDescription").click(function () {
    var target = $(this);
    $( "#dialogDescription" ).dialog( "option", "position", { my: "left top", at: "left bottom", of: target } )
    $( "#dialogDescription" ).dialog("open");
  });

  $("#helpAmount").click(function () {
    var target = $(this);
    $( "#dialogAmount" ).dialog( "option", "position", { my: "left top", at: "left bottom", of: target } )
    $( "#dialogAmount" ).dialog("open");
  });

  $("#helpAPR").click(function () {
    var target = $(this);
    $( "#dialogAPR" ).dialog( "option", "position", { my: "left top", at: "left bottom", of: target } )
    $( "#dialogAPR" ).dialog("open");
  });

  $("#helpTimeleft").click(function () {
    var target = $(this);
    $( "#dialogTimeleft" ).dialog( "option", "position", { my: "left top", at: "left bottom", of: target } )
    $( "#dialogTimeleft" ).dialog("open");
  });

  $("#helpFunded").click(function () {
    var target = $(this);
    $( "#dialogFunded" ).dialog( "option", "position", { my: "left top", at: "left bottom", of: target } )
    $( "#dialogFunded" ).dialog("open");
  });

  $('#ex1').slider({
    formatter: function(value) {
      return 'Current value: ' + value;
    }
  });

  $("#helpBorrower2").click(function () {
    var target = $(this);
    $( "#dialogBorrower" ).dialog( "option", "position", { my: "left top", at: "left bottom", of: target } )
    $( "#dialogBorrower" ).dialog("open");
  });

  $("#helpDescription2").click(function () {
    var target = $(this);
    $( "#dialogDescription" ).dialog( "option", "position", { my: "left top", at: "left bottom", of: target } )
    $( "#dialogDescription" ).dialog("open");
  });

  $("#helpAmount2").click(function () {
    var target = $(this);
    $( "#dialogAmount" ).dialog( "option", "position", { my: "left top", at: "left bottom", of: target } )
    $( "#dialogAmount" ).dialog("open");
  });

  $("#helpAPR2").click(function () {
    var target = $(this);
    $( "#dialogAPR" ).dialog( "option", "position", { my: "left top", at: "left bottom", of: target } )
    $( "#dialogAPR" ).dialog("open");
  });

  $("#helpTimeleft2").click(function () {
    var target = $(this);
    $( "#dialogTimeleft" ).dialog( "option", "position", { my: "left top", at: "left bottom", of: target } )
    $( "#dialogTimeleft" ).dialog("open");
  });

  $("#helpFunded2").click(function () {
    var target = $(this);
    $( "#dialogFunded" ).dialog( "option", "position", { my: "left top", at: "left bottom", of: target } )
    $( "#dialogFunded" ).dialog("open");
  });

  $("#helpInvestment").click(function () {
    var target = $(this);
    $( "#dialogInvestment" ).dialog( "option", "position", { my: "left top", at: "left bottom", of: target } )
    $( "#dialogInvestment" ).dialog("open");
  });

  $("#generate").click(function(){
       $.ajax({
          url: 'http://localhost:18332', 
          data: JSON.stringify({jsonrpc:'2.0',method:'getnewaddress',id:"0"}), 
          type:"POST",
          dataType:"jsonp",
          username: "bitcoinrpc",
          password: "rpcpw1234",
          crossDomain : true,
          xhrFields: {
            withCredentials: true
          },
          success: function (result) { 
                 alert("ok");
          },
          error: function (err,status,thrown) {
                 alert ("this syntax sucks!! " + " ERROR: " + err + " STATUS: " + status + " " + thrown );
                 for(i in err){
                    console.log(err[i]);
                 }
          },
          complete: function (xhr,status) { 
                 alert('Complete=>  showing status as: '+ status); 
                 data = $.parseJSON(xhr.responseText);  
                 alert (data);
          } 
       });
  });


});
