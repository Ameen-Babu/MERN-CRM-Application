const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: String },
    status: { type: String, default: "New" },
    notes: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customer", customerSchema);
