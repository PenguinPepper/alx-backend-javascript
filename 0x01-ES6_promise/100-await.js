import uploadPhoto from './utils.js';
import createUser from './utils.js';

export default async function asyncUploadUser() {
  try {
    const response_from_uploadPhoto_function = await uploadPhoto();
    const response_from_createUser_function = await createUser();

    return {
      photo: response_from_uploadPhoto_function,
      user: response_from_createUser_function,
    };
  } catch () {
    return { 
      photo: null,
      user: null,
    };
  }
}
