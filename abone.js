/**
 * Javascript classes
 * Created by Ruslan Molodyko
 */
(function() {

    var Class = (function fn() {
        "use strict";

        /**
         * Use fn as object container
         */
        return fn.o = new (function() {

            /**
             * Save link to class
             * @type {Class}
             */
            var self = this;

            /**
             * Create constructor of raw class
             */
            this.constructor = function() {};

            /**
             * This is static function of class
             * Which creates some class by function container
             *
             * @param fn
             * @returns {Function}
             */
            this.constructor.create = function(fn, parent) {

                /**
                 * Get error if first arg is not a function
                 */
                if (typeof fn !== 'function') {
                    throw new Error('Fn is not a function');
                }

                var hasConstructor = !((new fn()).constructor === fn),
                    hasParent = typeof parent === 'function';

                /**
                 * If need inherite classes
                 * If parent is object then add it to top of prototype inheritance
                 *
                 * For call parent constructor is it is exists call:
                 * this.parentClass.constructor.call(this, panel);
                 * this.parentClass.constructor.apply(this, arguments)
                 */
                if (hasParent) {

                    /**
                     * Inheritate prototype of classes
                     * @type {Object}
                     */
                    fn.prototype = parent.prototype;
                    fn.prototype.parentClass = parent.prototype;
                }

                /**
                 * Create new object by passed function
                 */
                var o = new fn();

                /**
                 * If new class hasn't define constructor then set default
                 * And has parent class
                 */
                if (!hasConstructor && hasParent) {

                    // Save previous constructor
                    var selfConstructor = o.constructor;

                    /**
                     * Set default constructor which will be call prent constructor with arguments
                     */
                    o.constructor = function() {
                        this.parentClass.constructor.apply(this, arguments);
                    };

                    /**
                     * Add static properties from parent class
                     */
                    self.extend(o.constructor, o.parentClass.constructor);


                    /**
                     * Add static properties from this class
                     */
                    self.extend(o.constructor, selfConstructor);
                }

                /**
                 * Set link to constructor and self to get static variables
                 */
                o.self = constructor;

                /**
                 * Set prototype to constructor
                 */
                o.constructor.prototype = o;

                /**
                 * Add get instance method for each class
                 * @returns {p|*|p1}
                 */
                o.constructor.getInstance = function() {
                    if (this.instance == null) {

                        // Create context for use as context of costructor
                        var context = Object(o);

                        // Call constructor with arguments
                        o.constructor.apply(context, arguments);

                        // Save instance
                        this.instance = context;
                    }
                    return this.instance;
                };

                /**
                 * Return class constructor
                 */
                return o.constructor;
            };

            /**
             * Add properties first level from one object to another
             *
             * @param dest
             * @param source
             */
            this.extend = function (dest, source) {
                for (var i in source) {
                    if (source.hasOwnProperty(i)) {
                        dest[i] = source[i];
                    }
                }
            };

        })(), fn.o.constructor.prototype = fn.o, fn.o.constructor.self = fn.o.constructor, fn.o.constructor;
    })();

    /**
     * Export script to nodejs or browser
     */
    if (typeof module !== "undefined" && typeof module.exports !== 'undefined') {
        module.exports = Class;
    } else {
        window['ABone'] = Class;
    }
})();
