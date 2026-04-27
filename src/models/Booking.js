import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    resortId: {
      type: String,
      required: true,
    },
    resortName: String,
    checkIn: String,
    checkOut: String,
    totalPrice: Number,
    status: {
      type: String,
      default: 'pending',
    },
  },
  { timestamps: true }
);

export default mongoose.models.Booking || mongoose.model('Booking', BookingSchema);
