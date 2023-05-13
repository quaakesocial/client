import { error } from '@sveltejs/kit';
import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

/** @type {import('./$types').PageLoad} */
export async function load({ params, fetch }) {
  const res = await fetch('/api');
  const api = await res.text();
  if(params.slug.startsWith('$')) {
    const id = params.slug.split('$')[1];
    const res = await axios.get(`${api}/p/${id}`);
    const post = res.data;
    return {
      type: 'post',
      post
    }
  } else if(params.slug.startsWith('@')) {
    const name = params.slug.split('@')[1];
    const res = await axios.get(`${api}/u/${name}`);
    const user = res.data;
    dayjs.extend(relativeTime);
    const ago = dayjs(user.joinDate).fromNow();
    const keys = Object.keys(user.posts);
    let parsedPosts: {}[] = [];
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const post = user.posts[key];
      parsedPosts.push(post);
    }
    return {
      type: 'user',
      user,
      ago,
      posts: parsedPosts
    }
  }

  throw error(404, 'Not found')
}