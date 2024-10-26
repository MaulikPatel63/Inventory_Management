const router = require("express").Router();
const Joi = require("joi");

const {
  InventoryAdd,
  InventorysGet,
  InventoryDelete,
  InventoryUpdate,
  InventoryGet,
} = require("../controllers/InventoryController.js");

const validateRequest = require("../middleware/validate-request.js");

const { authMiddleware } = require("../middleware/authMiddleware.js");
router.use(authMiddleware);

//? Inventory router
router.post("/inventory-add", AddValidation, InventoryAdd);
router.get("/inventory-get", InventorysGet);
router.get("/inventory-get/:id", InventoryGet);
router.put("/inventory-update/:id", UpdateValidation, InventoryUpdate);
router.delete("/inventory-delete/:id", InventoryDelete);

function AddValidation(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required().messages({
      "string.base": "Name should be a string.",
      "string.empty": "Name cannot be empty.",
      "string.min": "Name should have at least 3 characters.",
      "string.max": "Name should not exceed 50 characters.",
      "any.required": "Name is required.",
    }),
    quantity: Joi.number().integer().min(0).required().messages({
      "number.base": "Quantity should be a number.",
      "number.min": "Quantity cannot be less than 0.",
      "any.required": "Quantity is required.",
    }),
    price: Joi.number().positive().precision(2).required().messages({
      "number.base": "Price should be a number.",
      "number.positive": "Price must be a positive value.",
      "any.required": "Price is required.",
    }),
    supplier: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required()
      .messages({
        "string.pattern.base": "Supplier ID must be a valid MongoDB ObjectId.",
        "any.required": "Supplier ID is required.",
      }),
  });

  validateRequest(req, res, next, schema);
}

function UpdateValidation(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).messages({
      "string.base": "Name should be a string.",
      "string.empty": "Name cannot be empty.",
      "string.min": "Name should have at least 3 characters.",
      "string.max": "Name should not exceed 50 characters.",
    }),
    quantity: Joi.number().integer().min(0).messages({
      "number.base": "Quantity should be a number.",
      "number.min": "Quantity cannot be less than 0.",
    }),
    price: Joi.number().positive().precision(2).messages({
      "number.base": "Price should be a number.",
      "number.positive": "Price must be a positive value.",
    }),
    supplier: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .messages({
        "string.pattern.base": "Supplier ID must be a valid MongoDB ObjectId.",
      }),
  }).min(1); // Ensures at least one field is being updated

  validateRequest(req, res, next, schema);
}

module.exports = router;
