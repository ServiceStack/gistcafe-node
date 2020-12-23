const process = require('process');
const fs = require('fs');
const path = require('path');
const AsciiTable = require('./AsciiTable');

class Inspect {
    static vars(obj) {
        var inspectVarsPath = process.env.INSPECT_VARS;
        if (!inspectVarsPath || !obj)
            return;

        var varsPath = inspectVarsPath.replace(/\\/g,'/');
        if (varsPath.indexOf('/') >= 0) {
            let dir = path.dirname(varsPath)
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }
        }
        fs.writeFileSync(varsPath,JSON.stringify(obj));
    }

    static dump(obj) {
        let to = JSON.stringify(obj, null, 4);
        return to.replace(/"/g,'');
    }

    static printDump(obj) {
        console.log(Inspect.dump(obj));
    }

    static dumpTable(rows) {
        if (Array.isArray(rows)) {
            return AsciiTable.factory({ rows });
        }
        return AsciiTable.factory(rows);
    }

    static printDumpTable(rows) {
        console.log(Inspect.dumpTable(rows));
    }
}

module.exports = { Inspect };