module.exports = {
    roots: ["<rootDir>/src"],
    transform: {
      "^.+\\.tsx?$": "ts-jest"
    },
    // solve 'import css' error
    "moduleNameMapper": {
        "\\.(css|less|scss|sss|styl)$": "<rootDir>/node_modules/jest-css-modules"
      },
    
    setupTestFrameworkScriptFile: "<rootDir>/src/setupEnzyme.ts"
};