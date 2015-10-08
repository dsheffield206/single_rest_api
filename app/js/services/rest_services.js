var handleWin = function(callback){
    return function(res){
        callback(null, res.data);
    };
};

var handleFail = function(callback){
    return function(data){
        callback(data);
    };
};

module.exports = function(app){
    app.factory('Resource', ['$http', function($http){
        var Resource = function(resourceName){
            this.resourceName = resourceName;
        };

        Resource.prototype.create = function(resource, callback){
            $http.post('/api/' + this.resourceName + '/', resource)
                .then(handleWin(callback), handleFail(callback));
        };

        Resource.prototype.getAll = function(callback){
            $http.get('/api/' + this.resourceName + '/')
                .then(handleWin(callback), handleFail(callback));
        };

        Resource.prototype.update = function(resource, callback){
            $http.put('/api/' + this.resourceName + '/' + resource._id, resource)
                .then(handleWin(callback), handleFail(callback));
        };

        Resource.prototype.remove = function(resource, callback){
            $http.delete('/api/' + this.resourceName + '/' + resource._id)
                .then(handleWin(callback), handleFail(callback));
        };

        return function(resourceName){
            return new Resource(resourceName);
        };
    }]);
};
