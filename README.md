
<h1 align="center">AUTOMATON <br/><div><h6><i>A New Fun Way To Build Bot</i></h6></div></h1>

<div align="center">
    
![Branches](https://raw.githubusercontent.com/aikosiadotcom/automaton/main/badges/coverage-branches.svg?raw=true)
![Functions](https://raw.githubusercontent.com/aikosiadotcom/automaton/main/badges/coverage-functions.svg?raw=true)
![Lines](https://raw.githubusercontent.com/aikosiadotcom/automaton/main/badges/coverage-lines.svg?raw=true)
![Statements](https://raw.githubusercontent.com/aikosiadotcom/automaton/main/badges/coverage-statements.svg?raw=true)
![Jest coverage](https://raw.githubusercontent.com/aikosiadotcom/automaton/main/badges/coverage-jest%20coverage.svg?raw=true)
    
</div>

## HOW AUTOMATON LOAD YOUR BOT?

Automaton will load your bot based on:

1. **automaton** field on **package.json** 

2. load and instantiate your class based on **main** field in **package.json**

package.json
```
{
    "main": "index.js",
    "automaton":{
        "version": "1.0.0",
        "profile": "default",
        "cronjob": false,
        "runParameter": "page"
    },
    "type":"module"
}
```

3. your package.json must have field "type" = "module"

## Automaton Key Field

you can access this key field inside your class using following syntax:

```
this._manifest["profile"];//default
```

Below are some of the important automaton key field

### __version__ <Required>

Will be used when there is a major update in the future for compability.

### profile <Required>

this field will always **default** when in development mode based on process.env.NODE_ENV.

### cronjob <Required>

this field will always **false** when in development mode based on process.env.NODE_ENV.

if the cronjob is false (boolean value), then automaton will keep your bot alive until it's die.

if your bot run at spesific time, you can write using linux cronjob syntax or you can found out more on [node-cron](https://www.npmjs.com/package/node-cron)

### runParameter <Required>

automaton will pass a variable to method **run** based on this field

## FOR DEVELOPER

### HOW TO PUBLISH YOUR BOT

Please using:

```
npm run release
```

### NOTE

1. Dont't forget to **export** your class using **default** as following:

file: index.js
```
import Automaton from '@aikosia/automaton';

class YourBot extends Automaton{
    async run(context){
        const page = await context.newPage();
        await page.goto("https://google.com");
        await page.close();
    }
}

export default YourBot;
```

2. we add so many extension on **Page** class inside namespace automaton.

```
page.automaton.waitForResponse({goto:"https://google.com", waitUrl:"bla/bla", responseType: "json"});
```

# CLIENT OR @aikosia/automaton-cli

this module will be install automatically when you install @aikosia/automaton.

of course, if you can install it globally you can use this syntax:

```
npm install -g @aikosia/automaton-cli
```

and then you can type **automaton** on your command line to show all commands.

# DAEMON

PLEASE NOT, WE ARE NOT EXPOSED DAEMON TO PUBLIC YET. 

IF YOU HAVE ACCESS TO THIS MODULE, PLEASE FOLLOW BELOW TUTORIAL **ONE TIME** setup daemon module. 

## LINUX SERVER

### SETUP DAEMON

1. Fetch source code project automaton into your server

```
git clone [url_project]
```

2. Run following command on root directory:

```
npm install --verbose
```

3. Link to npm global packages directories

```
npm install . -g
```

### SETUP PM2 - KEEP ALIVE WHEN REBOOT

1. please install pm2 on your server using:

```
npm install -g pm2
```

2. To generate the startup script, simply run the following command:

```
pm2 startup
```

follow the guide based on the output, until you copy and run the script as describe by the output.

To confirm that the PM2 startup service is up and running under systemd, run the following command (replace the pm2-[user].service with the actual name of your service, check the output of the previous command):

```
systemctl status pm2-root.service
```

3. Next, you want to start your Node.js applications using PM2 as follows. If you already have them up and running, started via PM2, you can skip this step:

```
pm2 start npm --name "automaton-daemon" -- run "start"
```

4. Next, you need to register/save the current list of processes you want to manage using PM2 so that they will re-spawn at system boot (every time it is expected or an unexpected server restart), by running the following command:

```
pm2 save
```

additional, *pm2 cleardump* for unsaved

5. Finally, you need to test if the setup is working fine. Restart your system, and check if all your Node.js processes are running under PM2.

```
pm2 ls
or
pm2 status
```
