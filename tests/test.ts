///<reference path="../typings/references.ts" />
///<reference path="../typings/mocha.d.ts" />
///<reference path="../typings/chai.d.ts" />

import chai = require('chai');
var expect = chai.expect;

describe('server', function () {
    before(function () {
    });
    describe('sample tests', function(){
        it('should be correct',function(){
            expect(false).not.to.be.true;
        })
    });
    after(function () {
    });
});