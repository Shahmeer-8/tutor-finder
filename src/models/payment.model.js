const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    tutor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    commission: {
      type: Number,
      required: true,
      default: 10, // 10%
      min: 0,
      max: 100,
    },
    netAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending',
    },
    transactionId: {
      type: String,
      unique: true,
      sparse: true, // Only unique if it exists
    },
    paymentMethod: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to calculate net amount automatically if not provided
paymentSchema.pre('save', function (next) {
  if (this.isModified('amount') || this.isModified('commission')) {
    const commissionAmount = (this.amount * this.commission) / 100;
    this.netAmount = this.amount - commissionAmount;
  }
  next();
});

// Indexes
paymentSchema.index({ student: 1 });
paymentSchema.index({ tutor: 1 });
paymentSchema.index({ status: 1 });
paymentSchema.index({ transactionId: 1 });

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
