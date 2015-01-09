define(
  ['controllers/controllers', 'config'],
  function (controllers, config)
  {
    'use strict';

    controllers.controller(
      'profileCtrl',
      [
        '$rootScope',
        '$scope',
        '$q',
        '$location',
        '$window',
        '$route',
        'data',
        'Store',
        'Teams',
        'Dater',
        '$filter',
        'TeamUp',
        '$timeout',
        'MD5',
        'Profile',
        function ($rootScope, $scope, $q, $location, $window, $route, data, Store, Teams,
                  Dater, $filter, TeamUp, $timeout, MD5, Profile)
        {
          var profileResource = null;

            $rootScope.fixStyles();
          $rootScope.resetPhoneNumberChecker();

          $scope.self = this;

          $scope.roles = config.app.roles;
          $scope.mfuncs = config.app.mfunctions;

          $scope.data = data;

          // TODO: Still needed?
          $scope.noImgURL = config.app.noImgURL;

          $scope.profilemeta = data;

          $scope.profilemeta.birthDate = formatDate($scope.profilemeta.birthDate);

          //temp userdata will be saved after pressing save
          $scope.profile = angular.copy($scope.profilemeta);

          var getProfileResource = function(userId, flag)
          {
            Profile.get(userId, flag)
              .then(
              function(profileData)
              {
                console.log('profileData', profileData);
                profileResource = profileData;
                $scope.profile.pincode = (profileResource.pincode)
                  ? profileResource.pincode
                  : '';
              }
            );
          };

          getProfileResource($scope.profilemeta.uuid);

          $scope.currentRole = $scope.profilemeta.role;

          // TODO: Investigate whether they are in use!
          $scope.imgHost = config.app.host;
          $scope.ns = config.app.namespace;

          var teams = [];
          $scope.selectTeams = Store('app').get('teams');

          var teams = $scope.$root.getTeamsofMembers($scope.profilemeta.uuid);

          $scope.teams = teams;

          $scope.forms = {
            add: false,
            edit: false
          };

          setView($location.hash());

          function setView(hash)
          {
            $scope.views = {
              profile: false,
              edit: false,
              editImg: false,
              editPassword: false
            };

            $scope.views[hash] = true;

            $scope.views.user = (($rootScope.app.resources.uuid == $route.current.params.userId));
          }

          $scope.setViewTo = function (hash)
          {
            $scope.$watch(
              $location.hash(),
              function ()
              {
                $location.hash(hash);

                setView(hash);
              }
            );
          };

          var CHECK_PINCODE_DELAY = 250;

          $scope.pincodeExistsValidation = true;

          $scope.pincodeExists = function ()
          {
            if (!angular.isDefined($scope.profile.pincode) ||
              $scope.profile.pincode == '')
            {
              $scope.pincodeExistsValidation = false;
              $scope.pincodeExistsValidationMessage = $rootScope.ui.profile.pincodeNotValid;
            }
            else
            {
              if (angular.isDefined($scope.profile.pincode))
              {
                if ($scope.checkPincode)
                {
                  clearTimeout($scope.checkPincode);

                  $scope.checkPincode = null;
                }

                $scope.checkPincode = setTimeout(function ()
                {
                  $scope.checkPincode = null;

                  Profile.pincodeExists($scope.profilemeta.uuid, $scope.profile.pincode)
                    .then(
                    function (result)
                    {
                      $scope.pincodeExistsValidation = result;
                      $scope.pincodeExistsValidationMessage = $rootScope.ui.profile.pincodeInUse;
                    }
                  );
                }, CHECK_PINCODE_DELAY);
              }
            }
          };

          $scope.checkPincode = null;
          // Save a profile
          $scope.save = function (resources)
          {
            //check pincode
            if (!angular.isDefined($scope.profile.pincode) ||
              $scope.profile.pincode == '' || !$scope.pincodeExistsValidation)
            {
              $rootScope.notifier.error($rootScope.ui.profile.pincodeCorrect);

              $rootScope.statusBar.off();

              return false;
            }

            if (!$scope.pincodeExistsValidation)
            {
              $rootScope.notifier.error($rootScope.ui.profile.pincodeInUse);

              $rootScope.statusBar.off();

              return false;
            }

            // let user know that user need to re-relogin if the login-user's role is changed.
            if ($scope.currentRole != resources.role && $rootScope.app.resources.uuid == resources.uuid)
            {
              if (!confirm($rootScope.ui.profile.roleChangePrompt))
              {
                return;
              }
            }

            // check if the member is belong to any team, warn user to put his/herself to a team
            if (resources.teamUuids == null || typeof resources.teamUuids[0] == 'undefined')
            {
              resources.teamUuids = [];

              if ($scope.teams.length == 0)
              {
                //resources.teamUuids.push($scope.selectTeams[0].uuid);
                resources.teamUuids.push(sessionStorage.getItem(resources.uuid + '_team'));
              }
              else
              {
                resources.teamUuids.push($scope.teams[0].uuid);
              }
              if (resources.teamUuids[0] == null)
              {
                $rootScope.notifier.error($rootScope.ui.profile.specifyTeam);
                return;
              }
            }

            if (_.isUndefined(resources.email) || resources.email == false)
            {
              $rootScope.notifier.error($rootScope.ui.validation.email.notValid);
              return;
            }

            if ($rootScope.phoneNumberParsed.result == false)
            {
              $rootScope.notifier.error($rootScope.ui.validation.phone.notValid);

              return;
            }
            else if ($rootScope.phoneNumberParsed.result == true)
            {
              resources.phone = $rootScope.phoneNumberParsed.format;
            }

            $rootScope.statusBar.display($rootScope.ui.profile.saveProfile);

            // deal with birthday
            try
            {
              resources.birthDate = Dater.convert.absolute(resources.birthDate, 0);
            }
            catch (error)
            {
              console.log(error);
              $rootScope.notifier.error($rootScope.ui.teamup.birthdayError);

              return;
            }

            //add pincode to profile resource
            profileResource.pincode = resources.pincode;

            delete resources.birthday;
            delete resources.fullName;
            //delete resources.pincode
            delete resources.pincode;

            //save profileresource
            Profile.save($route.current.params.userId, profileResource)
              .then(
              function(result)
              {
                if (result.error)
                {
                  $rootScope.notifier.error($rootScope.ui.errors.profile.save);
                  console.warn('error ->', result);
                }
                else
                {
                  saveProfile(resources);
                }
              }
            );
          };

          var saveProfile = function(resources)
          {
            TeamUp._(
              'profileSave',
              {
                second: resources.teamUuids[0],
                fourth: resources.uuid
              },
              resources
            ).then(
              function (result)
              {
                if (result.error)
                {
                  $rootScope.notifier.error('Error with saving profile information.');
                  console.warn('error ->', result);
                }
                else
                {
                  $rootScope.statusBar.display($rootScope.ui.profile.refreshing);

                  TeamUp._(
                    'profileGet',
                    {
                      third: $route.current.params.userId
                    },
                    null,
                    function (resources)
                    {
                      if ($route.current.params.userId == $rootScope.app.resources.uuid)
                      {
                        $rootScope.app.resources = result;

                        Store('app').save('resources', resources);
                      }
                    }
                  ).then(
                    function (data)
                    {
                      if (data.error)
                      {
                        $rootScope.notifier.error('Error with getting profile data.');
                        console.warn('error ->', data);
                      }
                      else
                      {
                        $rootScope.notifier.success($rootScope.ui.profile.dataChanged);
                        $rootScope.resetPhoneNumberChecker();

                        $scope.data = data;
                        $scope.data.birthDate = formatDate($scope.data.birthDate);

                        $scope.profile = angular.copy($scope.data);
                        getProfileResource(
                          $route.current.params.userId,
                          ($route.current.params.userId == $rootScope.app.resources.uuid)
                        );

                        $rootScope.statusBar.off();
                        $scope.setViewTo('profile');

                        if ($rootScope.app.resources.uuid == $route.current.params.userId)
                        {
                          $rootScope.app.resources.firstName = $scope.profile.firstName;
                          $rootScope.app.resources.lastName = $scope.profile.lastName;

                          // will logout if the role is changed for the user him/her-self.
                          if ($scope.currentRole != resources.role)
                          {
                            $rootScope.nav("logout");
                          }
                        }

                        // refresh the teams in the background
                        angular.forEach
                        (
                          resources.teamUuids, function (teamId)
                          {
                            // FIXME: Message is not absent in localization file so turned off
                            // $rootScope.statusBar.display($rootScope.ui.profile.refreshTeam);

                            Teams.query(
                              false,
                              {uuid: teamId}
                            ).then(
                              function ()
                              {
                                $rootScope.statusBar.off()
                              }
                            );
                          }
                        );
                      }
                    }
                  );
                }
              }
            );
          }

          function formatDate(date)
          {
            return moment(date).format('DD-MM-YYYY');
          }

          $scope.editProfile = function ()
          {
            setView('edit');
          };

          $scope.editPassword = function ()
          {
            setView('editPassword');
          }

          // Change an avatar
          $scope.editImg = function ()
          {
            $scope.uploadURL = $scope.imgHost + $scope.ns + "/team/member/" + $route.current.params.userId + "/photo?square=true";
            $scope.setViewTo('editImg');
          };

          $scope.confirmDeleteProfile = function ()
          {
            $timeout(
              function ()
              {
                angular.element('#confirmProfileModal').modal('show');
              }
            );
          };

          $scope.savePassword = function (resources)
          {
            //copy data so the user can't see real-life changes causing by two way binding
            var formData = angular.copy(resources);

            if (!formData.oldpass || !formData.newpass || !formData.newpassrepeat)
            {
              $rootScope.notifier.error($rootScope.ui.profile.pleaseFill);
              return;
            }
            else if (formData.newpass != null && formData.newpass != formData.newpassrepeat)
            {
              $rootScope.notifier.error($rootScope.ui.profile.passNotMatch);
              return;
            }
            else if (MD5(formData.oldpass) !== $scope.profile.passwordHash)
            {
              $rootScope.notifier.error($rootScope.ui.profile.currentPassWrong);
              return;
            }
            else if (formData.newpass != null)
            {
              $scope.data.passwordHash = MD5(formData.newpass);
              delete formData.oldpass;
              delete formData.newpass;
              delete formData.newpassrepeat;
            }

            $scope.save($scope.data);
          }

          // Remove a profile completely
          $scope.deleteProfile = function ()
          {
            angular.element('#confirmProfileModal').modal('hide');

            $rootScope.statusBar.display($rootScope.ui.teamup.deletingMember);

            var currentTeam;

            angular.forEach($scope.teams, function (team)
            {

              TeamUp._(
                'teamMemberDelete',
                {second: team.uuid},
                {ids: [$scope.profilemeta.uuid]}
              ).then(
                function (result)
                {
                  $rootScope.notifier.success($rootScope.ui.teamup.dataChanged);

                  angular.forEach($scope.profilemeta.teamUuids, function (teamId, i)
                  {
                    if (team.uuid == teamId)
                    {
                      $rootScope.statusBar.display($rootScope.ui.teamup.refreshing);

                      Teams.query(
                        false,
                        {'uuid': teamId}
                      ).then(
                        function ()
                        {
                          $rootScope.statusBar.off()
                        }
                      );

                      $scope.profilemeta.teamUuids.splice(i, 1);
                      $scope.teams.splice(i, 1);
                      sessionStorage.removeItem(data.uuid + '_team');
                      Teams.updateMembersLocal();
                    }
                  });
                }, function (error)
                {
                  console.log(error)
                }
              );

              //update list of members
              TeamUp._('teamMemberFree')
                .then
              (
                function (result)
                {
                  Store('app').save('members', result);

                  $rootScope.statusBar.off();
                },
                function (error)
                {
                  console.log(error)
                }
              );
            });
          };
        }
      ]
    );
  }
);
