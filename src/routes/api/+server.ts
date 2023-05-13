import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
 
export const GET = (({ url }) => {
  return new Response(import.meta.env.VITE_API_URL);
}) satisfies RequestHandler;