define(
  ['controllers/controllers'],
  function (controllers)
  {
    'use strict';

    controllers.controller(
      'order', [
        '$rootScope',
        '$scope',
        '$location',
        'Store',
        'Teams',
        'TeamUp',
        'CurrentSelection',
        function ($rootScope, $scope, $location, Store, Teams, TeamUp, CurrentSelection)
        {
          $rootScope.fixStyles();

          var teams = Store('app').get('teams'),
            teamsLocal = Teams.queryLocal(),
            view,
            tempOrder = [];

          teams.unshift();

          $scope.groups = teams;

          //default first team
          $scope.current = {
            group: CurrentSelection.getTeamId()
          };

          if (!$location.hash())
          {
            view = 'order';
          }
          else
          {
            view = $location.hash();
          }

          function resetViews()
          {
            $scope.views = {
              order: false
            };
          }

          var setView = function (hash)
          {
            resetViews();

            $scope.views[hash] = true;
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


          $scope.orderedMembers = [];
          $scope.orderType = '';

          var showOrder = function (orderArray)
          {
            var members = teamsLocal.members[$scope.current.group];
            var orderedMembers = [];

            _.each(members, function (member)
            {
              _.each(orderArray, function (uuid, key)
              {

                if (member.uuid === uuid)
                {
                  if (member.phone)
                  {
                    $rootScope.parsePhoneNumber(member.phone);

                    if ($rootScope.phoneNumberParsed.result === true)
                    {
                      member.phoneE164 = $rootScope.phoneNumberParsed.all.formatting.e164;
                    }
                  }

                  member.originalPosition = key;
                  orderedMembers[key] = member;
                }

              });
            });

            tempOrder = orderedMembers;
            $scope.orderedMembers = orderedMembers;
          };

          $scope.getOrder = function ()
          {
            var groupID = $scope.current.group;
            CurrentSelection.local = groupID;

            if (groupID !== '')
            {
              TeamUp._('callOrderGet', {second: groupID})
                .then(function (result)
                {
                  $scope.orderType = result.sortBy;

                  showOrder(result.order);
                });
            }
          };

          $scope.getOrder();

          //$scope.sortableOptions = {
          //  stop: function (e, ui)
          //  {
          //    tempOrder = $scope.orderedMembers;
          //  },
          //  cancel: ".unsortable",
          //  items: "tr:not(.unsortable)"
          //};

          $scope.sortableOptions = {
            animation: 150,
            scroll:false,
            draggable: 'tr'
          };

          $scope.confirmOrder = function ()
          {
            var groupID = $scope.current.group;
            var orderArray = [];
            var payload = {};
            $rootScope.statusBar.display($rootScope.ui.teamup.saveTeam);

            payload.sortBy = $scope.orderType;

            _.each(tempOrder, function (member, key)
            {
              orderArray[key] = member.uuid;
            });

            payload.order = orderArray;

            TeamUp._('callOrderSave',
              {second: groupID}, payload)
              .then
              (
                function (result)
                {
                  $rootScope.notifier.success("Volgorde opgeslagen");
                  $rootScope.statusBar.off();
                  $scope.orderType = result.sortBy;
                  showOrder(result.order);
                }
              );

          };

        }
      ]
    );
  }
);