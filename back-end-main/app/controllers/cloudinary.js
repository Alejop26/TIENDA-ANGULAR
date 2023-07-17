import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config({path:'variables.env'});

//cloudinary config
// cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.API_KEY,
//     api_secret: process.env.API_SECRET
// });


cloudinary.config({ 
    cloud_name: 'dnnfqhmo1', 
    api_key: '266156155665555', 
    api_secret: 'u8ptmk6_lh5Cw-I7Em22vgEU2Gg' 
  });
export default cloudinary;