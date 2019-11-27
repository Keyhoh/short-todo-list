const builder = require('electron-builder');

builder.build({
    config: {
        "win": {
            "target": {
                "target": "zip",
                "arch": "x64"
            }
        },
        "files": [
            "!config",
            "!docs",
            "!src",
            "!test",
            "!webpack\.config\.js",
            "!\.babelrc",
            "!jsconfig.json"
        ]
    }
});