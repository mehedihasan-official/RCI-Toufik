import connectDB from '@/lib/mongodb';
import Booking from '@/models/Booking';

export const runtime = 'nodejs';

export async function GET() {
  try {
    await connectDB();

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
