import type { LayoutServerLoad } from './$types';
import axios from 'axios';

export const load = (async ({ cookies, fetch }) => {
  const token = cookies.get('token');
  let loggedIn = !!token;
  const res = await fetch('/api');
  const api = await res.text();

  if(loggedIn) {
    const { data: user } = await axios.get(`${api}/whoami`, {
      headers: { Authorization: token }
    });

    if(!user.error) {
      return {
        token,
        user,
        loggedIn
      }
    } else {
      return {
        loggedIn: false
      }
    }
  } else {
    return {
      loggedIn
    }
  }
}) satisfies LayoutServerLoad;