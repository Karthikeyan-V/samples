$(document).ready(function() {
  var flagData ;  
  $('.loginButton').on('click', function() {
        flagData = $(this).data('flag');
        renderData(flagData);
    });
    $('#mainContent').on('click','.submitButton', function() {
        flagData = $(this).data('flag');
        renderData(flagData);
    });

    $('.goNext').on('click', function() {
        var sTokenValue = $('.sToken').val();
	var body = document.body, html = document.documentElement;	    
	var height_new = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
	if(sTokenValue != ''){
	  parent.location = 'api_call_page.html?token=' + sTokenValue;
	}
	else{
	  alert("Please Login");
	  myFunction();
	}
    });

    $('.reload').on('click', function() {
        myFunction();
    });

    function myFunction() {
        location.reload();
    }

    function renderData(option, type) {
        var flag = true;
        var type;
        var dataValue;
        var dataStringValue;
        var url;
        var getCollectionId;
        var getSessionToken;

        if (option == "login") {
            type = "POST";
            var getUserName = $('#username').val().trim();
            var getPassword = $('#password').val().trim();
	    var getApiKey = $('.apikey').val().trim();
                        
            if (getUserName == '') {
                alert('Enter username');
                flag = false;
            }
            else if (getPassword == '') {
                alert('Enter password');
                flag = false;
            }
            else if (getApiKey == '') {
                alert('Enter API KEY');
                flag = false;
            }
            else {
                url = 'http://www.goorulearning.org/gooruapi/rest/v2/account/login?apiKey=' + getApiKey;

                dataValue = {
                    username: getUserName,
                    password: getPassword
                };
                dataStringValue = JSON.stringify(dataValue);
		flag = true;
            }
        } else if (option == "playCollection") {

            type = "GET";
            getCollectionId = $('.playCollection_collectionId').val().trim();

            if ($(".defaultSessionToken").is(":checked")) {
                getSessionToken = $(".tokenValue").val().trim();
            }
            else {
                getSessionToken = $('.playCollection_sessionToken').val().trim();
            }
            if (getCollectionId == '') {
                alert('Enter Collection Id');
                flag = false;
            }
            else if (getCollectionId.length != 36) {
                alert('Enter Valid Collection Id');
                flag = false;
            }
            else if (getSessionToken == '') {
                alert('Enter Session token or use default SessionToken');
                flag = false;
            }
            else {
                url = 'http://www.goorulearning.org/gooruapi/rest/v2/collection/' + getCollectionId + '?sessionToken=' + getSessionToken;
		flag = true;
            }
        } else if (option == "searchResource") {

            type = "GET";
            var getSearchContent = $('.searchContent').val().trim();

            if ($(".defaultSessionToken").is(":checked")) {
                getSessionToken = $(".tokenValue").val().trim();
            } else {
                getSessionToken = $('.playCollection_sessionToken').val().trim();
            }
            if (getSearchContent == '') {
                alert('Enter Search Content');
                flag = false;
            } else if (getSessionToken == '') {
                alert('Enter Session token or use default SessionToken');
                flag = false;
            } else {
                url = "http://www.goorulearning.org/gooru-search/rest/search/resource?sessionToken=" + getSessionToken + "&query=" + getSearchContent + "&pretty=1";
		flag = true;
            }
        } else if (option == "createResource") {

            type = "POST";
            var getTitle = $('.createResource_title').val().trim();
            var getUrl = $('.createResource_url').val().trim();
            var getCategory = $('.createResource_category').val().trim();

            if ($(".defaultSessionToken").is(":checked")) {
                getSessionToken = $(".tokenValue").val().trim();
            } else {
                getSessionToken = $('.createResource_sessionToken').val().trim();
            }
            if (getTitle == '') {
                alert('Enter Title');
                flag = false;
            }
            else if (getUrl == '') {
                alert('Enter Url');
                flag = false;
            }
            else if (getCategory == '') {
                alert('Enter Category');
                flag = false;
            }
            else if (getSessionToken == '') {
                alert('Enter Session token or use default SessionToken');
                flag = false;
            }
            else {
                url = 'http://www.goorulearning.org/gooruapi/rest/v2/resource?sessionToken=' + getSessionToken;
                dataValue = {
                    resource: {
			url: getUrl,
                        title: getTitle,
			category: getCategory 
                    }
                };
                dataStringValue = JSON.stringify(dataValue);
		flag = true;
            }
        } else if (option == "createCollection") {
            type = "POST";
            var getCollectionType = $('.createCollection_collectionType').val().trim();
            var getCTitle = $('.createCollection_title').val().trim();
            if ($(".defaultSessionToken").is(":checked")) {
                getSessionToken = $(".tokenValue").val().trim();
            } else {
                getSessionToken = $('.createCollection_sessionToken').val().trim();
            }
            if (getCTitle == '') {
                alert('Enter Collection Title');
                flag = false;
            } else if (getCollectionType == '') {
                alert('Enter Collection Type');
                flag = false;
            } else if (getSessionToken == '') {
                alert('Enter Session token or use default SessionToken');
                flag = false;
            } else {
                url = 'http://www.goorulearning.org/gooruapi/rest/v2/collection?sessionToken=' + getSessionToken;                
		dataValue = {
		    collection: {
			collectionType: getCollectionType,
			title: getCTitle			
		    }};	      
                dataStringValue = JSON.stringify(dataValue);
		flag = true;
            }
        }

        if (url != null || url != '') {
            if (flag && type == "POST") {
	      if(option == "login"){  
		  $(".login-after").hide();
	      }
	      else{
		  $(".after").hide();
	      }
                $.ajax({
                    url: url,
                    type: 'POST',
                    data: dataStringValue,
                    dataType: 'json',
                    crossDomain: true,
                    contentType: "application/json",
                    beforeSend: function() {
		      $('.loader').show();
		      $('.login-form').fadeOut("fast");
		      $(".response-data").hide();
		    },
		    complete: function(){
		      $('.loader').hide();
		    },
		    success: function(results) {
			$('.login-form').fadeIn("fast");
			$('.loader').hide();
                        $(".response-data").html(JSON.stringify(results, null, 4));
                        $(".response-data").show();
                        var genSToken = results.token;
			
                        if (genSToken != null || genSToken != '') {
                            $(".sToken").val(genSToken);
                        }
			var body = document.body, html = document.documentElement;	    
			var height_new = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
			$(".subContainer").height(height_new);
			$(".menu").height(height_new);
                    },
                    error: function(message) {
			$('.login-form').fadeIn("fast");
                        $('.loader').hide();
                        alert(" Please check your inputs");
                    }
                });
            }
            if (flag && type == "GET") {
              $(".after").hide();  
	      $.ajax({
                    url: url,
                    type: 'GET',
                    dataType: 'jsonp',
                    crossDomain: true,
                    contentType: "application/json",
                    beforeSend: function() {
		      $('.loader').show();
		      $('.login-form').fadeOut("fast");
		      $(".response-data").hide();		      
		    },
		    complete: function(){
		      $('.loader').hide();
		    },
		    success: function(results) {
                        $('.loader').hide();
			
			$('.login-form').fadeIn("fast");
			$(".response-data").html(JSON.stringify(results, null, 4));
                        $(".response-data").show();
			var body = document.body, html = document.documentElement;	    
			var height_new = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
			$(".subContainer").height(height_new);
			$(".menu").height(height_new);  
                    },
                    error: function(message) {
			$('.loader').hide();
			$('.login-form').fadeIn("fast");
                        alert(" Please check your inputs");
                    }
                });
            }
        }
    }
});
