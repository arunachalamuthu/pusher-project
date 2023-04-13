export async function GET(request) {
  return new Response('Hello, Next.js!')
}
export async function POST(request){
  const body = await request.json();
  console.log(body)
  //return Response.json({body})
}