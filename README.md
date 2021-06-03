## System Requirements

- [git][git] v2.13 or greater
- [NodeJS][node] `12 || 14 || 15`
- [npm][npm] v6 or greater

All of these must be available in your `PATH`. To verify things are set up
properly, you can run this:

```shell
git --version
node --version
npm --version
```
If you have trouble with any of these, learn more about the PATH environment
variable and how to fix it here for [windows][win-path] or
[mac/linux][mac-path].

## Setup

```
npm install

npm install -g json-server
```

## Running the app

For this one, there's not much to the app itself. The whole reason we have the
app is just so you can see examples of the components that we'll be testing.
You'll spend most of your time in the tests.

To get the app up and running, run:

```shell
json-server --watch db.json --port 3005

npm start
```

and then you should good to go ~ TKS# esen-interview-test
