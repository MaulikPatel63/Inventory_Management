const Inventory = require("../models/Inventory.js");
const User = require("../models/User.js");

const InventoryAdd = async (req, res) => {
  try {
    const newInventory = new Inventory(req.body);
    await newInventory.save();
    res.status(201).json({ success: true, data: newInventory });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const InventorysGet = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, name } = req.query;

    const filter = {};
    if (status) filter.status = status;
    if (name) filter.name = { $regex: name, $options: "i" }; // Case-insensitive name search

    // Calculate the skip value for pagination
    const skip = (page - 1) * limit;

    // Fetch filtered and paginated inventorys
    const inventorys = await Inventory.find(filter).skip(skip).limit(Number(limit)).populate('supplier');
    if (!inventorys) {
      return res
        .status(404)
        .json({ success: false, message: "inventorys data not found!" });
    }
    const total = await Inventory.countDocuments(filter);

    // Respond with paginated and filtered data
    return res.status(200).json({
      success: true,
      count: inventorys.length,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
      data: inventorys,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const InventoryGet = async (req, res) => {
  try {
    const inventory = await Inventory.findById(req.params.id).populate('supplier');

    if (!inventory) {
      return res
        .status(404)
        .json({ success: false, message: "Inventory not found" });
    }

    res.status(200).json({ success: true, data: inventory });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const InventoryUpdate = async (req, res) => {
  try {
    const { name } = req.body;

    // Find the inventory by its ID
    const inventory = await Inventory.findById(req.params.id);

    if (!inventory) {
      return res
        .status(404)
        .json({ success: false, message: "Inventory not found" });
    }

    inventory.name = name || inventory.name;
    inventory.quantity = quantity || inventory.quantity;
    inventory.price = price || inventory.price;
    inventory.supplier = supplier || inventory.supplier;

    // Save the updated inventory
    await inventory.save();

    res.status(200).json({ success: true, data: inventory });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const InventoryDelete = async (req, res) => {
  try {
    const inventory = await Inventory.findByIdAndDelete(req.params.id);

    if (!inventory) {
      return res
        .status(404)
        .json({ success: false, message: "Inventory not found" });
    }

    res.status(200).json({
      success: true,
      message: "Inventory removed",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  InventoryAdd,
  InventorysGet,
  InventoryDelete,
  InventoryUpdate,
  InventoryGet,
};
