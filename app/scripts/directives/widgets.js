define(
  ['directives/directives'],
  function (directives)
  {
    'use strict';

    // Chosen multiple selection
    directives.directive(
      'chosen',
      function ()
      {
        var linker = function (scope, element)
        {
          scope.$watch(
            'receviersList',
            function () { element.trigger('liszt:updated') }
          );

          scope.$watch(
            'message.receviers',
            function () { angular.element(element[0]).trigger('liszt:updated') }
          );

          element.chosen();
        };

        return {
          restrict: 'A',
          link: linker
        };
      }
    );

    // Upload images
    directives.directive(
      'uploader', [
        function ()
        {
          return {
            restrict: 'E',
            scope: {
              action: '@'
            },
            controller: [
              '$scope', '$rootScope', 'Session' ,
              function ($scope, $rootScope, Session)
              {
                $scope.progress = 0 + '%';
                $scope.avatar = '';
                $scope.uploadLabel = $rootScope.ui.profile.click2upload;

                var session = Session.get();

                if (session)
                {
                  $scope.sessionId = session;
                }

                $scope.sendFile = function (el)
                {
                  var $form = angular.element(el).parents('form');

                  if (angular.element(el).val() == '')
                  {
                    return false;
                  }

                  console.log('angular.element(el).val()', angular.element(el).val());

                  $form.attr('action', $scope.action);

                  $scope.$apply(
                    function () { $scope.progress = 0 + '%' }
                  );

                  $form.ajaxSubmit(
                    {
                      type: 'POST',
                      headers: {
                        'X-SESSION_ID': $scope.sessionId
                      },
                      uploadProgress: function (event, position, total, percentComplete)
                      {
                        console.log('event', event);

                        $scope.$apply(
                          function ()
                          {
                            $scope.progress = percentComplete + '%';
                          }
                        );
                      },
                      error: function (event, statusText, responseText, form)
                      {
                        //$form.removeAttr('action');
                      },
                      success: function (responseText, statusText, xhr, form)
                      {
                        var ar = angular.element(el).val().split('\\'),
                            filename = ar[ar.length - 1];

                        //$form.removeAttr('action');

                        $scope.$apply(
                          function ()
                          {
                            $scope.avatar = filename;
                            var avatarType = '';
                            var avatarTagStyle = $('.roundedPicLarge').attr('style');
                            var size = 0,
                              id,
                              type,
                              message;

                            try
                            {
                              size = parseInt(avatarTagStyle.split('?')[1].split('&')[0].split('=')[1], 10);
                            }
                            catch (e)
                            {
                              console.log(e);
                            }

                            if ($scope.$parent.view.clientId)
                            {
                              id = $scope.$parent.view.clientId;
                              message = $rootScope.ui.profile.profileImgSuccessfullyUploaded;
                              type = 'client';

                            }
                            else if ($scope.$parent.view.uuid)
                            {
                              id = $scope.$parent.view.uuid;
                              message = $rootScope.ui.profile.profileImgSuccessfullyUploaded;
                              type = 'team';
                            }

                            $scope.$parent.$root.avatarChange(id);
                            $rootScope.notifier.success(message);
                            $rootScope.showChangedAvatar(type, id);

                            var newSize = parseInt(size, 10) + $scope.$parent.$root.getAvatarChangeTimes(id);
                            var newStyle = avatarTagStyle.replace("width=" + size, "width=" + newSize);

                            $('.roundedPicLarge').attr('style', newStyle);
                          }
                        );
                      }
                    });
                };
              }
            ],
            link: function (scope, elem, attrs, ctrl)
            {
              elem.find('.fake-uploader').click(
                function () { elem.find('input[type="file"]').click() }
              );
            },
            replace: false,
            templateUrl: 'views/uploader.html'
          };
        }
      ]
    );

    // TODO: Check whether it is being used.
    directives.directive(
      'profile', [
        function ()
        {
          return {
            restrict: 'E',
            scope: {
              memberId: '@'
            },
            controller: [
              '$scope',
              function ($scope)
              {
                $scope.loadMember = function (el) {}
              }
            ],
            link: function (scope, elem, attrs, ctrl)
            {
              console.log('profile directive ->', attrs.memberId);
            },
            replace: false,
            templateUrl: 'views/profileTemplate.html'
          };

        }
      ]
    );

    // TODO: Is it really needed? Maybe use ng-submit
    directives.directive(
    'ngenter',
    function ()
    {
      return function (scope, element, attrs)
      {
        element.bind(
          'keydown keypress',
          function (event)
          {
            if (event.which === 13)
            {
              scope.$apply(
                function () { scope.$eval(attrs.ngenter) }
              );

              event.preventDefault();
            }
          }
        );
      };
    }
  );

    // Setup the background image
    directives.directive(
      'backImg', function ()
      {
        return function (scope, element, attrs)
        {
//			console.log(element.parent('a'));
//			console.log('attrs-> ', attrs);
//			console.log('attrs->backImg-> ', attrs.backImg);
          var url = attrs.backImg;
          element.css(
            {
              'background-image': 'url(' + url + ')',
              'background-size': 'cover'
            });
        };
      }
    );


    directives.directive(
      'linkIconHovered',
      function ()
      {
        return {
          link: function (scope, element, attrs)
          {
            element.parent().bind(
              'mouseenter',
              function ()
              {
                element.removeClass('icon-link');
                element.addClass('icon-link2');
              }
            );

            element.parent().bind(
              'mouseleave',
              function ()
              {
                element.removeClass('icon-link2');
                element.addClass('icon-link');
              }
            );
          }
        };
      }
    );

    directives.directive(
      'dragEnterLeave',
      function()
      {
        return {
          link: function (scope, element, attrs)
          {
            var className = attrs.dragEnterLeave,
                defaultText = element.text();

            element.bind(
              'dragenter',
              function ()
              {
                element
                  .addClass(className)
                  .text('Drop de spreadsheet.');
              }
            );
            element.bind(
              'dragleave',
              function ()
              {
                element
                  .removeClass(className)
                  .text(defaultText);
              }
            );
          }
        };
      }
    );

    directives.directive(
      'setPositionSlotForm',
      function($window)
      {
        return {
          restrict: 'A',
          link: function (scope, element, attrs)
          {
            element.bind(
              'mouseup',
              function(ev)
              {
                var footer = angular.element('#footer').height(),
                  form = angular.element('.time-slot-form'),
                  modal = form.height(),
                  slot = 105,
                  currentScreen = $window.innerHeight,
                  minNeededHeight = (modal + slot),
                  clickY = (ev.clientY + $window.pageYOffset),//(current view y + scroll top height)
                  heightToBottom = ($window.outerHeight - clickY) + minNeededHeight,
                  position = (minNeededHeight > ev.clientY)
                    ? clickY
                    : (clickY - minNeededHeight);

                //TODO FIx position bottom
                //The height needed for the modal is less then the height in the current view
                form.css('top', position + 'px');
              }
            );
          }
        };
      }
    );

    directives.directive(
      'dynamic',
      function($compile)
      {
        return {
          restrict: 'A',
          replace: true,
          link: function (scope, element, attrs)
          {
            console.log('element', element);
            scope.$watch(attrs.dynamic, function(html)
            {
              element.html(html);
              $compile(element.contents())(scope);
            });
          }
        };
      }
    );

    //TODO create a isolate scope, so multiple $scope vars can use this
    directives.directive(
      'inputRuleToggle',
      function()
      {
        return {
          restrict: 'A',
          link: function (scope, element, attrs)
          {
            var index = attrs.inputRuleToggle,
              parentFormGroup = element
                                    .parents('.form-group');

            element.bind('click',
              function()
              {
                if(element.hasClass('add-button'))
                {
                  parentFormGroup.next()
                    .removeClass('ng-hide')
                    .find('input')
                    .focus();
                }
                else if(element.hasClass('remove-button'))
                {
                  //empty current input value
                  parentFormGroup
                    .addClass('ng-hide')
                    .find('input')
                    .val('');

                  //empty error message
                  parentFormGroup
                    .find('.text-danger small i')
                    .text('');

                  //focus on previous input
                  var prevElement = angular.element(parentFormGroup[0].previousElementSibling);
                  prevElement
                    .find('input')
                    .focus();

                  //empty model scope value
                  if(scope.edit.phoneNumbers[index])
                  {
                    scope.edit.phoneNumbers.splice(index, 1);
                    scope.parsedPhoneNumbers[index] = {};
                  }
                  else if(scope.memberForm.phoneNumbers[index])
                  {
                    scope.memberForm.phoneNumbers.splice(index, 1);
                    scope.parsedPhoneNumbers[index] = {};
                  }
                }
              }
            );
          }
        };
      }
    );

    //directives.directive(
    //  'scroll',
    //  function($window)
    //  {
    //    return function(scope, element, attrs) {
    //      angular.element($window).bind("scroll", function()
    //      {
    //        //scope.currentScroll(this.pageYOffset);
    //        //scope.$apply();
    //      });
    //    };
    //  }
    //);
  }
);
