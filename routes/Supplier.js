const router = require("express").Router();
const Joi = require("joi");

const {
  SupplierAdd,
  SuppliersGet,
  SupplierDelete,
  SupplierUpdate,
  SupplierGet,
} = require("../controllers/SupplierController.js");

const validateRequest = require("../middleware/validate-request.js");

const { authMiddleware } = require("../middleware/authMiddleware.js");
router.use(authMiddleware);

//? Supplier router
router.post("/supplier-add", AddValidation, SupplierAdd);
router.get("/supplier-get", SuppliersGet);
router.get("/supplier-get/:id", SupplierGet);
router.put("/supplier-update/:id", UpdateValidation, SupplierUpdate);
router.delete("/supplier-delete/:id", SupplierDelete);

function AddValidation(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().trim().min(2).max(100).required().messages({
      "string.base": "Name must be a string.",
      "string.empty": "Name cannot be empty.",
      "string.min": "Name must have at least 2 characters.",
      "string.max": "Name cannot exceed 100 characters.",
      "any.required": "Name is required.",
    }),
    email: Joi.string().email().lowercase().required().messages({
      "string.base": "Email must be a string.",
      "string.email": "Email must be a valid email address.",
      "any.required": "Email is required.",
    }),
    phone: Joi.string()
      .pattern(/^\+?\d{10,15}$/)
      .required()
      .messages({
        "string.pattern.base": "Phone number must be valid with 10-15 digits.",
        "any.required": "Phone number is required.",
      }),
    address: Joi.string().trim().max(255).optional().messages({
      "string.base": "Address must be a string.",
      "string.max": "Address cannot exceed 255 characters.",
    }),
  });

  validateRequest(req, res, next, schema);
}

//? Joi Validation for Updating a Supplier
function UpdateValidation(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().trim().min(2).max(100).optional().messages({
      "string.base": "Name must be a string.",
      "string.min": "Name must have at least 2 characters.",
      "string.max": "Name cannot exceed 100 characters.",
    }),
    email: Joi.string().email().lowercase().optional().messages({
      "string.email": "Email must be a valid email address.",
    }),
    phone: Joi.string()
      .pattern(/^\+?\d{10,15}$/)
      .optional()
      .messages({
        "string.pattern.base": "Phone number must be valid with 10-15 digits.",
      }),
    address: Joi.string().trim().max(255).optional().messages({
      "string.base": "Address must be a string.",
      "string.max": "Address cannot exceed 255 characters.",
    }),
  }).min(1); // Ensure at least one field is provided for update

  validateRequest(req, res, next, schema);
}

module.exports = router;
