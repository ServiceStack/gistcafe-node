const process = require('process');
const fs = require('fs');
const path = require('path');
const AsciiTable = require('./AsciiTable');


function allKeys(rows) {
    let to = [];
    rows.forEach(o => {
        for (let k in o) {
            if (to.indexOf(k) >= 0) continue;
            to.push(k);
        }
    });
    console.log('allKeys', to)
    return to;
}

function toRows(rows) {
    let keys = allKeys(rows);
    let to = [];
    rows.forEach(o => {
        let row = [];
        to.push(row);
        keys.forEach(k => {
            row.push(o[k] || '');
        });
    });
    console.log('toRows', to)
    return to;
}

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
        let table = Array.isArray(rows)
            ? AsciiTable.factory({
                heading: allKeys(rows),
                rows:    toRows(rows),
            })
            : AsciiTable.factory(rows);
        return table.toString();
    }

    static printDumpTable(rows) {
        console.log(Inspect.dumpTable(rows));
    }
}

module.exports = { Inspect };