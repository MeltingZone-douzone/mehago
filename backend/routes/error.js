const logger = require("../logging");

module.exports = {
  error404: function (req, res) {
    //없는 것들에 대한 처리 404 error
    if (req.accepts("html")) {
      res.status(404).render("error/404");
      return;
    }
    res.status(404).send({
      result: "fail",
      data: null,
      message: "Unknown Request",
    });
  },
  error500: function (err, req, res, next) {
    // 500 error
    logger.error(err.stack);
    if (req.accepts("html")) {
      // res.status(500).render("error/500");
      res.status(500).send(`<pre>${err.stack}</pre>`);
      return;
    }
    res.status(500).send({
      result: "fail",
      data: null,
      message: err.stack,
    });
  },
};
