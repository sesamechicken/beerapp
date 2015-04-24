angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('beerListCtrl', function($scope, $ionicModal, $ionicListDelegate, $http){

  // Create the share modal
  $ionicModal.fromTemplateUrl('templates/modal-share.html', {
    scope: $scope,
    animation: 'slide-in-right'
  }).then(function(modal) {
    $scope.modal = modal;
  });


  $scope.listCanSwipe = true;
  $scope.beerlist = [
    {id: 1, name: 'Sierra Nevada Pale Ale', price: '$12.99', unit: 'case'},
    {id: 2, name: 'Stone IPA', price: '$12.99', unit: 'case'},
    {id: 3, name: 'New Belgium Snapshot Belgian', price: '$12.99', unit: 'case'},
    {id: 4, name: 'Green Flash IPA', price: '$12.99', unit: 'case'},
    {id: 5, name: 'Harpoon Long Thaw IPA', price: '$12.99', unit: 'case'},
    {id: 6, name: 'Brew Kettle Old 21', price: '$12.99', unit: 'case'},
    {id: 7, name: 'Honey Brown', price: '$12.99', unit: 'case'}
  ];

  $scope.shareItem = function(){
    $scope.modal.hide();
    $ionicListDelegate.closeOptionButtons();
  }
  $scope.share = function(beer){
    $scope.modal.show();
    console.log(beer);
  }
  $scope.closeShare = function(){
    $scope.modal.hide();
    $ionicListDelegate.closeOptionButtons();
  }



  $scope.doRefresh = function() {
    $http.get('/new-items')
     .success(function(newItems) {
       $scope.items = newItems;
     })
     .error(function(error){
      console.error(error);
     })
     .finally(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
     });
   }


})

.controller('beerDetailCtrl', function($scope, $http, $stateParams){
  $scope.beer = $stateParams.id;

  $scope.beer_details = [];

  $http.get('https://stormy-sierra-8448.herokuapp.com/api/?q=' + $scope.beer).success(function(data) {
    $scope.beer_details = data.data[0];
    console.log(data.data[0]);
  });
  // brewerydb.com/
  // b339256c241180f6a38f6baac6d63805
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
