const express = require("express");
const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");
const path = require("path");
const Inventory = require("../models/Inventory");

const router = express.Router();

// Multer setup for file uploads
const upload = multer({
  dest: "uploads/",
  fileFilter: (req, file, cb) => {
    if (path.extname(file.originalname) !== ".csv") {
      return cb(new Error("Only CSV files are allowed!"), false);
    }
    cb(null, true);
  },
});

// **CSV Export Route**
router.get("/export", async (req, res) => {
  try {
    const inventories = await Inventory.find().populate("supplier", "name");

    // Create CSV header
    let csvData = "name,quantity,price,description,supplier\n";
    inventories.forEach((inventory) => {
      csvData += `${inventory.name},${inventory.quantity},${inventory.price},${inventory.description},${inventory.supplier.name}\n`;
    });

    res.header("Content-Type", "text/csv");
    res.attachment("inventory_data.csv");
    res.send(csvData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// **CSV Import Route**
router.post("/import", upload.single("file"), (req, res) => {
  const results = [];

  if (!req.file) {
    return res.status(400).json({ message: "Please upload a CSV file!" });
  }

  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", async () => {
      const validInventories = results.map((inventory) => ({
        name: inventory.name,
        quantity: Number(inventory.quantity),
        price: Number(inventory.price),
        description: inventory.description || "",
        supplier: inventory.supplier,
      }));

      try {
        await Inventory.insertMany(validInventories);
        res.json({ message: "Inventory data imported successfully!" });
      } catch (error) {
        res.status(500).json({ message: error.message });
      } finally {
        fs.unlink(req.file.path, (err) => {
          if (err) console.error("Error deleting file:", err);
        });
      }
    })
    .on("error", (error) => {
      res.status(500).json({ message: `Error reading CSV: ${error.message}` });
    });
});

module.exports = router;
