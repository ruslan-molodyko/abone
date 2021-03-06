/**
 * Created by admin on 17.02.2016.
 */

var path = require('path'),
    expect = require("chai").expect,
    ABone = require(path.join('..', 'abone'));

describe("Inheritance", function() {

    var parent = ABone.create(function() {

        this.constructor = function() {
            this.name = 'parent';
            this.parent = {};
        }

        this.nativeInit = function() {
            this.name = 'new-name';
        }

        this.initParent = function() {
            return 'parentClass';
        };
        this.o = function() {
            this.name = 'parent-o';
        }

        this.constructor.parentStaticMethod = function () {
            return 'parent';
        }
    });

    var cl = ABone.create(function() {
        this.some = function() {
            return '123';
        };
    });

    var classA = ABone.create(function() {

        this.constructor = function() {
            this.name = 'classA';
            this.classAName = {};
        }

        this.init = function() {
            return 'classA-init';
        }
        this.initParent = function() {
            return 'classA-initParent';
        }
        this.o = function() {
            this.name = 'parent-a';
        }
    }, parent);

    var classB = ABone.create(function() {

        this.constructor = function() {
            this.name = 'classB';
            this.classBName = {};
        }

        this.init = function() {
            return 'classB-init';
        }
        this.initParent = function() {
            return 'classB-initParent';
        }
        this.o = function() {
            this.name = 'parent-b';
        }
    }, parent);

    var StaticClassMethod = ABone.create(function () {
        "use strict";
        this.constructor.staticMethod = function () {
            return 'ok'
        };
    });

    var StaticClassMethodInheritance = ABone.create(function () {
        "use strict";
        this.constructor.staticMethod = function () {
            return 'ok'
        };
    }, parent);


    var ParentStaticClassMethod = ABone.create(function () {
        "use strict";
        this.constructor.staticMethod1 = function () {
            return 'ok'
        };
    }, parent);

    it("Default constructor", function() {
        var c = new cl();

        expect(c.some()).to.eql('123');
    });

    it("Right initialization", function() {
        var a = new classA(),
            b = new classB();

        expect(a).to.have.property('name', 'classA');
        expect(b).to.have.property('name', 'classB');
    });

    it("One static method without define constructor", function() {
        expect(StaticClassMethod.staticMethod()).to.be.eql('ok');
    });

    it("One static method of inherited class without define constructor", function() {
        expect(StaticClassMethodInheritance.staticMethod()).to.be.eql('ok');
    });

    it("One static method from parent class without define constructor", function() {
        expect(ParentStaticClassMethod.staticMethod1()).to.be.eql('ok');
        expect(ParentStaticClassMethod.parentStaticMethod()).to.be.eql('parent');
    });

    it("Access to child properties", function() {
        var a = new classA(),
            b = new classB();

        expect(a).to.have.property('classAName');
        expect(b).to.have.property('classBName');
    });

    it("Access to parent properties", function() {
        var a = new classA(),
            b = new classB();

        expect(a).to.not.have.property('parent');
        expect(b).to.not.have.property('parent');
    });

    it("Right context", function() {
        var a = new classA(),
            b = new classB();

        a.nativeInit();
        b.nativeInit();

        expect(a).to.have.property('name', 'new-name');
        expect(b).to.have.property('name', 'new-name');
    });

    it("Right context override", function() {
        var a = new classA(),
            b = new classB();

        a.o();
        b.o();

        expect(a).to.have.property('name', 'parent-a');
        expect(b).to.have.property('name', 'parent-b');
    });
});