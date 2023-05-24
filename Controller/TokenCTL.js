const {sign} = require("jsonwebtoken");

const TokenController = {
    generateAccessToken: (user) => {
        return sign(
            {
                id: user.id,
                admin: user.admin,
            },
            process.env.KEY_ACCESS_TOKEN_JWT,
            { expiresIn: "30d" }
        );
    },

    generateRefreshToken: (user) => {
        return sign(
            {
                id: user.id,
                admin: user.admin,
            },
            process.env.KEY_REFRESH_TOKEN_JWT,
            { expiresIn: "30d" }
        );
    },
}

module.exports = TokenController;