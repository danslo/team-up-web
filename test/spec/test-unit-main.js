var tests = [];
for (var file in window.__karma__.files) {
  if (window.__karma__.files.hasOwnProperty(file)) {
    // Removed "Spec" naming from files
    if (/Spec\.js$/.test(file)) {
      tests.push(file);
    }
  }
}


requirejs.config(
  {
    baseUrl: '/base/app/scripts',

    paths: {
      localConfig: 'localConfig',
      config: 'config',
      angular:      '../vendors/angular/angular',
      jquery:       '../vendors/jquery/dist/jquery',
      plugins: 'plugins',
      'angular-resource': '../vendors/angular-resource/angular-resource.min',
      'angular-route': '../vendors/angular-route/angular-route.min',
      'angular-md5': '../vendors/angular-md5/angular-md5.min',
      'angular-strap':    '../vendors/angular-strap/dist/angular-strap.min',
      'angular-strap-tpl':    '../vendors/angular-strap/dist/angular-strap.tpl.min',
      'angular-cookie':    '../vendors/angular-cookie/angular-cookie',
      'jquery-ui':        '../vendors/jquery-ui/ui/jquery-ui',
      daterangepicker: '../vendors/bootstrap-daterangepicker/daterangepicker',
      domReady:     '../vendors/requirejs-domready/domReady',
      moment: '../vendors/moment/moment',
      lawnchair: '../vendors/lawnchair/src/Lawnchair',
      'lawnchair-dom': '../vendors/lawnchair/src/adapters/dom',
      underscore: '../vendors/underscore/underscore',
      //'ui-sortable':      '../vendors/angular-ui-sortable/sortable',
      'sortable': '../vendors/Sortable/Sortable',
      'ng-sortable': '../vendors/Sortable/ng-sortable',
      'ui.bootstrap.pagination': '../vendors/angular-ui-bootstrap/src/pagination/pagination',
      domReady:     '../vendors/requirejs-domready/domReady',
      'angular-mocks': '../vendors/angular-mocks/angular-mocks',
      mask: 'removables/angular-ui-utils/modules/mask/mask'
      // unitTest:     '../../test/spec'
    },

    shim: {
      localConfig: {deps: ['jquery'], exports: 'localConfig' },
      profile: {deps: ['jquery'], exports: 'profile' },
      config: {deps: ['profile', 'localConfig'], exports: 'config' },
      plugins: { deps: ['jquery'], exports: 'plugins' },
      'angular-resource': { deps: ['angular'] },
      'angular-route': { deps: ['angular'] },
      'angular-md5': { deps: ['angular'] },
      'angular-strap': { deps: ['angular'] },
      'angular-strap-tpl': { deps: ['angular','angular-strap'] },
      'angular-cookie': { deps: ['angular'] },
      daterangepicker: { deps: ['jquery', 'moment'], exports: 'daterangepicker' },
      'jquery-ui':        { deps: ['jquery'], exports: 'jquery-ui'},
      //moment: { deps: [], exports: 'moment' },
      //'ui-sortable':      { deps: ['jquery','jquery-ui'], exports: 'ui-sortable' },

      'ui.bootstrap.pagination': { deps: ['angular'] },
      angular: {
        deps:    ['jquery'],
        exports: 'angular'
      },
      'angular-mocks': {
        deps: ['angular'],
        exports: 'angular.mock'
      },
      underscore: { exports: 'underscore'},
      lawnchair: { deps: [], exports: 'lawnchair' },
      'lawnchair-dom': { deps: ['lawnchair'], exports: 'dom' },
      mask: { deps: ['angular'] }
    },

    deps: tests,

    callback: window.__karma__.start
  }
);

requirejs.config({
  paths: {
    localConfig: 'localConfig',
    profile: 'profiles/teamup/profile',
    config: 'config'
  }
});

var testConfig = {
  host: 'http://test.ask-cs.com/',
  userResources: {
    "uuid": "henkie",
    "userName": "henkie",
    "passwordHash": "4e8cc74b2e654b94acd1aea8fc654760",
    "firstName": "Henk",
    "lastName": "van R00ijen",
    "phone": "+31650458799",
    "email": "henkie@henkie.nl",
    "states": [
      {
        "uuid": 100,
        "name": "Reachability",
        "value": "possibly_reachable",
        "share": true
      },
      {
        "uuid": 104,
        "name": "Location",
        "value": "51.9205,4.4545",
        "share": true
      },
      {
        "uuid": 102,
        "name": "Availability",
        "value": "available",
        "share": true
      }
    ],
    "teamUuids": [
      "b3915de1-f29c-4609-a67f-73aaef529902"
    ],
    "role": "1",
    "function": null,
    "birthDate": 636764400000,
    "address": {
      "street": "Heemraadssingel",
      "no": "89",
      "zip": null,
      "city": "Rotterdam",
      "country": "Nederland",
      "latitude": 51.9205,
      "longitude": 4.4545
    },
    "extraInfo": {
      "photoUUID": "ab859243-0471-4598-a5c5-43f2696e9f13"
    },
    "fullName": "Henk van R00ijen",
    "apnskey": "b551dca7cb3e3c8c006b0da335f8c2fde9019828801ef50a4472f35776d24b46",
    "gcmkey": "APA91bHquo0ikrNXW74wzijq0okPAMBceJgBN8U4mmnVJf9QsAI2qEZjGHu5cVqzqDPzYeyE6Pma-k2HvQ3mU2E7StPU85WGsZrm0QMTCPxNLF3lzxlxoeCyCT4d_hB-A3X-0tRG8P-tQyNMAhZaCpA9u4rh4i5ZJA",
    "$promise": {},
    "$resolved": true
  }
};