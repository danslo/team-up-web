define(
  {
    app: {
      // version:  '@@version',
      released: '@@released',

      title: 'TeamUp',
      version: '0.3.0-alpha-1.4',
      lang: 'nl',

      statesall: {
        'com.ask-cs.State.Available': {
          className: 'state-available',
          label: 'Beschikbaar',
          color: '#4f824f',
          type: 'Beschikbaar'
        },
        'com.ask-cs.State.Unavailable': {
          className: 'state-unavailable',
          label: 'Niet Beschikbaar',
          color: '#a93232',
          type: 'Niet Beschikbaar'
        },
        'com.ask-cs.State.Unreached': {
          className: 'state-unreached',
          label: 'Niet Bereikt',
          color: '#65619b',
          type: 'Niet Beschikbaar'
        }
      },

      // host: "http://test.ask-cs.com/",
      host: "http://dev.ask-cs.com/",
      // namespace: "teamup-test",
      namespace: "teamup-dev",

      formats: {
        date: 'dd-MM-yyyy',
        time: 'HH:mm',
        datetime: 'dd-MM-yyyy HH:mm',
        datetimefull: 'dd-MM-yyyy HH:mm'
      },

      roles: [
        {
          id: '1',
          label: 'coordinator'
        },
        {
          id: '2',
          label: 'team_member'
        },
        {
          id: '3',
          label: 'client'
        }
      ],

      mfunctions: [
        {
          id: '1',
          label: 'Doctor'
        },
        {
          id: '2',
          label: 'Nurse'
        }
      ],

      stateIcons: [
        {
          name: 'Availability',
          data_icon: '&#xe04d;',
          class_name: 'icon-user-block'
        },
        {
          name: 'Location',
          data_icon: '&#xe21a;',
          class_name: 'icon-location4'
        },
        {
          name: 'Emotion',
          data_icon: '&#xe0f2;',
          class_name: 'icon-smiley'
        },
        {
          name: 'Activity',
          data_icon: '&#xe4f2;',
          class_name: 'icon-accessibility'
        },
        {
          name: 'Reachability',
          data_icon: '&#xe169;',
          class_name: 'icon-podcast2'
        }
      ],

      stateColors: {
        availalbe: 'memberStateAvailalbe',
        busy: 'memberStateBusy',
        offline: 'memberStateOffline',
        none: 'memberStateNone'
      },

      noImgURL: '/images/defaultAvatar.png',

      timeline: {
        options: {
          axisOnTop: true,
          width: '100%',
          height: 'auto',
          selectable: true,
          editable: true,
          style: 'box',
          groupsWidth: '200px',
          eventMarginAxis: 0,
          showCustomTime: false,
          groupsChangeable: true,
          showNavigation: false,
          intervalMin: 1000 * 60 * 60 * 1
        },
        // TODO: Remove unused config properties
        config: {
          zoom: '0.4',
          bar: false,
          layouts: {
            groups: true,
            members: true
          },
          wishes: false,
          legenda: {},
          legendarer: false,
          states: {},
          divisions: [
            {
              id: 'all',
              label: 'All divisions'
            },
            {
              id: 'knrm.StateGroup.BeschikbaarNoord',
              label: 'Noord'
            },
            {
              id: 'knrm.StateGroup.BeschikbaarZuid',
              label: 'Zuid'
            }
          ],
          densities: {
            less: '#a0a0a0',
            even: '#ba6a24',
            one: '#415e6b',
            two: '#3d5865',
            three: '#344c58',
            four: '#2f4550',
            five: '#2c424c',
            six: '#253943',
            more: '#486877'
          }
        }
      },

      pie: {
        colors: ['#415e6b', '#ba6a24', '#a0a0a0']
      },

      defaults: {
        settingsWebPaige: {
          user: {
            language: 'nl'
          },
          app: {
            widgets: {
              groups: {}
            }
          }
        }
      },

      states: [
        'com.ask-cs.State.Available',
        'com.ask-cs.State.Unavailable',
        'com.ask-cs.State.Unreached'
      ],

      init: function ()
      {
        angular.forEach(
          this.states,
          (function (state) { this.timeline.config.states[state] = this.statesall[state] }).bind(this)
        );
      }
    }
  }
);