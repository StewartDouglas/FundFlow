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

});
