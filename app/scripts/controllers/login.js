define(
  ['controllers/controllers', 'config'],
  function (controllers, config)
  {
    'use strict';

    controllers.controller(
      'login',
      [
        '$rootScope',
        '$location',
        '$q',
        '$scope',
        'Settings',
        'Session',
        'Teams',
        'Clients',
        'Store',
        '$routeParams',
        'TeamUp',
        'Dater',
        '$filter',
        'MD5',
        'Permission',
        function ($rootScope, $location, $q, $scope, Settings, Session, Teams, Clients, Store, $routeParams, TeamUp, Dater, $filter, MD5,
                  Permission)
        {

          var setBackgroundColor = function ()
          {
            angular.element('body')
              .css(
              {
                'backgroundColor': '#1dc8b6',
                'backgroundImage': 'none'
              }
            );
          };

          try
          {
            localStorage.test = 'test';
          }
          catch (e)
          {
            var urlPrivateMode = 'http://support.apple.com/nl-nl/ht6366',
              template = '<p>' + $rootScope.ui.teamup.checkLocalStorage + '</p>';

            template += "<a href='" + urlPrivateMode + "'>";
            template += urlPrivateMode + '</a>';

            setBackgroundColor();

            angular.element('#login')
              .html('')
              .append(template);

            return false;
          }

          // TODO: Soon not needed!
          Dater.registerPeriods();


          if ($location.path() == '/logout')
          {
            setBackgroundColor();
          }

          if ($routeParams.uuid && $routeParams.key)
          {
            $scope.views = {changePass: true};

            $scope.changepass = {
              uuid: $routeParams.uuid,
              key: $routeParams.key
            };
          }
          else
          {
            $scope.views = {
              login: true,
              forgot: false
            };
          }

          $scope.alert = {
            login: {
              display: false,
              type: '',
              message: ''
            },
            forgot: {
              display: false,
              type: '',
              message: ''
            }
          };

          if (!Store('app').get('app'))
          {
            Store('app').save('app', '{}');
          }
          else
          {
            var periods = Store('app').get('periods'),
              loginData = Store('app').get('loginData');

            Store('app').nuke();
            Store('app').save('periods', periods);
            Store('app').save('loginData', loginData);
          }

          angular.element('.navbar').hide();
          angular.element('#footer').hide();
          angular.element('#watermark').hide();
          angular.element('body').css({'backgroundColor': '#1dc8b6'});

          var localLoginData = Store('app').get('loginData');

          //Check if there is loginData local
          if (localLoginData)
          {
            //if there is a username, show it
            $scope.loginData = {};
            $scope.loginData.username = localLoginData.username;

            //if there is a local encrypted password, show a random string
            //and select the remember login
            if (localLoginData.password)
            {
              $scope.loginData.password = 1234;
              $scope.loginData.remember = true;
            }
          }

          $scope.login = function ()
          {
            angular.element('#alertDiv').hide();

            if (!$scope.loginData || !$scope.loginData.username || !$scope.loginData.password)
            {
              $scope.alert = {
                login: {
                  display: true,
                  type: 'alert-error',
                  message: $rootScope.ui.login.alert_fillfiled
                }
              };

              angular.element('#login button[type=submit]')
                .text($rootScope.ui.login.button_login)
                .removeAttr('disabled');

              return false;
            }

            angular.element('#login button[type=submit]')
              .text($rootScope.ui.login.button_loggingIn)
              .attr('disabled', 'disabled');

            //Checks if there is already a password, otherwise encrypt the given password
            var password = ($scope.loginData.password == '1234' && localLoginData.password)
              ? localLoginData.password
              : MD5($scope.loginData.password);

            var newLoginData = {
              username: $scope.loginData.username
            };

            //Check if the user want to save his password and add it to the local storage
            if ($scope.loginData.remember == true)
            {
              newLoginData.password = password;
            }

            Store('app').save('loginData', newLoginData);

            auth($scope.loginData.username, password);
          };

          var auth = function (uuid, pass)
          {
            Settings
              .initBackEnd(config.app.host, uuid, pass)
              .then(
              function (result)
              {
                if (result.valid === false && result.errorMessage)
                {
                  $scope.alert = {
                    login: {
                      display: true,
                      type: 'alert-error',
                      message: result.errorMessage
                    }
                  };
                  angular.element('#login button[type=submit]')
                    .text($rootScope.ui.login.button_login)
                    .removeAttr('disabled');
                  return false;
                }
                else if (result.valid === true)
                {
                  Session.set(result['X-SESSION_ID']);
                  preLoader();
                }
              });
          };

          //Check if there is a password locally and autologin
          if (localLoginData.password)
          {
            $scope.login();
          }

          // TODO: Move this to somewhere later on!
          function queryMembersNotInTeams()
          {
            TeamUp._('teamMemberFree').then(
              function (result)
              {
                Store('app').save('members', result)
              }
            );
          }

          // Query the tasks for login user and all other unsigned task in login user's team
          function queryTasks(teams)
          {
            // query my tasks
            TeamUp._("taskMineQuery").then(
              function (result)
              {
                Store('app').save('myTasks', result)
              }
            );

            // query unassigned tasks from each team
            var allTasks = [];

            angular.forEach(
              teams,
              function (team_obj)
              {
                TeamUp._(
                  "taskByTeam",
                  {fourth: team_obj.uuid}
                ).then(
                  function (result)
                  {
                    angular.forEach(
                      result,
                      function (taskObj)
                      {
                        var foundTask = $filter('getByUuid')(allTasks, taskObj.uuid);

                        if (foundTask == null)
                        {
                          allTasks.push(taskObj);
                        }
                      }
                    );

                    Store('app').save('allTasks', allTasks);
                  }
                );
              }
            );
          }

          /**
           * add teams to the logged user localStorage
           */
          function updateLoggedUserTeams()
          {
            var userResources = Store('app').get('resources'),
              teamsUser = _.pluck($scope.$root.getTeamsofMembers(userResources.uuid), 'uuid');

            userResources.teamUuids = teamsUser;

            $rootScope.app.resources = userResources;
            Store('app').save('resources', userResources);
          }

          function enhanceTasks()
          {
            var taskGroups = ['myTasks', 'allTasks'];

            angular.forEach(
              taskGroups,
              function (label)
              {
                var group = Store('app').get(label);

                angular.forEach(
                  group,
                  function (task)
                  {
                    if (typeof(task) === 'object')
                    {
                      var client = $rootScope.getClientByID(task.relatedClientUuid);

                      if (client != null)
                      {
                        task.relatedClientName = client.firstName + ' ' + client.lastName;
                      }
                    }
                  }
                );

                Store('app').save(label, group);
              }
            );
          }


          //TODO compare permission names with routenames
          function getPermissionProfile()
          {
            Permission.getDefaultProfile()
              .then(function (permissionProfile)
              {
                $rootScope.app.domainPermission = permissionProfile;
                console.log('permissionProfile', permissionProfile);
              });
          }

          var preLoader = function ()
          {
            angular.element('#login').hide();

            angular.element('#download').hide();

            angular.element('#preloader').show();

            progress(17, $rootScope.ui.login.loading_User);

            TeamUp._('user')
              .then(
              function (resources)
              {
                if (resources.error)
                {
                  console.warn('error ->', resources);
                }
                else
                {
                  $rootScope.app.resources = resources;

                  Store('app').save('resources', $rootScope.app.resources);

                  progress(34, $rootScope.ui.login.loading_teams);

                  Teams.query(true, {})
                    .then(
                    function (teams)
                    {
                      queryTasks(teams);

                      if (teams.error)
                      {
                        console.warn('error ->', teams);
                      }

                      progress(51, $rootScope.ui.login.loading_teams);

                      Teams.queryClientGroups(teams)
                        .then(
                        function ()
                        {
                          console.log('teams', teams);

                          progress(68, $rootScope.ui.login.loading_clientGroups);

                          TeamUp._('clientsQuery')
                            .then(
                            function (allClients)
                            {
                              console.log('allClients', allClients);
                              // Save all clients into the localStorage
                              Store('app').save('clients', allClients);

                              Clients.query(false, {})
                                .then(
                                function ()
                                {
                                  // TODO: Blend it in the modal!
                                  enhanceTasks();
                                  progress(85, $rootScope.ui.login.loading_Members);

                                  Teams.query()
                                    .then(
                                    function (teamsData)
                                    {
                                      progress(100, $rootScope.ui.login.loading_everything);
                                      console.log('teamsData', teamsData);

                                      trackGa('send', 'event', 'Login', 'User login', 'team uuid ' + $rootScope.app.resources.teamUuids[0]);

                                      //update the avatar once, because the resources were not set when the directive was loaded
                                      $rootScope.showChangedAvatar('team', $rootScope.app.resources.uuid);

                                      //TODO for testpurposes only
                                      //Permission.saveProfile();

                                      Permission.getAccess();

                                      setTimeout(
                                        function ()
                                        {
                                          angular.element('.navbar').show();
                                          angular.element('body').addClass('background');

                                          if (!$rootScope.browser.mobile)
                                          {
                                            angular.element('#footer').show();
                                          }
                                        }, 100);
                                    }
                                  );
                                }
                              );
                            }
                          );
                        }
                      );
                    }
                  );
                }
              }
            );
          };

          var progress = function (ratio, message)
          {
            angular.element('#preloader .progress .bar').css({width: ratio + '%'});
            angular.element('#preloader span').text(message);
          };

          if (localStorage.hasOwnProperty('sessionTimeout'))
          {
            localStorage.removeItem('sessionTimeout');

            $scope.alert = {
              login: {
                display: true,
                type: 'alert-error',
                message: $rootScope.ui.teamup.sessionTimeout
              }
            };
          }
        }
      ]);
  }
);