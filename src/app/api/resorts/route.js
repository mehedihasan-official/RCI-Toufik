import connectDB from '@/lib/mongodb';
import Resort from '@/models/Resort';

export const runtime = 'nodejs';

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '15', 10);

    const skip = (page - 1) * limit;

    const resorts = await Resort.find().skip(skip).limit(limit);
    const totalCount = await Resort.countDocuments();
    const totalPages = Math.ceil(totalCount / limit);

    return new Response(
      JSON.stringify({
        resorts,
        totalPages,
        currentPage: page,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    const status = error.name === 'MongoConnectionError' ? 503 : 500;

    return new Response(JSON.stringify({ message: error.message }), {
      status,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
