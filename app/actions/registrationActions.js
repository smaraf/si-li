/* eslint import/prefer-default-export:0 */

import types from '../constants/actionTypes';
import * as dataStore from '../core/persistence/firebase';

export function registerUserWithEmailAndPassword(email, password, confirmedPassword) {
  return async (dispatch) => {
    const setError = (message) => {
      dispatch({ type: types.REGISTRATION_ERROR_OCURRED, data: message });
    };

    if (password !== confirmedPassword) {
      setError('Whoops, it seems like you misspelled you password. Make sure they match');
      return false;
    }

    let registeredUser;
    try {
      registeredUser = await dataStore.createUserWithEmailAndPassword(email, password);
      dataStore.addUser(registeredUser);
      dispatch({ type: types.REGISTRATION_USER_REGISTERED, data: registeredUser });
    } catch (err) {
      switch (err.code) {
        case 'auth/email-already-in-use':
          setError('Whoops it seems like the email address is already in use, please use another one.');
          break;
        case 'auth/invalid-email':
          setError('Whoops it seems like we need a valid email address');
          break;
        case 'auth/weak-password':
          setError('Whoops it seems like we need a stronger password');
          break;
        default:
          setError('Everything went wrong. Please try again.');
      }
      return false;
    }

    try {
      const lists = await dataStore.getLists(registeredUser.uid);
      dispatch({ type: types.LISTS_LOADED, data: lists });
    } catch (err) {
      console.log('An error has ocurred while loading lists');
    }

    return true;
  };
}