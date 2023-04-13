// import { pusher } from "../../pusher/router";
import { pusher } from "../../pusher/route.js";
// presence channel handler
// export default async function handler(req, res) {
//   // console.log(res.body)
//   const { message, username, userLocation } = req.body;
//   // trigger a new post event via pusher
//   await pusher.trigger("presence-channel", "chat-update", {
//     message,
//     username,
//     userLocation
//   });

//   res.json({ status: 200 });
// }


export async function POST(request){
  const body = await request.json();
  console.log(body)
  const { message, username} = body;
  console.log(message);
  await pusher.trigger("presence-channel", "chat-update", {
    message,
    username,
  });
  
  return Response.json({status:200})
}