/*
 * grunt-task-newer-lib
 * https://github.com/drawk/grunt-task-newer-lib
 *
 * Copyright (c) 2013 Gilles G.
 * Licensed under the MIT license.
 */

'use strict';


var statSync = require('fs').statSync;


/**
 * @param {string} file
 * 
 * @return {Object}
 */
var getStatFile = function(file) {
    var stat;

    try {
        stat = statSync(file);
    } catch (exception) {
        stat = null;
    }

    return stat;
};

/**
 * @param {Object} stat
 * 
 * @return {number}
 */
var getModifiedTime = function(stat) {
    var mtime;

    try {
        mtime = stat.mtime.getTime();
    } catch (exception) {
        mtime = 0;
    }

    return mtime;
};

/**
 * @param {string}          target
 * @param {Array.<string>}  files
 * 
 * @return {boolean}
 */
exports.outofdate = function(target, files) {
    var targetStat = getStatFile(target);

    if (!targetStat) {
        return true;
    }

    var targetModifiedTime = getModifiedTime(targetStat);

    if (!targetModifiedTime) {
        return true;
    }

    for (var i = 0, iCount = files.length; i < iCount; i++) {
        var fileStat = getStatFile(files[i]);

        if (fileStat === null) {
            continue;
        }

        if (getModifiedTime(fileStat) > targetModifiedTime) {
            return true;
        }
    }

    return false;
};