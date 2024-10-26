const Supplier = require("../models/Supplier.js");
const User = require("../models/User.js");

const SupplierAdd = async (req, res) => {
  try {
    const newSupplier = new Supplier(req.body);
    await newSupplier.save();
    res.status(201).json({ success: true, data: newSupplier });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const SuppliersGet = async (req, res) => {
  try {
    const { page = 1, limit = 10, name, email } = req.query;

    const filter = {};
    if (name) filter.name = new RegExp(name, "i");
    if (email) filter.email = { $regex: new RegExp(email, "i") };

    // Calculate the skip value for pagination
    const skip = (Number(page) - 1) * Number(limit);

    // Fetch filtered and paginated suppliers
    const suppliers = await Supplier.find(filter)
      .skip(skip)
      .limit(Number(limit))
      .exec();

    if (suppliers.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Suppliers data not found!" });
    }

    const total = await Supplier.countDocuments(filter);

    // Respond with paginated and filtered data
    return res.status(200).json({
      success: true,
      count: suppliers.length,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
      data: suppliers,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const SupplierGet = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
      return res
        .status(404)
        .json({ success: false, message: "Supplier not found" });
    }

    res.status(200).json({ success: true, data: supplier });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const SupplierUpdate = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;

    // Find the supplier by its ID
    const supplier = await Supplier.findById(req.params.id);

    if (!supplier) {
      return res
        .status(404)
        .json({ success: false, message: "Supplier not found" });
    }

    supplier.name = name || supplier.name;
    supplier.email = email || supplier.email;
    supplier.phone = phone || supplier.phone;
    supplier.address = address || supplier.address;

    // Save the updated supplier
    await supplier.save();

    res.status(200).json({ success: true, data: supplier });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const SupplierDelete = async (req, res) => {
  try {
    const supplier = await Supplier.findByIdAndDelete(req.params.id);

    if (!supplier) {
      return res
        .status(404)
        .json({ success: false, message: "Supplier not found" });
    }

    res.status(200).json({
      success: true,
      message: "Supplier removed",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  SupplierAdd,
  SuppliersGet,
  SupplierDelete,
  SupplierUpdate,
  SupplierGet,
};
