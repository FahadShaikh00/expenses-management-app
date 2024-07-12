// utils/jwtHelper.js
import {jwtDecode} from 'jwt-decode'; // Correct import statement
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getDecodedToken = async () => {
  try {
    // Get the token from AsyncStorage
    const token = await AsyncStorage.getItem('jwt_token');

    if (token) {
      // Decode the token
      const decodedToken = jwtDecode(token); // Use jwt_decode directly
      return decodedToken;
    } else {
      console.log('No token found');
      return null;
    }
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export const getUserInfo = async () => {
  const decodedToken = await getDecodedToken();

  if (decodedToken) {
    const email = decodedToken.email;
    const userId = decodedToken.UserId;
    const username = decodedToken.Username;
    const phone = decodedToken.Phone;

    return { email, userId, username, phone };
  } else {
    return null;
  }
};
