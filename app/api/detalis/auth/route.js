
import { pusher } from "../../pusher/route.js";

// export default async function handler( req, res ) {
//   // see https://pusher.com/docs/channels/server_api/authenticating-users
//   // console.log(req.body)
//   const { socket_id, channel_name, username } = req.body;

//   // use JWTs here to authenticate users before continuing

//   const randomString = Math.random().toString(36).slice(2);

//   const presenceData = {
//     user_id: randomString,
//     user_info: {
//       username: "@" + username,
//     },
//   };

//   try {
//     const auth = pusher.authenticate(socket_id, channel_name, presenceData);
//     res.send(auth);    
//   } catch (error) {
//       console.error(error)
//   }
  
// }


export async function POST(request){
 

//console.log(searchParams.get("socket_id"));

  const body = await request.text()

  const data=JSON.stringify(body)
 const data1=eval(data)

  const spl=data1.split('&')
  let result1=spl[0].split('=')
  let result2 =spl[1].split('=')
  let result3=spl[2].split('=')
console.log(result1[1],result2[1],result3[1]);

const socket_id=result1[1]
const channel_name=result2[1]
const username =result3[1]
    console.log(channel_name);
console.log(channel_name);
       const randomString = Math.random().toString(36).slice(2);

  const presenceData = {
    user_id: randomString,
    user_info: {
      username: "@" + username,
    },
  };
console.log(presenceData)
  try {
    const auth = pusher.authenticate(socket_id, channel_name, presenceData);
    // res.send(auth); 
    console.log(auth) 
    return Response.json(auth)  
  } catch (error) {
      console.error(error)
  }
 
}

