# Contact Manager CLI

Small command line tool to create contacts from your terminal. Utilizes [Google Cloud Functions](https://cloud.google.com/functions/) for HTTP triggers, [Firebase](https://firebase.google.com) for persistent storage and plain old [NodeJS](https://nodejs.org/en/).

## Getting Started

These simple steps will get you a working copy of the application.

```bash
$ git clone https://github.com/Wyvarn/contact-manager-cli.git
```
> this will clone the repo and create a contact-manager-cli directory

If you prefer a different name for the project

```bash
$ git clone https://github.com/Wyvarn/contact-manager-cli ~/<YOUR_OTHER_NAME_FOR_PROJECT>
```

## Requirements

You will need a couple of things to get started:

1. *NodeJS and npm*

   Ensure you have NodeJS installed on your environment. You can get installation instructions from [here](https://nodejs.org/en/download/)

2. *Firebase CLI*
   
    Get firebase-tools installed on your development environment. This will be used to manage the project and configure Cloud functions.

    ```bash
    $ npm install -g firebase-tools
    ```

    More instructions on using firebase-tools can be found [here](https://firebase.google.com/docs/cli/)

## Setting up

Setting up the project is easy, once you have all the requirements checked, then you can setup as follows:

``` bash
$ npm install
# if using yarn
$ yarn install
```    
> This will install all the dependencies you need in node_modules/ directory

Once you have installed dependencies here, change directory into `firefunctions/functions` and install dependencies there too

```bash
$ cd firefunctions/functions
$ npm install # or yarn install
```

Now you can use `firebase-tools` to setup your project with firebase

``` bash
$ firebase login # logs you into firebase console
```

## Running the app

You will need to setup a project on Firebase console after which you can enable the project in the firefunctions directory.

```bash
$ cd firefunctions
$ firebase use <PROJECT_ID>
```

Next step is to deploy functions:

```bash
$ npm run deploy
```
> Run this command inside the `firefunctions` directory 

After which you can take the CLI for a run.

```bash
$ cd .. # if in the firefunctions directory
$ npm run build
$ npm install -g
$ npm link # not necessary
``` 

This will run a build and transpile the code before setting it in the build/ directory. You can then install it globally and link if necessary.

One thing to keep in mind: During development, any change you make in the project will not be visible if you simply execute the contact command with the given options. If you run `which contact-manager`, you will realize that the path of contact is not the same as the project path in which you are working. To prevent this, simply run `npm link` in your project folder. This will automatically establish a symbolic link between the executable command and the project directory. Henceforth, whatever changes you make in the project directory will be reflected in the contact command as well.

[![forthebadge](http://forthebadge.com/images/badges/uses-js.svg)](http://forthebadge.com)
[![forthebadge](http://forthebadge.com/images/badges/built-with-grammas-recipe.svg)](http://forthebadge.com)