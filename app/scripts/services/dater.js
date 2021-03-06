define(
  ['services/services', 'config'],
  function (services, config)
  {
    'use strict';

    services.factory(
      'Dater',
      [
        '$rootScope', 'Store', '$injector',
        function ($rootScope, Store, $injector)
        {
          return {
            current: {
              today: function () { return Date.today().getDayOfYear() + 1 },
              week: function () { return Date.today().getWeekOfYear() },
              month: function () { return new Date().getMonth() + 1 },
              year: function() {return new Date().toString('yyyy') }
            },

            readable: {
              date: function (date) { return  new Date(date).toString(config.app.formats.date) }
            },

            convert: {
              absolute: function (date, time, flag)
              {
                var dates = date.split('-'),
                    result = new Date(
                      Date.parse(
                          dates[2] +
                          '-' +
                          dates[1] +
                          '-' +
                          dates[0] +
                          ' ' +
                          time)).getTime();

                return (flag) ? result / 1000 : result;
              }
            },

            calculate: {
              diff: function (range) { return new Date(range.end).getTime() - new Date(range.start).getTime() }
            },

            getThisYear: function () { return new Date().toString('yyyy') },

            getMonthTimeStamps: function ()
            {
              var months = {},
                  year = this.getThisYear();

              for (var i = 0; i < 12; i ++)
              {
                var firstDay = new Date(year, i).moveToFirstDayOfMonth(),
                    lastDay = new Date(year, i).moveToLastDayOfMonth().addDays(1),
                    month = {
                      first: {
                        day: firstDay,
                        timeStamp: firstDay.getTime()
                      },
                      last: {
                        day: lastDay,
                        timeStamp: lastDay.getTime()
                      },
                      totalDays: Date.getDaysInMonth(year, i)
                    };

                months[i + 1] = month;
              }

              return months;
            },

            getWeekTimeStamps: function ()
            {
              var nweeks = [],
                  weeks = {},
                  nextMonday,
                  year = this.getThisYear(),
                  firstDayInYear = new Date(year, 0).moveToFirstDayOfMonth(),
                  firstMondayOfYear = new Date(year, 0).moveToFirstDayOfMonth().last().sunday().addWeeks(0),
                  firstMonday = new Date(firstMondayOfYear);

              for (var i = 0; i < 53; i ++)
              {
                if (i == 0)
                {
                  nextMonday = firstMondayOfYear.addWeeks(1);
                }
                else
                {
                  nextMonday = new Date(nweeks[i - 1]).addWeeks(1);
                }

                nweeks.push(new Date(nextMonday));
              }

              nweeks.unshift(firstMonday);

              var firstMondayofNextYear = new Date(nweeks[51].addWeeks(1));

              for (var i = 0; i < 55; i ++)
              {
                weeks[i + 1] = {
                  first: {
                    day: nweeks[i],
                    timeStamp: new Date(nweeks[i]).getTime()
                  },
                  last: {
                    day: nweeks[i + 1],
                    timeStamp: new Date(nweeks[i + 1]).getTime()
                  }
                }
              }

              delete weeks[54];
              delete weeks[55];

              return weeks;
            },

            getDayTimeStamps: function ()
            {
              var nextDay,
                  ndays = [],
                  days = {},
                  year = this.getThisYear(),
                  firstDayInYear = new Date(year, 0).moveToFirstDayOfMonth();

              for (var i = 0; i < 366; i ++)
              {
                if (i == 0)
                {
                  nextDay = firstDayInYear;
                }
                else
                {
                  nextDay = new Date(ndays[i - 1]).addDays(1);
                }

                ndays.push(new Date(nextDay));
              }

              for (var i = 0; i < 366; i ++)
              {
                days[i + 1] = {
                  first: {
                    day: ndays[i],
                    timeStamp: new Date(ndays[i]).getTime()
                  },
                  last: {
                    day: ndays[i + 1],
                    timeStamp: new Date(ndays[i + 1]).getTime()
                  }
                };
              }

              if (! days[366].timeStamp)
              {
                delete days[366];

                days.total = 365;
              }
              else
              {
                days.total = 366;
              }

              return days;
            },

            registerPeriods: function ()
            {
              var periods = Store('app').get('periods') || '{}';

              Store('app').save(
                'periods', {
                  months: this.getMonthTimeStamps(),
                  weeks: this.getWeekTimeStamps(),
                  days: this.getDayTimeStamps()
                });
            },

            getPeriods: function ()
            {
              return Store('app').get('periods');
            },

            formatDate: function(date)
            {

              var moment = $injector.get('moment');

              return moment(date)
                        .format('DD-MM-YYYY');
            },

            formatDateMobile: function(date)
            {
              var moment = $injector.get('moment');

              return moment(this.convert.absolute(date, 0))
                        .format('YYYY-MM-DD');
            }
          }
        }
      ]);
  }
);
