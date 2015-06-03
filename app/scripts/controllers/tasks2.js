define(
  ['controllers/controllers'],
  function (controllers)
  {
    'use strict';

    controllers.controller(
      'tasks2Ctrl',
        function ($rootScope, $scope, $location, $timeout, $filter, Store, TeamUp, Task,
                  Teams, Clients, Dater)
        {
          $rootScope.fixStyles();

          var view = $location.hash(),
            teamsLocal = Teams.queryLocal(),
            clientLocal = Clients.queryLocal(),
            teamClientLocal = Teams.queryLocalClientGroup(teamsLocal.teams);

          function resetViews()
          {
            $scope.tasks = {
              mine: {
                loading: true,
                list: []
              },
              all: {
                loading: true,
                list: []
              }
            };

            $scope.views = {
              myTasks: false,
              allTasks: false,
              newTask: false,
              editTask: false,
              upload: false
            };

            $scope.showAllTasks = false;

            $scope.showOnlyAvailable = true;

            $scope.reversed = true;

            $scope.order = 'plannedStartVisitTime';

            // $scope.filtered = { assignedTeamMemberUuid: null };
          }

          var setView = function (hash)
          {
            resetViews();

            $scope.tasks = ($scope.tasks) ? $scope.tasks : {};

            $scope.views[hash] = true;

            $location.hash(hash);

            switch (hash)
            {
              case 'myTasks':
                var myTasks = Store('app').get('myTasks2');

                var delay = 0;

                if (myTasks.on || myTasks.off)
                {
                  $scope.tasks.mine = {
                    loading: false,
                    list: myTasks,
                    archieve: (myTasks.off.length > 0)
                  };

                  delay = 250;
                }


                $timeout(function ()
                {
                  queryMine()
                }, delay);
                break;

              case 'allTasks':
                var allTasks = Store('app').get('allTasks2');

                if (allTasks.on || allTasks.off)
                {
                  $scope.tasks.all = {
                    loading: false,
                    list: allTasks.on
                  };
                }

                $timeout(function ()
                {
                  queryAll()
                }, 250);
                break;
              case 'editTask':
                break;
              case 'newTask':
                break;
              case 'upload':
                break;
            }
          };

          $scope.setViewTo = function (hash)
          {
            $scope.$watch(
              hash,
              function ()
              {
                $location.hash(hash);

                setView(hash);
              }
            );
          };

          setView(view);

          $scope.teams = teamsLocal.teams;

          $scope.task = $scope.task || {
            team: $scope.currentTeam
          };

          /**
           * Mody a task and prepare the form with the right values
           * @param task
           */
          $scope.modifyTask = function (task)
          {
            $scope.changeTeam(task.assignedTeamUuid);

            $scope.task = {
              uuid: task.uuid,
              team: task.assignedTeamUuid,
              member: task.assignedTeamMemberUuid,
              client: task.relatedClientUuid,
              start: {
                date: new Date(task.plannedStartVisitTime),
                time: task.plannedStartVisitTime
              },
              end: {
                date: new Date(task.plannedEndVisitTime),
                time: task.plannedEndVisitTime
              },
              description: task.description
            };

            resetViews();

            $scope.views.editTask = true;
          };

          function queryMine(only, callback)
          {
            Task.queryMine()
              .then(
              function (tasks)
              {
                console.log('tasks.off', tasks);

                $scope.tasks.mine = {
                  loading: false,
                  list: (angular.isDefined($scope.showAllTasks) && $scope.showAllTasks)
                      ? tasks['on'].concat(tasks['off'])
                      : tasks['on'],
                  archieve: (tasks.off.length > 0)
                };

                //console.log('$scope.showAllTasks', $scope.showAllTasks);
                //console.log('$scope.tasks.mine.archieve', $scope.tasks.mine.archieve);
                //
                //if((angular.isDefined($scope.showAllTasks) && $scope.showAllTasks)
                //  && $scope.tasks.mine.archieve)
                //{
                //  $scope.tasks.mine.list.concat(tasks.off);
                //  console.log('list ', $scope.tasks.mine.list);
                //}

                (callback && callback.call(this, tasks));
              }
            );

            if (!only)
            {
              queryAll();
            }
          }

          function queryAll(callback)
          {
            queryMine(true);

            Task.queryAll()
              .then(
              function (tasks)
              {
                $scope.tasks.all = {
                  loading: false,
                  list: (angular.isDefined($scope.showAllTasks) && $scope.showAllTasks)
                    ? tasks['on'].concat(tasks['off'])
                    : tasks['on'],
                  archieve: (tasks['off'].length > 0)
                };

                (callback && callback.call(this, tasks));
              }
            );
          }

          $scope.showTasks = function(toggle, taskHolder)
          {
            if(taskHolder == 'mine')
            {
              var myTasks = Store('app').get('myTasks2');
              $scope.tasks.mine.list = (toggle) ? myTasks.on.concat(myTasks.off) : myTasks.on;
            }
            else
            {
              var allTasks = Store('app').get('allTasks2');
              $scope.tasks.all.list = (toggle) ? allTasks['on'].concat(allTasks['off']) : allTasks['on'];
            }
          };

          //$scope.$watch(
          //  'showFinishedTasks',
          //  function (toggle)
          //  {
          //    var myTasks = Store('app').get('myTasks2');
          //
          //    $scope.tasks.mine.list = (toggle) ? myTasks.on.concat(myTasks.off) : myTasks.on;
          //  }
          //);
          //
          //$scope.$watch(
          //  'showAllTasks',
          //  function (toggle)
          //  {
          //    var allTasks = Store('app').get('allTasks2');
          //
          //    if (toggle)
          //    {
          //      $scope.tasks.all.list = allTasks['on'].concat(allTasks['off']);
          //    }
          //    else
          //    {
          //      $scope.tasks.all.list = allTasks.on;
          //    }
          //  }
          //);

          //date and time methods if a new task is creating
          if ($scope.views.newTask == true)
          {
            var currentStartTime = updateTime(new Date(), 15);
            var currentEndTime = updateTime(new Date(), 30);

            if (!$scope.task)
            {
              $scope.task = {};
              $scope.task.start = {};
              $scope.task.end = {};
            }
            $scope.task.start = {
              date: new Date(),
              time: currentStartTime
            };
            $scope.task.end = {
              date: new Date(),
              time: currentEndTime
            };
          }

          //TODO add following date methods to Dater
          function formatDateTime(date, dateFormat)
          {
            return $filter('date')(date, dateFormat);
          }

          function updateTime(date, minutes)
          {
            var roundMinutes = formatDateTime(date, 'm');
            roundMinutes = (roundMinutes % 15);

            return new Date(date.getTime() - (roundMinutes * 60000) + (minutes * 60000));
          }

          $scope.newTime = function (newTime)
          {
            $scope.task.end.time = updateTime(newTime, 15);
          };

          $scope.newDate = function (newDate)
          {
            $scope.task.end.date = newDate;
          };

          //$scope.$watch(function() {
          //  return $scope.task.start.date;
          //}, function(newDate) {
          //  $scope.task.end.date = newDate;
          //});

          //          $scope.$watch(
          //            'showOnlyAvailable',
          //            function (toggle)
          //            {
          //              console.log('coming in here?');
          //
          //              $scope.filtered = !$scope.filtered;
          //
          ////              if (toggle)
          ////              {
          ////                 = { assignedTeamMemberUuid: null };
          ////              }
          ////              else
          ////              {
          ////                $scope.filtered = { assignedTeamMemberUuid: null };
          ////              }
          //            }
          //          );

          //          $scope.filterFn = function (task)
          //          {
          //            return ($scope.showOnlyAvailable && task.assignedTeamMemberUuid != null) ?
          //                   true :
          //                   false;
          //          };

          $scope.openTask = function (task)
          {
            $scope.task = task;
            $scope.task.team = task.assignedTeamUuid;

            if (task.assignedTeamUuid)
            {
              task.assignedTeamFullName = $rootScope.getTeamName(task.assignedTeamUuid);
            }

            if (task.relatedClient.clientGroupUuid)
            {
              task.relatedClient.clientGroupName = $rootScope.getClientGroupName(task.relatedClient.clientGroupUuid);
            }

            var author = $rootScope.getTeamMemberById(task.authorUuid);
            $scope.author = author.firstName + ' ' + author.lastName;

            angular.element('#taskModal').modal('show');
          };

          //default filtering by status
          //$scope.ordered = '-status';

          $scope.orderBy = function (ordered)
          {
            $scope.ordered = ordered;

            $scope.reversed = !$scope.reversed;
          };

          function updateTask(task, only)
          {
            Task.update(task)
              .then(
              function (result)
              {
                if (result.error)
                {
                  $rootScope.notifier.error(
                    $rootScope.transError(
                      (result.error.data) ? result.error.data.result : result.error
                    )
                  );

                  task.assignedTeamMemberUuid = null;

                  return;
                }

                queryMine(only);
              }
            );
          }

          $scope.assignTask = function (task)
          {
            trackGa('send', 'event', 'Task-assign', $rootScope.app.resources.uuid, task.uuid);

            task.assignedTeamMemberUuid = $rootScope.app.resources.uuid;

            updateTask(task, true);

            setView('myTasks');
          };


          $scope.unAssignTask = function (task)
          {
            trackGa('send', 'event', 'Task-unassign', $rootScope.app.resources.uuid, task.uuid);

            task.assignedTeamMemberUuid = null;
            task.assignedTeamUuid = null;

            updateTask(task);
          };


          $scope._task = {};

          $scope.confirmDeleteTask = function (task)
          {
            $timeout(
              function ()
              {
                $scope._task = task;

                angular.element('#confirmTaskModal').modal('show');
              }
            );
          };

          // Remove a task
          $scope.deleteTask = function (task)
          {
            $scope._task = {};

            angular.element('#confirmTaskModal').modal('hide');

            TeamUp._(
              'taskDelete',
              {second: task.uuid},
              task
            ).then(
              function (result)
              {
                if (result.error)
                {
                  if (result.error.data)
                  {
                    $rootScope.notifier.error(result.error.data);
                  }
                  else
                  {
                    $rootScope.notifier.error(result.error);
                  }
                }
                else
                {
                  $rootScope.notifier.success($rootScope.ui.task.taskDeleted);
                  // $scope.reloadAndSaveTask(result.uuid, 'delete');

                  if(task.status == 3)
                  {
                    console.log('this tasks was archieved');
                  }

                  queryMine();
                }

              }
            );
          };

          $scope.members = teamsLocal.members[$scope.currentTeam];

          $scope.groups = [];
          $scope.clients = [];


          // Related to chain of drop-downs of teams and client groups
          $scope.teamAffectGroup = function ()
          {
            $scope.groups = [];

            angular.forEach(
              clientLocal.clientGroups,
              function (cg)
              {
                if ($scope.currentGroup == cg.id)
                {
                  $scope.groups.push(cg);
                }
              }
            );

            $scope.groupAffectClient($scope.currentGroup);
          };

          // Related to chain of dropd-owns of groups and clients
          $scope.groupAffectClient = function (groupId)
          {
            $scope.clients = clientLocal.clients[groupId];

            if (( $scope.currentClient == null || typeof $scope.currentClient == 'undefined' )
              && $scope.clients && $scope.clients.length > 0)
            {
              $scope.currentClient = $scope.clients[0].uuid;
            }
            else
            {
              $scope.currentClient = null;
            }

            if ($scope.task && $scope.task.client)
            {
              $scope.task.client = $scope.currentClient;
            }
          };

          if (typeof teamClientLocal[$scope.currentTeam] == 'undefined')
          {
            $scope.currentGroup = null;
          }
          else
          {
            $scope.currentGroup = teamClientLocal[$scope.currentTeam];
            $scope.teamAffectGroup();

            $scope.groupAffectClient($scope.currentGroup);
          }

          $scope.changeClientGroup = function (cGroupId)
          {
            $scope.groupAffectClient(cGroupId);
          };

          $scope.changeTeam = function (teamUuid)
          {
            $scope.members = teamsLocal.members[teamUuid];
            $scope.currentGroup = teamClientLocal[teamUuid];

            $scope.teamAffectGroup();

            // load team member's locations
          };
          //change team depends on the default team
          $scope.changeTeam($scope.currentTeam);

          Task.chains();


          /**
           * ******************************************************************************
           */


            // Validation of the task form
          $scope.validateTaskForm = function (task)
          {
            // fields should not be empty
            if (!task || !task.start || !task.end)
            {
              $rootScope.notifier.error($rootScope.ui.task.filltheTime);
              return false;
            }

            if (task.start.date == "" || task.start.time == "" || !task.start.time)
            {
              $rootScope.notifier.error($rootScope.ui.task.startTimeEmpty);
              return false;
            }

            if (task.end.date == "" || task.end.time == "" || !task.end.time)
            {
              $rootScope.notifier.error($rootScope.ui.task.endTimeEmpty);
              return false;
            }

            if (!$scope.taskForm.$valid)
            {
              $rootScope.notifier.error($rootScope.ui.task.taskFormValide);
              return;
            }

            $scope.task.startTime = ($rootScope.browser.mobile) ?
              new Date(task.start.date).getTime() :
              Dater.convert.absolute(formatDateTime(task.start.date, 'dd-MM-yyyy'), formatDateTime(task.start.time, 'HH:mm'), false);

            $scope.task.endTime = ($rootScope.browser.mobile) ?
              new Date(task.end.date).getTime() :
              Dater.convert.absolute(formatDateTime(task.end.date, 'dd-MM-yyyy'), formatDateTime(task.end.time, 'HH:mm'), false);

            // start time and end time should be in the future
            // end time should later than start time
            if ($scope.task.startTime <= Date.now().getTime() || $scope.task.endTime <= Date.now().getTime())
            {
              $rootScope.notifier.error($rootScope.ui.task.planTaskInFuture);
              return false;
            }

            if ($scope.task.startTime >= $scope.task.endTime)
            {
              $rootScope.notifier.error($rootScope.ui.task.startLaterThanEnd);
              return false;
            }

            if (!task.client || task.client == null)
            {
              $rootScope.notifier.error($rootScope.ui.task.specifyClient);
              return false;
            }

            // description should not be empty

            return true;
          };

          /**
           * Save a task, this could be creating or editing.
           * @param task Save the task values from the form
           */
          $scope.saveTask = function (task)
          {
            if (!$scope.validateTaskForm(task))
            {
              return;
            }

            var values = {
              uuid: (task.uuid) ? task.uuid : '',
              status: 2,
              plannedStartVisitTime: $scope.task.startTime,
              plannedEndVisitTime: $scope.task.endTime,
              relatedClientUuid: task.client,
              assignedTeamUuid: task.team,
              description: task.description,
              assignedTeamMemberUuid: task.member
            };

            if (! _.isEmpty(task.uuid))
            {
              editTask(values);
            }
            else
            {
              createTask(values);
            }
          };

          /**
           * Create a task
           * @param task
           */
          var createTask = function (task)
            {
              $rootScope.statusBar.display($rootScope.ui.task.creatingTask);

              TeamUp._(
                'taskAdd',
                null,
                task
              ).then(function (result)
                {
                  handleResultTask(result, task);
                });
            },
            editTask = function (task)//Edit a task
            {
              $rootScope.statusBar.display($rootScope.ui.task.editingTask);

              Task.update(task)
                .then(
                function (result)
                {
                  handleResultTask(result, task);
                }
              );

            },
            handleResultTask = function (result, task)//Handle result after saving the task
            {
              if (result.error)
              {
                if (result.error.data)
                {
                  $rootScope.notifier.error($rootScope.transError(result.error.data.result));
                }
                else
                {
                  $rootScope.notifier.error($rootScope.transError(result.error));
                }
                $rootScope.statusBar.off();
              }
              else
              {
                if (task.assignedTeamMemberUuid == $rootScope.app.resources.uuid)
                {
                  queryMine(
                    true,
                    function ()
                    {
                      setView('myTasks');

                      $rootScope.notifier.success($rootScope.ui.task.taskSaved);
                    }
                  );
                }
                else
                {
                  queryAll(
                    function ()
                    {
                      setView('allTasks');

                      $rootScope.notifier.success($rootScope.ui.task.taskSaved);
                    }
                  );
                }
                $rootScope.statusBar.off();
              }
            };


          // Create a new task
          //$scope.createTask = function (task)
          //{
          //  if (!$scope.validateTaskForm(task))
          //  {
          //    return;
          //  }
          //
          //  $rootScope.statusBar.display($rootScope.ui.task.creatingTask);
          //
          //  var values = {
          //    uuid: '',
          //    status: 2,
          //    plannedStartVisitTime: $scope.task.startTime,
          //    plannedEndVisitTime: $scope.task.endTime,
          //    relatedClientUuid: task.client,
          //    assignedTeamUuid: task.team,
          //    description: task.description,
          //    assignedTeamMemberUuid: task.member
          //  };
          //
          //  TeamUp._(
          //    'taskAdd',
          //    null,
          //    values
          //  ).then(function(result){
          //      handleResultTask(result, task)
          //  });
          //};
        }
    );
  }
);
