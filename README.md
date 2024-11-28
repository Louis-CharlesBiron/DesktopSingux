# DesktopSingux

--- STRUCTURE DOCUMENTATION ---

convertToExeTEMP/ allows to convert .ps1 -> .exe (will be removed once we have all definitive .exe)

DesktopSinguxDeploy/  contains the app and its deployable means

src/  contains the app's source code and the package.json

back/  contains everything related to the backend
    scripts/ contains backup/unminified powershell scripts
    scripts.js contains the minified powershell scripts of scripts/
    Client.js represents the connected neutralino app (UI) via websockets
    server.js is the main backend file

public/  contains everyting related to the frontend
    assets/  contains images and utility scripts
        setup.js contains the setup stuff
    index.js is the main frontent file


neutralino.config.json contains the frontend (UI) configurations

ex/  contains the app runner (ONLY FOR PRODUCTION)

bin/  contains the neutralinojs binaries (for dev i think)