Useful utils for [gist.cafe](https://gist.cafe) node.js Apps.

## Usage

Simple usage example:

```js
const { Inspect } = require('gistcafe');
const fetch = require('node-fetch');

(async () => {

    let orgName = "nodejs";

    let orgRepos = (await (await fetch(`https://api.github.com/orgs/${orgName}/repos`)).json())
        .map(x => ({
            name: x.name,
            description: x.description,
            lang: x.language,
            watchers: x.watchers_count,
            forks: x.forks
        }));

    orgRepos.sort((a, b) => b.watchers - a.watchers);

    console.log(`Top 3 '${orgName}' Github Repos:`);
    Inspect.printDump(orgRepos.slice(0, 3));

    console.log(`\nTop 10 '${orgName}' Github Repos:`);
    Inspect.printDumpTable(orgRepos.map(x => ({
        name: x.name, lang: x.lang, watchers: x.watchers, forks: x.forks
    })).slice(0, 10));

    Inspect.vars({ orgRepos });

})();
```

Which outputs:

```
Top 3 'nodejs' Github Repos:
[
    {
        name: node,
        description: Node.js JavaScript runtime :sparkles::turtle::rocket::sparkles:,
        lang: JavaScript,
        watchers: 75551,
        forks: 18843
    },
    {
        name: node-v0.x-archive,
        description: Moved to https://github.com/nodejs/node,
        lang: null,
        watchers: 34996,
        forks: 7620
    },
    {
        name: node-gyp,
        description: Node.js native addon build tool,
        lang: Python,
        watchers: 7080,
        forks: 1313
    }
]

Top 10 'nodejs' Github Repos:
.-----------------------------------------------------.
|        name         |    lang    | watchers | forks |
|---------------------|------------|----------|-------|
| node                | JavaScript |    75551 | 18843 |
| node-v0.x-archive   |            |    34996 |  7620 |
| node-gyp            | Python     |     7080 |  1313 |
| docker-node         | Dockerfile |     6118 |  1415 |
| http-parser         | C          |     5618 |  1445 |
| nan                 | C++        |     2867 |   443 |
| node-addon-examples | TypeScript |     1662 |   472 |
| readable-stream     | JavaScript |      848 |   192 |
| diagnostics         |            |      420 |    66 |
| build               | Shell      |      308 |   132 |
'-----------------------------------------------------'
```

Whilst `Inspect.vars()` lets you view variables in [gist.cafe](https://gist.cafe) viewer:

![](https://raw.githubusercontent.com/ServiceStack/gist-cafe/main/docs/images/vars-orgRepos-nodejs.png)

View and execute Dart gists with [gist.cafe](https://gist.cafe), e.g: [gist.cafe/58d4e2d53d8982ae108198e91fee4a69](https://gist.cafe/58d4e2d53d8982ae108198e91fee4a69).

## Features and bugs

Please file feature requests and bugs at the [issue tracker](https://github.com/ServiceStack/gistcafe-node/issues).