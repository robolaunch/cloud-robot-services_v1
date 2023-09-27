const express = require("express");
const router = express.Router();
const responseSetter = require("../functions/responseSetter");

router.get("/", (req, res) => {
  responseSetter(
    res,
    200,
    "Backend is running. Please use the API endpoints to access data.",
    null
  );
});

module.exports = router;
