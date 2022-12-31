/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */

import * as fs from "fs";
import * as path from "path";
import * as parser from "xml2js";

var directory = process.argv.slice(2)[0];

let files  = [];

const getFilesRecursively = (directory) => {
    const filesInDirectory = fs.readdirSync(directory);
    for (const file of filesInDirectory) {
      const absolute = path.join(directory, file);
      if (fs.statSync(absolute).isDirectory()) {
          getFilesRecursively(absolute);
      } else if (/junit-report.xml$/.test(absolute)) {
          files.push(absolute);
      }
    }
  }

getFilesRecursively(directory);

const parseTestReport = (filename) => {
    fs.readFile(filename,  'utf8', (err, data) => {
        let failedTests;
        parser.parseString(data, { mergeAttrs: true }, (err, res) => {
            // console.log("READ FILE RESULTS: ", res)
            failedTests = findFailedTests(res);
        })

        failedTests?.forEach((test) => {
            console.error(test)
        });

        return failedTests;
    });
}

const findFailedTests = (obj) => {
    let testCases = [];

    if((obj).hasOwnProperty('testsuites') && (obj.testsuites).hasOwnProperty('testsuite')){         //check for test with multiple test suites
        let testSuites = obj.testsuites.testsuite;
        testSuites.forEach((test) => {
            if((test).hasOwnProperty('testcase')){
                testCases = testCases.concat(test.testcase)
            }
        })
    } else if((obj).hasOwnProperty('testsuite') && (obj.testsuite).hasOwnProperty('testcase')){     //check for single test suite
        testCases = obj.testsuite.testcase;
    }

    if (testCases.length !== 0) {
        const result = testCases.filter((el) => {
            return el.failure !== undefined;
        });
        return (result.length !== 0) ? result : undefined;
    }
};

files.forEach((filename) => {
    parseTestReport(filename);
})
