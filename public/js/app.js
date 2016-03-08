/* globals angular */

(function(angular) {
  'use strict';

  var app = angular.module('todo', []);

  app.controller('HomeController', function($scope, $http) {
    $scope.message = '';

    $http.get('/test-json').then(function(response) {
      $scope.message = response.data.message;
    });
  });
}) (angular);

