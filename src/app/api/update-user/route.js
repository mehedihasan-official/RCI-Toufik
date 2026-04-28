import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export const runtime = 'nodejs';

export async function PATCH(req) {
  try {
    await connectDB();

    const { email, isAdmin } = await req.json();

    const updatedUser = await User.findOneAndUpdate(
      { email },
      { isAdmin },
      { new: true }
    );

    if (!updatedUser) {
      return new Response(JSON.stringify({ message: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify(updatedUser), {
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
