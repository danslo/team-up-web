define(['services/services'], function (services) {
  'use strict';

  services.factory('Store', ['$window', '$parse', function ($window, $parse) {
    return function (name, config) {
      var LawnChair,
        Store,
        allAsArray,
        allAsCollection,
        array,
        collection,
        getDefault,
        getEntryId,
        idGetter,
        isArray,
        removeEntry,
        saveEntry,
        transformLoad,
        transformSave,
        updateArray,
        updateCache,
        updateCacheFromStorage;

      getEntryId = function (entry) {
        try {
          return idGetter(entry);
        } catch (e) {
          // TODO: Redirect to Log service later on!
          // Log.error('There has been an error with Store > getEntryId:', e);

          return null;
        }
      };

      LawnChair = function (callback) {
        return new Lawnchair({ name: name }, callback);
      };

      saveEntry = function (data, key) {
        var update;

        key = key.toString();

        if (angular.isObject(data) && data !== collection[key]) {
          collection[key] = collection[key] || {};

          angular.extend(collection[key], data);
        }
        else {
          collection[key] = data;
        }

        update = {
          key: key,
          value: transformSave(collection[key])
        };

        try {
          LawnChair(function () {
            this.save(update);
          });
        } catch (e) {
          if (e.name === 'QUOTA_EXCEEDED_ERR' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED')
            $window.localStorage.clear();

          // Log.error('LocalStorage Exception:', e.message);
        }
      };

      updateArray = function (data) {
        array.length = 0;

        _.each(data, function (o) {
          array.push(o);
        });

        return array;
      };

      updateCache = function (obj, key) {
        if (obj && angular.isObject(obj) && collection[key] && collection[key] !== obj) {
          angular.extend(collection[key], obj);
        }
        else {
          collection[key] = obj;
        }
      };

      updateCacheFromStorage = function (cache, storage) {
        if (storage) {
          if (angular.isObject(storage.value) && angular.isObject(cache)) {
            angular.extend(cache, transformLoad(storage.value));
          }
          else {
            cache = transformLoad(storage.value);
          }

          updateCache(cache, storage.key);
        }

        return cache;
      };

      allAsCollection = function (callback) {
        LawnChair(
          function () {
            this.all(
              function (result) {
                _.each(result, function (o) {
                  updateCache(o.value, o.key)
                });

                if (callback)
                  callback(collection);
              }
            );
          }
        );

        return collection;
      };

      allAsArray = function (callback) {
        return updateArray(
          allAsCollection(
            function (data) {
              updateArray(data);

              if (callback)
                callback(array);
            }
          )
        );
      };

      removeEntry = function (key) {
        delete collection[key];

        LawnChair(function () {
          this.remove(key);
        });
      };

      getDefault = function (key) {
        var d;

        if (collection[key]) {
          return collection[key];
        } else {
          d = {};

          idGetter.assign(d, key);

          return d;
        }
      };

      collection = {};
      array = [];
      isArray = config && config.isArray;

      // TODO: All config items are used?
      idGetter = $parse((config && config.entryKey ? config.entryKey : 'id'));
      transformSave = (config && config.transformSave ? config.transformSave : angular.identity);
      transformLoad = (config && config.transformLoad ? config.transformLoad : angular.identity);

      Store = {
        collection: collection,

        save: function (key, data, clear) {
          var newIds;

          if (!data) {
            data = collection;
            key = null;
          }

          if (key)
            saveEntry(data, key || getEntryId(data));

          if (clear) {
            newIds = (angular.isArray(data) ? _.chain(data).map(getEntryId).map(String).value() : _.keys(data));

            _.chain(collection)
              .keys()
              .difference(newIds)
              .each(removeEntry);

            _.chain(collection)
              .filter(function (entry) {
                return !getEntryId(entry)
              })
              .keys()
              .each(removeEntry);
          }
        },

        batch: function (keys, target, callback) {
          var cache;

          cache = _.chain(keys)
            .map(function (k) {
              return getDefault(k);
            })
            .value();

          if (target && angular.isArray(target)) {
            target.length = 0;

            _.each(cache, function (o) {
              target.push(o);
            });
          }
          else {
            target = cache;
          }

          LawnChair(
            function () {
              this.get(keys, function (result) {
                var i;

                if (result) {
                  i = result.length - 1;

                  while (i >= 0) {
                    target[i] = updateCacheFromStorage(target[i], result[i]);
                    i--;
                  }
                }

                if (callback) {
                  callback(target);
                }
              });
            });

          return target;
        },

        has: function(key) {
          var value;
          LawnChair(function () {
            this.exists(key, function (result)
            {
              value = undefined;
            });
          });

          if(typeof value === 'undefined')
          {
            return false;
            console.error("You have to use a callback");
          }
          else
          {
            return value;
          }
        },

        get: function (key, callback) {
          var value;

          value = getDefault(key);

          LawnChair(function () {
            this.get(key, function (result) {
              if (result) {
                value = updateCacheFromStorage(value, result);
              }

              if (value.hasOwnProperty("0")) {
                value = _.map(value, function (_value) {
                  return _value
                });

                value.pop();
              }

              if (callback)
                callback(value);
            });
          });

          return value;
        },

        nuke: function () {
          LawnChair(function () {
            this.nuke();
          });
        },

        all: (isArray ? allAsArray : allAsCollection),

        remove: removeEntry,

        destroy: function () {
          var key;

          for (key in collection) {
            delete collection[key];
          }

          LawnChair(function () {
            this.nuke();
          });
        }
      };

      return Store;
    };
  }]);
});