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

    it("Right initialization", function() {
        var a = new classA(),
            b = new classB();

        expect(a).to.have.property('name', 'classA');
        expect(b).to.have.property('name', 'classB');
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

    it("Clone object method", function() {
        var parent = {name: 'parent', someVal: 'someVal'},
            child = {name: 'child'},
            parent1 = parent,
            child1 = child;

        expect(ABone.cloneObject(parent, {})).to.eql({name: 'parent', someVal: 'someVal'});

        expect(parent).to.eql({name: 'parent', someVal: 'someVal'});
        expect(child).to.eql({name: 'child'});

        expect(parent).to.eql(parent1);
        expect(child).to.eql(child1);

        expect(ABone.cloneObject(parent, child)).to.eql({name: 'child', someVal: 'someVal'});
    });
});