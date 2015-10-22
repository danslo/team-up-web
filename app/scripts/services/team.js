define(['services/services', 'config'],
  function (services, config)
  {
    'use strict';

    services.factory('Team',
      function ($rootScope,
                $location,
                $q,
                Store,
                TeamUp,
                Permission,
                Teams,
                CurrentSelection,
                Profile)
      {
        // constructor \\
        var teamService = function ()
        {
        };

        // public methods \\
        (function ()
        {
          /**
           * Update a single team in the list
           * @param oldEditedTeam The team before the update
           * @param newEditedTeam The team after the update
           */
          this.updateList = function (oldEditedTeam, newEditedTeam)
          {
            var index = _.findIndex(this.list, {uuid: oldEditedTeam.uuid});

            if (this.list.length)
            {
              this.list[index] = newEditedTeam;
            }
          };

          /**
           * Get the list of teams
           * @returns {*}
           */
          this.getList = function ()
          {
            return this.list;
          };

          /**
           * Remove a team from the list
           * @param currentTeam
           */
          this.removeFromList = function (teamId)
          {
            var index = _.findIndex(this.list, {uuid: teamId});

            if (index >= 0)
            {
              this.list.splice(index, 1);
              Store('app').save('teams', this.list);
              this.setCurrent(this.list[0].uuid);
            }
          };

          /**
           * Set the current team
           * @param teamId
           */
          this.setCurrent = function (teamId)
          {
            CurrentSelection.local = teamId;
            this.current.teamId = teamId;
          };

          /**
           * Get the current team
           * @returns {*}
           */
          this.getCurrent = function ()
          {
            return this.current;
          };

          /**
           * Create a new team
           * @param team the data of the new team, (Only a name)
           * @returns {*}
           */
          this.create = function (team)
          {
            var self = this;
            if (!team)
            {
              $rootScope.notifier.error($rootScope.ui.teamup.teamNamePrompt1);
              return;
            }
            $rootScope.statusBar.display($rootScope.ui.teamup.saveTeam);

            TeamUp._('teamAdd',
              {id: $rootScope.app.resources.uuid},
              team)
              .then(function (newTeam)
              {
                self.list.push(newTeam);
                Store('app').save('teams', self.list);
                return Teams.getAll();
              })
              .then(function (teams)
              {
                //The last added team is the current one
                self.setCurrent(self.list[self.list.length - 1].uuid);
                $location.path('team/members');
              });
          };

          /**
           * Get a single team by id
           * @param teamId The id of the team
           * @returns {*} A promise with the members of the team
           */
          this.read = function (teamId)
          {
            $rootScope.statusBar.display($rootScope.ui.login.loading_Members);

            var _teamId = teamId || this.getCurrent();

            this.setCurrent(_teamId);

            return Teams.getSingle(_teamId)
              .then(function (members)
              {
                $location.search('teamId', _teamId);
                $rootScope.statusBar.off();
                return members;
              });
          };

          /**
           * Update the current team
           * @param team
           * @returns {*}
           */
          this.update = function (team)
          {
            var self = this;

            if (!team.name)
            {
              $rootScope.notifier.error($rootScope.ui.teamup.teamNamePrompt1);
              return;
            }

            $rootScope.statusBar.display($rootScope.ui.teamup.saveTeam)

            return TeamUp._('teamUpdate', {second: team.uuid}, team)
              .then(function (result)
              {
                self.updateList(team, result);
                return result.error && result || Teams.getAll();
              })
              .then(function (teams)
              {
                if (!teams.error)
                {
                  $rootScope.statusBar.off();
                  $rootScope.notifier.success($rootScope.ui.teamup.dataChanged);
                  return teams;
                }
              });
          };

          this.delete = function (teamId)
          {
            var self = this,
              deferred = $q.defer();

            angular.element('#confirmTeamModal').modal('hide');
            $rootScope.statusBar.display($rootScope.ui.teamup.deletingTeam);

            TeamUp._('teamDelete', {second: teamId})
              .then(function (teamDelete)
              {
                self.removeFromList(teamId);
                return teamDelete.error && teamDelete || Teams.getAll();
              })
              .then(function (teams)
              {
                if (!teams.error)
                {
                  deferred.resolve(self.getCurrent());
                  $rootScope.notifier.success($rootScope.ui.teamup.dataChanged);
                  $rootScope.statusBar.off();
                }
              });

            return deferred.promise;
          };

          /**
           * Add a member to a team
           * teamOption 1: Removes member from all his
           *  teams before adding to the current selected team
           * teamOption 2: Add member to the current selected team
           * @param member member the userobject
           * @param teamOption could be 1 or 2 replace or add
           */
          this.addMember = function (member, teamOption)
          {
            var self = this;
            var add = function (memberId, teamId)
              {
                TeamUp._(
                  'teamMemberAdd',
                  {second: teamId},
                  {ids: [memberId]}
                ).then(function ()
                  {
                    return Profile.fetchUserData(memberId);
                  })
                  .then(function ()
                  {
                    $location.path('team/members');
                  });
              };

            angular.element('#confirmMemberAddModal').modal('hide');
            $rootScope.statusBar.display($rootScope.ui.teamup.savingMember);

            (teamOption == 2)
              ? add(member.uuid, self.current.teamId)
              : Teams.removeAll(member)
                  .then(function (result)
                  {
                    add(member.uuid, self.current.teamId);
                  });
          };

          this.sync = function (teamId)
          {
            return TeamUp._(
              'teamSync',
              {second: teamId}
            ).then(function(sync)
            {
              var notifier = $rootScope.notifier;
              (sync && sync.isSyncing)
                ? notifier.success('De teaminformatie wordt nu gesynchroniseerd.')
                : notifier.error('Het synchroniseren van teaminformatie is mislukt.');
              return sync;
            });
          };

          /**
           * Initialize the current team and list of all teams
           * @param teamId
           */
          this.init = function (teamId)
          {
            var _teamId = teamId || CurrentSelection.getTeamId();

            this.list = Store('app').get('teams');
            this.current = {};
            this.setCurrent(_teamId);
          };
        }).call(teamService.prototype);

        return new teamService();
      });
  });