"use strict";

/**
 * @memberof CLI
 * @desc
 * Calls to repository to query for Objects are done through this sub-command
 */

//
// Imports
//
var log = require("../lib/util/log");
var cmdCore = require("./core");
var fs = require("fs");

//
// Action
//
module.exports = function(type, options) {
    cmdCore.init(options);

    cmdCore.connectToRepository(options, function(err, repo) {
        cmdCore.handleError(err);

        repo.queryObjects(type, {}, function(err, data) {
            cmdCore.handleError(err);

            if (options.parent.output) {
                fs.writeFileSync(options.parent.output, JSON.stringify(data));
            } else {
                log.info(data);
            }
        });
    });
};