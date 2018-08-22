$(document).ready(function(){
	$("#submit").click(function (e) {
		var worksheetType = $("#worksheetType").dropdown('get value');
		if (worksheetType == 'testPaper') {
			var subject = $("#subject").dropdown('get value');
			var chapters = $('#chapter').dropdown('get values');
			var formData = {
				"subject": subject,
				"chapters[]": chapters
			}
			$.ajax({
				url: "http://localhost:8000/get_test_paper",
				method : "get",
				data: formData,
				headers: { "X-CSRFToken": csrftoken,},
				success: function(response) {
					console.log("hi");
					var blob = new Blob([response.bodyText], { type: headers['application/msword'] });
				}
			});
		}
	});

	$('#worksheetType').dropdown({
		onChange: function (value, text, $selectedItem) {
			if(value == 'testPaper') {
				$("#test-div").show();
				$("#generic-div").hide();
				$("#customized-div").hide();
			} else if(value == 'genericWorksheet') {
				$("#test-div").hide();
				$("#generic-div").show();
				$("#customized-div").hide();
			} else if(value == 'customizedWorksheet') {
				$("#test-div").hide();
				$("#generic-div").hide();
				$("#customized-div").show();
			}
		},
	});

	$('#subject').dropdown({
		onChange: function (value, text, $selectedItem) {
				let formData = {
					subject: 'Science',
				}
				$.ajax({
					url: "http://localhost:8000/get_chapters",
					method : "get",
					data: formData,
					headers: { "X-CSRFToken": csrftoken,},
					success: function(d) {
						var chapters = d['chapters'];
						$("#chapter").show();
						for (var i=0; i<chapters.length; i++) {
							$("#chapter-options-parent").append(`<div class="item" data-value=${chapters[i]}>${chapters[i]}</div>`);
						}
					}
				});
			},
		});

	$('#chapter').dropdown({
		onChange: function (value, text, $selectedItem) {
		},
	});

	$('#qtype').dropdown({
		onChange: function (value, text, $selectedItem) {
		},
	});

	$('#stud_name').dropdown({
		onChange: function (value, text, $selectedItem) {
		},
	});

});