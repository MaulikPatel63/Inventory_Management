const router = require("express").Router();

//! Auth Router
router.use("/api/v1/auth", require("./Auth.js"));

//! Inventory Router
router.use("/api/v1/inventory", require("./Inventory.js"));

//! Supplier Router
router.use("/api/v1/supplier", require("./Supplier.js"));

//! CSV Router
router.use("/api/v1/csv", require("./Csv.js"));

module.exports = router;
