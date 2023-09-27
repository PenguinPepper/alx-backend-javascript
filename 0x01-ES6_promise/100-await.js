import uploadPhoto from './utils.js';
import createUser from './utils.js';

export default async function asyncUploadUser() {
  try {
    const response_from_uploadPhoto_function = await uploadPhoto();
    const response_from_createUser_function = await createUser();

    const new_obj = {
      photo: response_from_uploadPhoto_function,
      user: response_from_createUser_function,
    };

    return new_obj;
  } catch () {
    const catch_obj = { 
      photo: null,
      user: null,
    };

    return catch_obj;
  }
}
