/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */

module.exports = {
    "extends": [
        require.resolve("@fluidframework/eslint-config-fluid")
    ],
    "parserOptions": {
        "project": ["./tsconfig.json", "./src/test/tsconfig.json"]
    },
    "rules": {
        "@typescript-eslint/strict-boolean-expressions": "off"
    },
    overrides: [
        {
            // Rules only for type validation files
            files: ["**/types/*validate*Previous*.ts"],
            rules: {
                "@typescript-eslint/comma-spacing": "off",
            },
        },
    ],
}