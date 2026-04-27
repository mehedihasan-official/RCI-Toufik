import mongoose from 'mongoose';

const ResortSchema = new mongoose.Schema(
  {
    place_name: String,
    location: String,
    resort_ID: String,
    img: String,
    reviews_amount: String,
    ownerExclusive: String,
  },
  { timestamps: true, strict: false }
);

export default mongoose.models.Resort || mongoose.model('Resort', ResortSchema);
