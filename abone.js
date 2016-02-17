/**
 * Created by molodyko on 22.12.2015.
 * Realization of class
 
 */
Class = (function() {
    "use strict";
    var fn = function(){};
    return fn.o = new (function() {

        this.constructor = function() {};

        /**
         * This is static function of class
         * Which creates some class by function container
         * @param fn
         * @returns {Function}
         */
        this.constructor.create = function(fn, parent) {

            // Get error if first arg is not a function
            if (typeof fn !== 'function') {
                throw new Error('Fn is not a function');
            }

            /**
             * If parent is object then add it to top of prototype inheritance
             * For call parent constructor is it is exists call:
             *     this.parentClass.constructor.call(this, panel);
             */
            if (typeof parent === 'function') {

                fn.prototype = this.self.cloneObject(parent.prototype, fn.prototype);
                fn.prototype.parentClass = fn.prototype;
            }

            // Create new object by passed function
            var o = new fn();

            // If new class hasn't define constructor then set default
            if (o.constructor === fn) {
                o.constructor = function() {};
            }

            // Set link to constructor and self to get static variables
            o.self = constructor;

            // Set prototype to constructor
            o.constructor.prototype = o;

            // Add get instance method for each class
            o.constructor.getInstance = function() {
                var p = function() {};
                p.prototype = o;
                var p1 = new p();
                if (this.instance == null) {
                    o.constructor.apply(p1, arguments);
                    this.instance = p1;
                }
                return this.instance;
            };

            // Return constructor
            return o.constructor;
        };

        this.constructor.cloneObject = function(origin, add) {
            // Don't do anything if add isn't an object
            if (!add || typeof add !== 'object') return origin;

            var keys = Object.keys(add);
            var i = keys.length;
            while (i--) {
                origin[keys[i]] = add[keys[i]];
            }
            return origin;
        };

    })(), fn.o.constructor.prototype = fn.o, fn.o.constructor.self = fn.o.constructor, fn.o.constructor;
})();

module.exports = Class;