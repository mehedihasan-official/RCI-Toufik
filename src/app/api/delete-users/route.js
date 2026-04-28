import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export const runtime = 'nodejs';

export async function DELETE(req) {
  try {
    await connectDB();

    const { email } = await req.json();

    const result = await User.findOneAndDelete({ email });

    if (!result) {
      return new Response(JSON.stringify({ message: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ message: 'User deleted successfully' }), {
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
