var chai = require('chai');
var chaiHttp = require('chai-http');
var requireHelper = require('./require_helper');
var helloworld = requireHelper('/app/server/helloWorld');
var should = chai.should();
var express = require('express');
var http = require('http');

chai.use(chaiHttp);

var app;
describe('Helloworld', function() {

    before(function() {
        app = helloworld.registerServer(express(),'/helloWorld')
    });

    it('should print Hello World! on /helloWorld GET', function(done) {
        chai.request(app)
            .get('/helloWorld')
            .end(function(err, res){
                res.should.have.status(200);
                res.text.should.equal('Hello World!');
                done();
            });
    });

    it('should print World Hello! on /helloWorld POST', function(done) {
        chai.request(app)
            .post('/helloWorld')
            .end(function(err, res){
                res.should.have.status(200);
                res.text.should.equal('World Hello!');
                done();
            });
    });
});