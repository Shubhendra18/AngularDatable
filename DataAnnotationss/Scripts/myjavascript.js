var q = angular.module("myapp", ['ui.bootstrap']);
q.controller("adduser", function ($scope, $http) {
    $scope.currentPage = 1;
    $scope.so = 2;

    $scope.InsertData = function (udata) {
        $http.post('/Home/Index/', { ut: udata }).success(
            function (response) {
                alert('Success');
                $scope.getdata();
            }).error(
                function (response) {
                    alert('Error');
                });
    };
    $scope.getdata = function () {
        $http.get('/Home/GetUser').success(
            function (response) {
                $scope.users = response;
            });
    };
    $http.get('/Home/GetUser').success(
        function (response) {
            $scope.users = response;
        });
    $scope.Delete = function (Id) {
        $http.post('/Home/DeleteUser/', { Id: Id }).success(
            function (response) {
                alert('Success');
                $scope.getdata();
            }).error(
                function (response) {
                    alert('Error');
                });
    };
    $scope.Update = function (Id) {
        $http.get('/Home/UpdateUser/?Id=' + Id).success(
            function (updata) {
                $scope.updata.Id = updata.Id;
                $scope.updata.Name = updata.Name;
                $scope.updata.Address = updata.Address;
                $scope.updata.Email = updata.Email;
                $scope.updata.Password = updata.Password;
            });
    };
    $scope.finalUpdate = function (updata) {
        $http.post('/Home/UpdateUser/', { ut: updata }).success(
            function (response) {
                $('#modalid').modal('hide');
                $scope.getdata();
            }).error(
                function (response) {
                    alert('Error');
                });
    };



    // sort ordering (Ascending or Descending). Set true for desending
    $scope.reverse = false;

    // called on header click
    $scope.sortColumn = function (col) {
        $scope.column = col;
        if ($scope.reverse) {
            $scope.reverse = false;
            $scope.reverseclass = 'arrow-up';
        } else {
            $scope.reverse = true;
            $scope.reverseclass = 'arrow-down';
        }
    };

    // remove and change class
    $scope.sortClass = function (col) {
        if ($scope.column === col) {
            if ($scope.reverse) {
                return 'arrow-down';
            } else {
                return 'arrow-up';
            }
        } else {
            return '';
        }
    };
});