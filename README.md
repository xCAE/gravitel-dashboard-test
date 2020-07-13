This test project was created with Webpack, Typescript, Babel, React, Apollo Client and Recharts.

Below you will find some information on how to perform common tasks.<br>
## Table of Contents

- [Folder Structure](#folder-structure)
- [Available Scripts](#available-scripts)
  - [npm start](#npm-start)
  - [npm run bundle && npm servor ./dist](#npm-run-bundle)

## Folder Structure

```
gravitel-dashboard-test/
  src/
    features/
      dashboard/
        chart.component.tsx
        chartControls.component.tsx
        dashboard.component.tsx
        dashboard.graphql
        dashboard.styles.ts
      login/
        login.component.tsx
        login.graphql
        login.interfaces.ts
        login.styles.ts
      app.component.tsx
      authentiaction.graphql
      global.d.ts
      index.html
      index.tsx
  .babelrc  
  .editorconfig  
  .eslintts.json  
  .gitignore  
  .graphqlconfig
  package.json
  README.md
  remote-schema.graphql
  tsconfig.ts
  webpack.config.dev.ts
  webpack.config.ts
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

### `npm run build && npx servor ./dist`

Runs the app in the production mode.<br>
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.
