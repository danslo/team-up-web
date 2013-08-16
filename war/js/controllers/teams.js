/*jslint node: true */
/*global angular */
'use strict';


angular.module('WebPaige.Controllers.Teams', [])

/**
 * Groups controller
 */
.controller('teamCtrl',
[
    '$rootScope', '$scope', '$location', 'Teams','data', '$route', '$routeParams', 'Storage',
    function ($rootScope, $scope, $location, Teams,data, $route, $routeParams, Storage)
    {
        /**
         * Fix styles
         */
        $rootScope.fixStyles();
        
        $scope.team = data.team;
        $scope.members = data.members;
        $scope.teams = data.teams;
        
        /*
         * dummy data 
         */
        var members = {"1" : [{
                "uuid": "member_b@ask-cs.com",
                "userName": "member_b@ask-cs.com",
                "password": null,
                "firstName": "B",
                "lastName": "Member",
                "phone": null,
                "states": [
                    {
                        "uuid": 0,
                        "name": "emotion",
                        "value": "happy",
                        "share": true
                    },
                    {
                        "uuid": 0,
                        "name": "availability",
                        "value": "false",
                        "share": true
                    },
                    {
                        "uuid": 0,
                        "name": "location",
                        "value": "home",
                        "share": true
                    },
                    {
                        "uuid": 0,
                        "name": "activity",
                        "value": "exciting",
                        "share": true
                    },
                    {
                        "uuid": 0,
                        "name": "reachability",
                        "value": "no",
                        "share": true
                    }
                ],
                "avatarUuid": null,
                "imgURL": null,
                "teamUuids": '1',
                "role": null
            },
            {
                "uuid": "member_c@ask-cs.com",
                "userName": "member_c@ask-cs.com",
                "password": null,
                "firstName": "C",
                "lastName": "Member",
                "phone": null,
                "states": [
                    {
                        "uuid": 0,
                        "name": "emotion",
                        "value": "happy",
                        "share": true
                    },
                    {
                        "uuid": 0,
                        "name": "availability",
                        "value": "false",
                        "share": true
                    },
                    {
                        "uuid": 0,
                        "name": "location",
                        "value": "home",
                        "share": false
                    },
                    {
                        "uuid": 0,
                        "name": "activity",
                        "value": "exciting",
                        "share": true
                    },
                    {
                        "uuid": 0,
                        "name": "reachability",
                        "value": "no",
                        "share": false
                    }
                ],
                "avatarUuid": null,
                "imgURL": null,
                "teamUuids": '1',
                "role": null
            }]
        };
        
        var team = {name : 'team 1', uuid : '1'};
        
        var teams = [{name : 'team 1', uuid : '1'},
                     {name : 'team 2', uuid : '2'},
                     {name : 'team 3', uuid : '3'}];
        
        $scope.team = team;
        $scope.members = members;
        $scope.teams = teams;
        data.members = members;        
        
        /**
         * Self this
         */
        var self = this,
        params = $location.search();


        /**
         * Init search query
         */
        $scope.search = {
            query: ''
        };


        /**
         * Reset selection
         */
        $scope.selection = {};


        /**
         * Set groups
         */
        $scope.data = data;


        /**
         * Grab and set roles for view
         */
        $scope.roles = $rootScope.config.roles;

        

        var uuid, view;

        /**
         * If no params or hashes given in url
         */
//        if (!params.uuid && !$location.hash())
//        {
//            uuid = data.groups[0].uuid;
//            view = 'view';
//  
//            $location.search({uuid: data.groups[0].uuid}).hash('view');
//        }
//        else
//        {
//            uuid = params.uuid;
//            view = $location.hash();
//        }


        /**
         * Set Team View
         */
          $scope.views = { 
              team : true,
              newTeam : false,
              newMember : false
          }
          

        /**
         * Set view
         */
//        setView(view);
        

        /**
         * Set given group for view
         */
        $scope.setTeamView = function (id)
        {
            
            
              
//            switch(id){
//                case 'team':
//                    $scope.views.team = true;
//                    break;
//                case 'newTeam':
//                    $scope.views.newTeam = true;
//                    break;
//                case 'newMember':
//                    $scope.views.newMember = true;
//                    break;
//            }
//            angular.forEach(data.groups, function (group, index)
//            {
//                if (group.uuid == id) $scope.group = group;
//            });
//
//            $scope.members = data.members[id];
//
//            $scope.current = id;
//
//            wisher(id);
        }

        /**
         * Selection toggler
         */
        $scope.toggleSelection = function (group, master)
        {
            var flag = (master) ? true : false,
                    members = angular.fromJson(Storage.get(group.uuid));

            angular.forEach(members, function (member, index)
            {
                $scope.selection[member.uuid] = flag;
            });
        };

    }
]);