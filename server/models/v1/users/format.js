"use strict";

module.exports = function () {
    function base(data) {
        function modelStructure(item) {
            item = item.dataValues;

            return {
                id: item.id,
                name: item.name,
                email: item.email,
                role: item.role,
                birthday: item.birthday,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt,
                token: item.token,
                tokenExpiresAt: item.tokenExpiresAt,
                refreshToken: item.refreshToken
            }
        }

        // when data - array with models
        if (Array.isArray(data)) {
            let result = data.map(function (user) {
                return modelStructure(user);
            });

            return result;
        }

        return modelStructure(data);
    }

    return {
        base: base
    }
};