const { environment } = require('./environment')

let config = null

if (!process.env.NODE_ENV) {
    config = environment
} else {
    config = (process.env.NODE_ENV === "production") ? development : environment
}

global.AppConfig = config



