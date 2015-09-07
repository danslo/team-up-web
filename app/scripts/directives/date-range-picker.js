define(
  ['directives/directives', 'config'],
  function (directives, config) {
    'use strict';

    directives.directive(
      'daterangepicker',
      [
        '$rootScope', 'moment',
        function ($rootScope, moment) {
          return {
            restrict: 'A',

            link: function postLink(scope, element, attrs) {
              // var startDate = Date.create().addDays(-6),
              //     endDate   = Date.create();
              //element.val(startDate.format('{MM}-{dd}-{yyyy}') + ' / ' + endDate.format('{MM}-{dd}-{yyyy}'));

              var options = {
                startDate:      Date.today(),
                endDate:        Date.today(),
                format:         'DD-MM-YYYY',
                separator:      ' / ',
                minDate:        false,
                maxDate:        false,
                changed:        false,
                cleared:        false,
                showDropdowns:  false,
                dateLimit:      false,
                locale: {
                  applyLabel:     $rootScope.ui.teamup.apply,
                  cancelLabel:    $rootScope.ui.teamup.cancel,
                  fromLabel:      $rootScope.ui.teamup.from,
                  toLabel:        $rootScope.ui.teamup.to,
                  weekLabel:      'W',
                  customRangeLabel: $rootScope.ui.planboard.customDates,
                  daysOfWeek:     moment.weekdaysMin(),
                  monthNames:     moment.months(),
                  firstDay:       0
                },
                ranges: {}
              };

              // lose this sugerJs related stuff later on!
              //          options.ranges[$rootScope.ui.planboard.daterangerToday] = ['today', 'tomorrow'];
              //          options.ranges[$rootScope.ui.planboard.daterangerTomorrow] = ['tomorrow', new Date.today().addDays(2)];
              //          options.ranges[$rootScope.ui.planboard.daterangerYesterday] = ['yesterday', 'today'];
              //          options.ranges[$rootScope.ui.planboard.daterangerNext3Days] = ['today', new Date.create().addDays(3)];
              //          options.ranges[$rootScope.ui.planboard.daterangerNext7Days] = ['today', new Date.create().addDays(7)];

              options.ranges[$rootScope.ui.planboard.daterangerToday] = [
                new Date.today(),
                new Date.today().addDays(1)
              ];

              options.ranges[$rootScope.ui.planboard.daterangerTomorrow] = [
                new Date.today().addDays(1),
                new Date.today().addDays(2)
              ];

              options.ranges[$rootScope.ui.planboard.daterangerYesterday] = [
                new Date.today().addDays(-1),
                new Date.today()
              ];

              options.ranges[$rootScope.ui.planboard.daterangerNext3Days] = [
                new Date.today(),
                moment().add(3, 'day').toDate()
              ];
              options.ranges[$rootScope.ui.planboard.daterangerNext7Days] = [
                new Date.today(),
                moment().add(7, 'day').toDate()
              ];

              element.daterangepicker(
                options,
                function (start, end) {
                  scope.$apply(
                    function () {

                      // Check for moment object and convert to Date object
                      // (bootstrap-daterangepicker uses moment)
                      if(start._isAMomentObject && end._isAMomentObject){
                        start = start.toDate();
                        // bootstrap-daterangepicker uses end of day,
                        // make it the beginning using moment's function
                        end = (end.startOf('day')).toDate();
                      }

                      var diff = end.getTime() - start.getTime();

                      scope.timeline.scope = {
                        day: false,
                        week: false,
                        month: false
                      };

                      // Scope is a day
                      if (diff <= 86400000) {
                        scope.timeline.scope.day = true;
                      }
                      // Scope is less than a week
                      else if (diff < 604800000) {
                        scope.timeline.scope.week = true;
                      }
                      // Scope is more than a week
                      else if (diff > 604800000) {
                        scope.timeline.scope.month = true;
                      }

                      var periods = {
                        start: start,
                        end: end
                      };

                      scope.timeline.range = periods;

                      var broadcastId = (attrs.daterangepicker == 'task-planboard')
                        ? 'timelinerTasks'
                        : 'timeliner';

                      $rootScope.$broadcast(broadcastId, periods);
                    }
                  );
                }
              );

              // Set data toggle
              element.attr('data-toggle', 'daterangepicker');

              // TODO: Investigate if its really needed!!
              // element.daterangepicker({ autoclose: true });
            }
          };
        }
      ])
  }
);
