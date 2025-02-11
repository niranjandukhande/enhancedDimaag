import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/user/addContent"; 
// interface ContentData {
//   userId: string;
//   title: string;
//   typeOfContent: string;
//   description: string; 
//   isPublic: boolean;
// }

export const createContent = async ({userId, title, typeOfContent, description, isPublic}) => {
  try {
    const response = await axios.post(API_URL, {
      title,
      typeOfContent,
      description,
      isPublic,
      userId
    });

    return response.data;
  } catch (error) {
    console.error("Error creating content:", error.response?.data || error.message);
    throw error;
  }
};
