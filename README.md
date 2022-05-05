# knit-tracker

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Features

- Support for modular Redux
- Consistent scaffolding using [Hygen](https://www.hygen.io/)
- Pre-configured Typescript / JavaScript linting using [ESLint](https://eslint.org/), and CSS / Sass Linting using [Stylelint](https://stylelint.io/)
- Testing configuration with some helpful `global` testing utilities for [Jest](https://jestjs.io/)
- Use absolute imports from the start
- Sonar static analysis

## Included Packages

- [Material UI](https://mui.com/)
- [classnames](https://github.com/JedWatson/classnames)
- [Day.js](https://day.js.org/) - a lightweight alternative for Moment
- [Lodash](https://lodash.com/)
- [Redux](https://redux.js.org/api/api-reference)
- [React Router](https://reactrouter.com/docs/en/v6)

## Performance monitoring features

- Lighthouse
- Core web vitals

## Getting Started

To get started, clone this repo to your computer:

```sh
git clone https://github.com/carrieforde/knit-tracker.git /path/to/project
```

Once you have cloned the project, move into the project directory and install all the Node dependencies:

```sh
cd /path/to/project
yarn install or npm install
```

Now you can run the following commands to run this application locally:

```sh
yarn start or npm start
```

### Setting up your new project

After you've cloned the repo, there are a couple of things you'll want to do:

1. Replace all instances of `knit-tracker` with the name of your project
1. Replace al instances of `knit-tracker` with the name of your project
1. In `/public` replace the `favicon.ico` with the `favicon.png` of your choice.
1. In `/public` replace `logo192.png` and `logo512.png` with a small, square logo of your choice (this will act as an app icon for progressive web apps)
1. Update `/public/manifest.json` as needed.
1. Update the `name` property in `src/package.json`
1. Add any required packages or utilities

## Project Structure

```
/ knit-tracker
+-- /_templates
+-- /.husky
+-- /public
+-- /src
    +-- /assets
    +-- /components
    +-- /config
    +-- /constants
    +-- /entities
    +-- /hooks
    +-- /pages
    +-- /mui
    +-- /services
    +-- /store
    +-- /styles
    +-- /test-utilities
    +-- /utilities
+-- .editorconfig
+-- .eslint.json
+-- .npmrc
+-- .prettierignore
+-- .prettierrc
+-- .stylelintrc
+-- lighthouserc.js
+-- package.json
+-- README.md
+-- sonar-project.properties
+-- tsconfig.json
+-- yarn.lock
```

## Available Scripts

In the project directory, you can run:

### 🛠 `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### 💅 `yarn format`

Applies consistent formatting to files throughout the project. Exclude files & directories from formatting by adding them to `.prettierignore`.

### 🔦 `yarn lighthouse`

Run Lighthouse against your build. In order to use this, you must first run `yarn build` then `yarn serve`. While your app is running, run `yarn lighthouse`.

### 🧽 `yarn lint`

Runs both `yarn lint:es` (for linting Typescript and JavaScript) and `yarn lint:style` (for linting CSS / Sass).

### ✨ `yarn new`

This consists of three subcommands, all of which scaffold files:

1. `yarn new:component <component-name>`
2. `yarn new:hook <hook-name>`
3. `yarn new:slice <slice-name>`

### 🧑‍🚀 `yarn preflight`

Runs all linting checks and tests with the coverage flag.

### 🍽 `yarn serve`

Run the built application locally. Required to run `yarn lighthouse`

### 🏃 `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### 🧑‍🔬 `yarn test`

Launches the test runner.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

To run tests in watch mode, use `yarn test:watch`. You can also run watch on files using glob patterns `yarn test:watch <pattern-name>`.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
