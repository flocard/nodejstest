var chai = require('chai');
var requireHelper = require('./require_helper');
var utils = requireHelper('/app/common/utils');
var assert = chai.assert;

var app;
describe('utils tests', function() {

    it('should return modulers', function() {
        var moduleName = utils.getNodeModuleName("modulers");
        assert.equal(moduleName, 'modulers', 'moduleName equal `modulers`');

        var moduleName = utils.getNodeModuleName("$");
        assert.equal(moduleName, 'appmaf', 'moduleName equal `appmaf`');
    });

    it('should return modulers-logger-config.json', function() {
        var configFileName = utils.resolveConfigFilename('modulers','logger-config.json');
        assert.equal(configFileName, 'modulers-logger-config.json', 'moduleName equal `modulers-logger-config.json`');
    });

    it('should return &gt; &lt; &apos; &quot; &amp;', function() {
        var escapedXML = utils.escapeXML('< > \' " &');
        assert.equal(escapedXML, '&lt; &gt; &apos; &quot; &amp;', 'escapedXML equal `&gt; &lt; &apos; &quot; &amp;`');
    });
});