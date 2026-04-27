import connectDB from '@/lib/mongodb';
import Booking from '@/models/Booking';

export async function GET() {
  try {
    await connectDB();

    const bookings = await Booking.find();
    return new Response(JSON.stringify(bookings), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
