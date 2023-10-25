/**
 * Import successFunction and errorFunction and set up global variables
 */
const { success, error } = require("./response"); //Response Object {success, error}

/**
 * @typedef {Object} - Response Object
 * @property {Function} - success response function
 * @property {Function} - error response function
 */
global.Response = { success, error };

/**
 * @global
 * @typedef {Function} - logging function
 */
global.log = console.log;
