import mongoose from "mongoose";

const billingItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  priceAtBilling: {
    type: Number,
    required: true,
  },
});

const billingSchema = new mongoose.Schema(
  {
    // adminId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
    customerName: {
      type: String,
      require: true,
    },
    billDate: {
      type: Date,
      default: Date.now,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    items: {
      type: [billingItemSchema],
      validate: [arrayLimit, "Bill must contain at least one item"],
    },
  },
  { timestamps: true }
);

function arrayLimit(val) {
  return val.length > 0;
}

const Bill = mongoose.model("Bill", billingSchema);
export default Bill;
