const { ServerApiVersion } = require('mongodb');

module.exports = {
    mongo: {
        connectionString: process.env.ME_CONFIG_MONGODB_SERVER || process.env.ME_CONFIG_MONGODB_URL,
    },
    options: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
};
