const express = require("express");

const router = express.Router();

// routing

// REGISTER || POST METHOD

// Post request from registration
const {
  registerController,
  testController,
  forgotPasswordController,
  updateProfileContainer,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
} = require("../controllers/authController");
const { loginController } = require("../controllers/loginController");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");
router.post("/register", registerController);

// Post request for login

router.post("/login", loginController);

// ForgotPassward

router.post("/forgot-password", forgotPasswordController);

// Test Route

router.get("/test", requireSignIn, isAdmin, testController);

// protected user route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

// protected Admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

// update profile
router.put("/profile", requireSignIn, updateProfileContainer);

//orders
router.get("/orders", requireSignIn, getOrdersController);

//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

module.exports = router;
