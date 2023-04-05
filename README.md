## Circutor Technical Test

This is a very simple application that shows some energy data Helsinki buildings from 1st January 2021 to around 28 Feb 2022.

It has an API written in GO and a frontend written in React.

## Launch

Clone/Fork the repo with git clone <url>
Build the docker containers and launch the project with:
```sh
docker-compose up --build
```

The api is accessible on `http://localhost:1234/docs/index.html`
The frontend is accessible on `localhost:3001`

## Tasks

- Implement an error message when login fails
- Implement a small test for this new feature

Feel free to implement any other improvement as long as you write a test for it.

## List Redflags

Write here all red flags that you find in the code. Any examples that would stop a code review. If you want to fix some of them, go on

- Delete unused code.
- ~~Fix console warnings when start app. Most of these warnings are checking for unused code, missing hooks dependencies, javascript notation good practices,~~ Done.
- Avoid unnecesary function calls
- Rename function arguments to be descriptive. Use camelCase to name variables.
- ~~`setInterval` is used as name of a useState method, which is an error. `setInterval` is a reserved javascript function and can’t be used for naming variables or functions.~~ Done.
- ~~Incorrect use of MUI components, as `<Grid />` to add spacing or margins. We can replace that spacing with styled divs, or CSS applied to the content we want margin or padding. Also, MUI provides separators and space components.~~ Some Fixed.
- Create a single Layout for Header and Footer instead of repeating code in all components or create Footer and Header components and reuse them.
- ~~Remove unused `home` route.~~ Done.
- ~~Delete unnecesary `navigate(0)`~~ Done.
- Handle Errors.
- Use FormControl from MUI instead of useState() to handle form data on register and login pages.
- ~~Clean localStorage when logout.~~ Done.
- Use correct imports statements for React and don’t duplicate imports:
    
    ```jsx
    // Don't
    import * as React from 'react'
    import { useState } from 'react'
    
    // Correct: 
    import React, { useState } from 'react';
    ```


## How you would make this application maintainable and scalable

- Implement lint rules and formatting tools and guidelines across the application to follow company good practices. We can implement standard guidelines as [StandardJS](https://standardjs.com/).
- Implement Pre-Commit hooks with Husky and Commitizen to adopt good practices on Git Commits and use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).
- Gradually refactor folder structure to complain with more standard guidelines. As example, we could implement [BulletProof React model](https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md) which is a collection of best practices and design patterns for building scalable and maintainable React applications, or a customised version of it, adapted to the project and business needs. This can be done while we work on new features or bug fixing. No need to block the releases or make a big release that could add new bugs.
- Write tests for all the functions
- Implement E2E tests with Cypress.
- Implement correct naming on React components, files, functions, etc. This can be done while we work on new features or bug fixing. No need to block the releases or make a big release that could add new bugs. Examples:
    - We should use ***PascalCase*** to name components and the files that contain them.
    - Functions should be named with ***camelCase***. In several places, they are named with PascalCase, and this can be confusing since React Components should be use that notation in a React project.
    - Files are named using ***snake_case. To use a more standard notation and recommended naming,*** we should use ***PascalCase*** to name **JSX** or **React Components** files, and ***camelCase*** to name **pure javascript** files. ******
- Implement SOLID principles. In most of the app components, we’re mixing responsibilities, and tasks when we should have components with just one task each. Examples:
    - In the `LayoutRegister` component, we’re defining `validateEmail` function. We could split that code into a `utils` folder to be available across the app, and could be used in other places to validate emails, and just simply import the function in the `register.js` file.
- Discourage the use of `React.useEffect` hook inside UI components. We should try to use libraries as `react-query` and Custom Hooks to avoid side effects on the rendering process. Also, we should split API requests to a custom hook or a different file, to avoid the component to have more than one responsibility.  The components can receive props or use Contexts to render just the data they need to know about.
- Create utils functions to do external read/write/clean operations, like `localStorage` management. Also a good practice is wrap it on a custom hook.
- Avoid inline styles and mixed styling techniques. We’re using MUI, modules styles and inline styles. We should migrate to use just one. A solution would be implement `styled-components` that can be used also to style MUI components. This also can be done progressively while we work on different features or bug fixing.
- Use providers to implement Authentication. We can create an AuthContext and AuthProvider to share Auth data across the application. This is more scalable since every component wrapped in the AuthProvider can use the user data and know if the user is authenticated or not. Also, we can wrap the context in a `useAuth` hook to consume the context data in different parts of application.
- Use private and public routes. This can avoid manual redirections in the code. Just check if the user is authenticated when visiting routes and implement the logic and desired behaviour without processing code in vane.
- Allow absolute paths imports
- Security:
    - use `jwt` to encrypt password on login and register requests.
    - Login with empty values for email and password returns 200 and log in the user [`gdfg@login.com`](mailto:gdfg@login.com)
- Update colours to improve accessibility:
    - Background color and Font color are not accessibility friendly. We should increase contrast to complain accessibility rules for our users.

## Test submission

Please, submit this test as a new repository (a fork or a new one) in any free platform you want (bitbucket, gitlab, github, ..)