const errorRouter = require("./error");
const express = require('express');
// const models = require("../models");

const applicationRouter = {
    setup: async function (application) {
        application
            .all("*", function (req, res, next) {
                res.locals.req = req;
                res.locals.res = res;
                next();
            })
            .use(express.json()) // application/json
            .use("/message", require("./message"))

            .use(errorRouter.error404)
            .use(errorRouter.error500)
    }
};

module.exports = { applicationRouter };
