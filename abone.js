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
                 */
                if (!hasConstructor && !hasParent) {
                    o.constructor = function() {};

                    /**
                     * If new class hasn't define constructor then set default
                     * And has parent class
                     */
                } else if (!hasConstructor && hasParent) {

                    /**
                     * Set default constructor which will be call prent constructor with arguments
                     */
                    o.constructor = function() {
                        this.parentClass.constructor.apply(this, arguments);
                    };
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
        })(), fn.o.constructor.prototype = fn.o, fn.o.constructor.self = fn.o.constructor, fn.o.constructor;
    })();

    /**
     * Export script to nodejs or browser
     */
    if (module != null && typeof module.exports !== 'undefined') {
        module.exports = Class;
    } else {
        window['ABone'] = Class;
    }
})();
