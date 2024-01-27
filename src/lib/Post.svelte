<script lang="ts">
  import { fade } from 'svelte/transition';
  import { marked } from 'marked';

  import axios from 'axios';

  export let post: {
    by: string,
    content: string,
    id: string,
    loves: string[],
    ago: string
  };

  let api: string;
  let id: string;
  let token: string | null;
  let loggedIn: boolean = true;

  const Cookie = {
    set: (name: string, value: string, expiresIn: number): void => {
      const d = new Date();
      const t = d.getTime();
      const et = t + expiresIn;
      d.setTime(et);
      document.cookie = `${name}=${value};${et};path=/`;
    },
  
    delete: (name: string): void => {
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/`;
    },

    get: (name: string): string | null => {
      const cookieName = `${name}=`;
      const decodedCookie = decodeURIComponent(document.cookie);
      const cookieArray = decodedCookie.split(';');
      for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
        while (cookie.charAt(0) == ' ') {
          cookie = cookie.substring(1);
        }
        if (cookie.indexOf(cookieName) == 0) {
          return cookie.substring(cookieName.length, cookie.length);
        }
      }
      return null;
    }
  };

  async function lovePost() {
    let res;
    if(post.loves.includes(id)) {
      res = await axios.delete(`${api}/p/${post.id}/love`, { headers: {
        Authorization: token
      } });
    } else {
      res = await axios.post(`${api}/p/${post.id}/love`, null, { headers: {
        Authorization: token
      } });
    }
    post.loves = res.data.loves;
  }

  if(typeof window != 'undefined') {
    (async () => {
      token = Cookie.get('token');
      loggedIn = !!token;
      const { data } = await axios.get('/api')
      api = data;
      const { data: user } = await axios.get(`${api}/whoami`, { headers: {
        Authorization: token
      } });
      id = user.id;
    })();
  }
</script>

<div class="bg-[#15151A] w-[30em] rounded-lg p-10">
  <div class="w-full h-12 border-b-[#3a3a49] border-b-[1px]">
    <a class="font-semibold !text-white !no-underline" href={`/@${post.by}`}>@{post.by}</a>
  </div>
  <br>
  <div class="font-regular"> 
    {@html marked.parse(post.content)}
  </div>
  <br>
  <a class="!text-[#3a3a49] !no-underline" href={`/$${post.id}`}>{post.ago} - {post.id}</a>
  <button class="flex items-center gap-2 bg-inherit outline-inherit border-none p-0 hover:bg-inherit" title={`loved by ${post.loves.join(', ')}`} on:click={async () => { if(loggedIn) { await lovePost() } } }>
  {#if post.loves.includes(id)}
    <svg in:fade={{ duration: 200 }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.6" class="w-6 h-6 fill-primary-500 stroke-primary-500">
      <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
  {:else}
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.6" class="w-6 h-6 fill-[#202026] stroke-white">
      <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
  {/if}
  <span>{post.loves.length}</span>
</div>