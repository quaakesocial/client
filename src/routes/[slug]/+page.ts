import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
  if(params.slug.startsWith('$')) {
    return {
      type: 'post',
      id: params.slug.split('$')[1]
    }
  } else if(params.slug.startsWith('@')) {
    return {
      type: 'user',
      username: params.slug.split('@')[1]
    }
  }

  throw error(404, 'Not found')
}