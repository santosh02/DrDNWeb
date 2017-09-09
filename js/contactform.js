var formApp=angular.module('formApp', ['ngResource'])
		.config(['$httpProvider', function ($httpProvider) {    
			$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
		}]);
  function formController($scope, $http) {
      	$scope.formData = {};
      	$scope.processForm = function() {
    		$http({
	  		method  : 'POST',
	  		url     : 'https://docs.google.com/forms/d/1S8mO74t7MewcBtte0nfee7sxLBhGA26s_GQD5EOxIHE/formResponse',
	  		data    : $.param($scope.formData),  // pass in data as strings
	  	 // set the headers so angular passing info as form data (not request payload)
	 		})
	  		.success(function(formData, status, headers, config) {
	    	console.log(formdata);

	    	if (!data.success) {
	      // if not successful, bind errors to error variables
	      		$scope.errorName = data.errors.name;
	      		$scope.errorSuperhero = data.errors.superheroAlias;
	    	} else {
	      // if successful, bind success message to message
	      		$scope.message = data.message;
	    	}
  		});
    };

  }