$( document ).ready(function() {

	var mySpreadsheet = 'https://docs.google.com/spreadsheet/ccc?key=1tPbgHcFoX1snKdCC5NdrRYST5WovHcg6fjfM0_e7kiE&usp=drive_web#gid=1783991526';


	var done = function (error, options, response) {
		$('#loading').fadeOut();


		    $('tbody').addClass('list');

		    var options = {
				valueNames: ['placename']
			};

			var barrios = new List('filters', options);
	

		
		
	};



	var properatiTemplate = Handlebars.compile($('#template').html());

	$('#properati').sheetrock({
		url: mySpreadsheet,
		query: "select A,C,D,J,K,O",
		rowTemplate: properatiTemplate,
		callback: done
	});

	

});