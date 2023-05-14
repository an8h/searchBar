# Setup process

1. Download React Typescript template and give it a name
    `npx create-react-app react-boilerplate-typescript --template typescript`

2. Configure ESLint on the project
    * Run command: `npm init @eslint/config`
        * What would you like to use ESlint? -To check syntax, find problems, and enforce code style.
        * What type of modules does your project use? -JavaScript modules.
        * Which framework does your project use? -React
        * Does your project use TypeScript? -Yes
        * Where does your code run? -Browser
        * How would you like to define a style for your project -Use a popular style guide.
        * Which style guide do you want to follow? -Standard: https://github.com/standard/eslint-config-standard-with-typescript
        * What format do you want your config file to be in? -JSON
        * Would you like to install them now? -Yes
        * Which package manager do you want to use? -npm

3. Install airbnb eslint config for typescript
    `npm install eslint-config-airbnb-typescript --save-dev`

4. Update eslint.json
```
    {
        "env": {
            "browser": true,
            "es2021": true,
            "jest": true
        },
        "extends": [
            "react-app",
            "react-app/jest",
            "airbnb",
            "airbnb-typescript",
            "plugin:import/typescript"
        ],
        "parser": "@typescript-eslint/parser",
        "parserOptions": {
            "ecmaFeatures": {
                "jsx": true
            },
            "ecmaVersion": "latest",
            "sourceType": "module",
            "project": "./tsconfig.json"
        },
        "plugins": [
            "react",
            "@typescript-eslint"
        ],
        "rules": {}
    }
```

5. Update package.json scripts 
```
    "scripts": {
        "start": "react-scripts start",
        "build": "react-scripts build",
        "test": "react-scripts test",
        "eject": "react-scripts eject",
        "lint": "eslint .",
        "lint:fix": "eslint --fix ."
    },
```

6. Update eslint.json rules
```
    "rules": {
        "react/react-in-jsx-scope": ["off"],
        "react/jsx-uses-react": ["off"],
        "react/jsx-props-no-spreading": ["warn"],
        "react/no-unescaped-entities": ["off"]
    }
```

7. Install prettier dependencies
    `prettier eslint-config-prettier eslint-plugin-prettier --save-dev`

8. Create `.prettierrc` file at the root folder

9. Add rules to `.prettierrc` 
```
    {
    "tabWidth": 2,
    "semi": true,
    "singleQuote": false,
    "trailingComma": "all",
    "printWidth": 80,
    "useTabs": false,
    "endOfLine":"auto"
  }
```

10. Update the `eslintrc.json` as well so that it uses prettier now 
```
    {
        "env": {
            "browser": true,
            "es2021": true,
            "jest": true
        },
        "extends": [
            "react-app",
            "react-app/jest",
            "airbnb",
            "airbnb-typescript",
            "plugin:import/typescript",
            "plugin:prettier/recommended"
        ],
        "parser": "@typescript-eslint/parser",
        "parserOptions": {
            "ecmaFeatures": {
                "jsx": true
            },
            "ecmaVersion": "latest",
            "sourceType": "module",
            "project": "./tsconfig.json"
        },
        "plugins": [
            "react",
            "@typescript-eslint",
            "prettier"

        ],
        "rules": {
            "react/react-in-jsx-scope": ["off"],
            "react/jsx-uses-react": ["off"],
            "react/jsx-props-no-spreading": ["warn"],
            "react/no-unescaped-entities": ["off"]
        }
    }
```

11. Install Prettier extension for VSCode

12. Add rules in VSCode `settings.json`
```
    {
        "editor.accessibilitySupport": "off",
        "git.autofetch": true,
        "editor.codeActionsOnSave": null,
        "diffEditor.ignoreTrimWhitespace": false,
        "gitlens.views.remotes.branches.layout": "list",
        "security.workspace.trust.untrustedFiles": "open",
        "terminal.integrated.env.osx": {
            "FIG_NEW_SESSION": "1"
        },
        "editor.defaultFormatter": "esbenp.prettier-vscode",
        "editor.formatOnSave": true,
        "npm.keybindingsChangedWarningShown": true,
        "[markdown]": {
            "editor.formatOnSave": false
        }
    }
```

13. Remove  `standard eslint typescript package` from  `package.json`, remove `node_modules`, and run  `npm install`

14. Guide I followed: https://dev.to/suchintan/reacttypescripteslint-prettier-full-setup-p7j