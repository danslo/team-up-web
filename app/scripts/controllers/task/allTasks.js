define(
  ['../controllers'],
  function (controllers)
  {
    'use strict';

    controllers.controller(
      'allTasks',
      function ()
      {
        var self = this;
        console.log("alltasks controller called");
      }
    );
  }
);
