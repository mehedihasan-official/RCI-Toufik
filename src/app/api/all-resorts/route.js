import connectDB from '@/lib/mongodb';
import Resort from '@/models/Resort';

export async function GET() {
  try {
    await connectDB();

    const resorts = await Resort.find();
    return new Response(JSON.stringify(resorts), {
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
