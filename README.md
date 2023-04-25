# INTRODUCTION

This project consist of submodules:

1. [CORE](https://github.com/aikosiadotcom/automaton-core#readme)
   
    For developer, you can install this package to build automaton bot.

   ```
   npm install @aikosia/automaton-core
   ```

   or, install [CLIENT](https://github.com/aikosiadotcom/automaton-cli#readme)

2. [DAEMON](https://github.com/aikosiadotcom/automaton-daemon#readme)

    A daemon which manage browser in a remote hosting

    ```
    npm install @aikosia/automaton-daemon
    ```

3. [CLIENT](https://github.com/aikosiadotcom/automaton-cli#readme)

    A command line interface for using automaton

    ```
    npm install @aikosia/automaton-cli -g
    ```

# DEVELOPING AUTOMATON LOCALLY

```
npm i -g meta
meta git clone https://github.com/aikosiadotcom/automaton.git
cd ./automaton
npm install
meta npm install
meta npm link --all
npm link
```

or, in one command:

```
npm i -g meta && meta git clone https://github.com/aikosiadotcom/automaton.git && cd ./automaton && npm install && meta npm install && meta npm link --all && npm link
```