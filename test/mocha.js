/*
 * Copyright(c) 2013 tshibata <staatsschreiber@gmail.com>
 * Licensed under the Apache License, Version 2.0
 */
var should = require('should');
var jsdom = require('jsdom');
var child_process = require('child_process');
document = jsdom.jsdom('<html><head></head><body></body></html>');

describe('ss.xml without stasc tags', function () {
	it('should generate the same dom object', function (done) {
		child_process.exec('bash -c ../../stasc', {cwd: 'test/simple_test'}, function (error, stdout, stderr) {
			should.not.exist(error);
			stderr.should.equal('');

			var expected = document.createElement('span');
			expected.appendChild(document.createTextNode('hello'));
			require('./simple_test/Stasc');
			var actual = simple();
			actual.isEqualNode(expected).should.be.ok;

			done();
		});
	});
});

describe('ss.xml using namespace', function () {
	it('should generate the same dom object', function (done) {
		child_process.exec('bash -c ../../stasc', {cwd: 'test/namespace_test'}, function (error, stdout, stderr) {
			should.not.exist(error);
			stderr.should.equal('');

			var expected = document.createElementNS('http://www.w3.org/2000/svg','svg');
			require('./namespace_test/Stasc');
			var actual = namespace();
			actual.isEqualNode(expected).should.be.ok;

			done();
		});
	});
});

describe('ss.xml with comment', function () {
	it('should generate dom object without comment', function (done) {
		child_process.exec('bash -c ../../stasc', {cwd: 'test/comment_test'}, function (error, stdout, stderr) {
			should.not.exist(error);
			stderr.should.equal('');

			var expected = document.createElement('span');
			expected.appendChild(document.createTextNode('hello'));
			require('./comment_test/Stasc');
			var actual = comment();
			actual.isEqualNode(expected).should.be.ok;

			done();
		});
	});
});

describe('ss.xml with stasc attribute tag', function () {
	it('should generate dom object with attribute accessor', function (done) {
		child_process.exec('bash -c ../../stasc', {cwd: 'test/attribute_test'}, function (error, stdout, stderr) {
			should.not.exist(error);
			stderr.should.equal('');

			var expected = document.createElement('a');
			expected.setAttribute('href','http://localhost/')
			expected.appendChild(document.createTextNode('link'));
			require('./attribute_test/Stasc');
			var actual = attribute();
			actual.Href = 'http://localhost/';
			actual.isEqualNode(expected).should.be.ok;

			done();
		});
	});
});

describe('ss.xml with stasc attribute tag using namespace', function () {
	it('should generate the same dom object', function (done) {
		child_process.exec('bash -c ../../stasc', {cwd: 'test/attribute_namespace_test'}, function (error, stdout, stderr) {
			should.not.exist(error);
			stderr.should.equal('');

			var expected = document.createElementNS('http://www.w3.org/2000/svg','svg');
			var link = document.createElementNS('http://www.w3.org/2000/svg','a');
			link.setAttributeNS('http://www.w3.org/1999/xlink','href','http://localhost/');
			link.appendChild(document.createTextNode('link'));
			expected.appendChild(link);
			require('./attribute_namespace_test/Stasc');
			var actual = attribute();
			actual.Href = 'http://localhost/'
			actual.isEqualNode(expected).should.be.ok;

			done();
		});
	});
});


describe('ss.xml with stasc property tag', function () {
	it('should generate dom object with property accessor', function (done) {
		child_process.exec('bash -c ../../stasc', {cwd: 'test/property_test'}, function (error, stdout, stderr) {
			should.not.exist(error);
			stderr.should.equal('');

			var expected = document.createElement('a');
			expected.setAttribute('href','http://localhost/')
			expected.appendChild(document.createTextNode('link'));
			require('./property_test/Stasc');
			var actual = property();
			actual.Text = 'link';
			actual.isEqualNode(expected).should.be.ok;

			done();
		});
	});
});

describe('ss.xml with stasc format tag', function () {
	it('should generate dom object with formatting accessor', function (done) {
		child_process.exec('bash -c ../../stasc', {cwd: 'test/format_test'}, function (error, stdout, stderr) {
			should.not.exist(error);
			stderr.should.equal('');

			var expected1 = document.createElement('span');
			expected1.appendChild(document.createTextNode('hello world'));
			var expected2 = document.createElement('span');
			expected2.appendChild(document.createTextNode('Hello World'));
			require('./format_test/Stasc');
			var actual = format();
			actual.isEqualNode(expected1).should.be.ok;
			actual.First = "Hello";
			actual.Second = "World";
			actual.isEqualNode(expected2).should.be.ok;

			done();
		});
	});
});

describe('ss.xml with stasc plug tag', function () {
	it('should generate dom object with pluggable graft', function (done) {
		child_process.exec('bash -c ../../stasc', {cwd: 'test/plug_test'}, function (error, stdout, stderr) {
			should.not.exist(error);
			stderr.should.equal('');

			var expected = document.createElement('div');
			expected.appendChild(document.createTextNode('Zurich'));
			expected.appendChild(document.createElement('br'));
			expected.appendChild(document.createTextNode('Switzerland'));
			require('./plug_test/Stasc');
			var actual = parent();
			actual.Separator = child();
			actual.isEqualNode(expected).should.be.ok;

			done();
		});
	});
});

describe('ss.xml with double definition', function () {
	it('should fail', function (done) {
		child_process.exec('bash -c ../../stasc', {cwd: 'test/double_def_test'}, function (error, stdout, stderr) {
			should.exist(error);
			stderr.should.not.equal('');

			done();
		});
	});
});

