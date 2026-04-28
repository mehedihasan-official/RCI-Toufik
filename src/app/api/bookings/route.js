import connectDB from '@/lib/mongodb';
import Booking from '@/models/Booking';

export const runtime = 'nodejs';

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    if (email) {
      const bookings = await Booking.find({ email });
      return new Response(JSON.stringify(bookings), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const bookings = await Booking.find();
    return new Response(JSON.stringify(bookings), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    const status = error.name === 'MongoConnectionError' ? 503 : 500;

    return new Response(JSON.stringify({ message: error.message }), {
      status,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function POST(req) {
  try {
    await connectDB();

    const { email, resortId, resortName, checkIn, checkOut, totalPrice, status } =
      await req.json();

    const newBooking = new Booking({
      email,
      resortId,
      resortName,
      checkIn,
      checkOut,
      totalPrice,
      status: status || 'pending',
    });

    const savedBooking = await newBooking.save();

    return new Response(JSON.stringify(savedBooking), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    const status = error.name === 'MongoConnectionError' ? 503 : 500;

    return new Response(JSON.stringify({ message: error.message }), {
      status,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
