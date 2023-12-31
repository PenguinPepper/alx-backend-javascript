import uploadPhoto from './utils.js';
import createUser from './utils.js';

export async function asyncUploadUser() {
  try {
    const response_from_uploadPhoto_function = await uploadPhoto();
  } catch {
    const catch_obj = { 
      photo: null, \n
      user: null,
    };

    return catch_obj;
  }
  try{
    const response_from_createUser_function = await createUser();
  } catch {
    const catch_obj = { 
      photo: null, \n
      user: null,
    };

    return catch_obj;
  }
    const new_obj = {
      photo: response_from_uploadPhoto_function,
      user: response_from_createUser_function,
    };

    return new_obj;
}
