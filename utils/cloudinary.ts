import { v2 as cloudinary } from "cloudinary";

// Configuration
const cloudinaryClient = cloudinary.config({
	cloud_name: "dozpb0ccl",
	api_key: "853296996793428",
	api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View Credentials' below to copy your API secret
});

export default cloudinaryClient;
