import connectDB from '@/lib/mongodb';
import Resort from '@/models/Resort';

export const runtime = 'nodejs';

export async function GET() {
  try {
    await connectDB();

    const resorts = await Resort.find();
    return new Response(JSON.stringify(resorts), {
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
