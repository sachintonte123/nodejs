function AppCtrl($scope, $http) {
	console.log('hello world from controller');

	var refresh = function(){
	$http.get('contactlist').success(function(response){
		console.log('i got the data i received');
		$scope.contactlist= response;
		$scope.contact= "";
	});
};

refresh();
	$scope.addContact = function(){

		console.log($scope.contact);
		$http.post('/contactlist', $scope.contact).success(function(response){
				console.log(response);
				refresh();
		});
	};
	/* person1 = {
		name: 'sachin',
		email: 'sachin@gmail.com',
		number: 123456
	};
	person2 = {
		name: 'sachin2222',
		email: 'sachin222@gmail.com',
		number: 456546546
	};
	person3 = {
		name: 'sachin333',
		email: 'sachin333@gmail.com',
		number: 567567657
	};
	var contactlist = [person1, person2, person3];
	$scope.contactlist = contactlist;*/
  $scope.remove = function(id) {
  	console.log(id);
  	$http.delete('/contactlist/' + id).success(function(response) {
				refresh();
		});
  };

  $scope.edit = function(id) {
  		console.log(id);
  		$http.get('/contactlist/' + id).success(function(response) {
  				$scope.contact = response;
  		});
  };
  $scope.update = function() {
  		console.log($scope.contact._id);
  		$http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function(response) {
  				refresh();
  		});
  };  
}