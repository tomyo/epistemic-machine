"use strict";

const { reconstruct } = require("./working-views.js");

const root = process.argv[2];
if (!root) throw new Error("workspace path is required");
process.stdout.write(`${JSON.stringify(reconstruct(root))}\n`);
