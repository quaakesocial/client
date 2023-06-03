<script lang="ts" type="module">
  import axios from 'axios';
  import '../app.css';

  import Nav from '$lib/Nav.svelte';
  import NavLink from '$lib/NavLink.svelte';

  import type { LayoutData } from './$types';

  export let data: LayoutData;

  let Cookie: any;

  Cookie = {
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

  function post() {
    const token: string | null = Cookie.get('token');
    axios.get('/api')
        .then(async (res) => {
          const apiUrl = res.data;

          const { data } = await axios.post(`${apiUrl}/createPost`, {
            content: document.getElementById('content')?.value
          }, {
            headers: {
              Authorization: token
            }
          })
          location.href = `/$${data.id}`;
        });
  }
</script>

<svelte:head>
  <link rel="icon" href="/favicon.svg">
</svelte:head>

<Nav>
  <NavLink href="/" title={true}>quake</NavLink>
  <div class="space-x-6 mt-1">
    <NavLink href="/">home</NavLink>
    <NavLink href="/explore">explore</NavLink>
    <NavLink href="/about">about</NavLink>
    {#if data.loggedIn}
      <!-- todo: make positioned to left -->
      <NavLink href={`/@${data.user.username}`}>
        {data.user.username}
      </NavLink>
    {/if}
  </div>
</Nav>

{#if data.loggedIn}
  <button class="bg-primary w-16 h-16 fixed bottom-4 right-4 rounded-[50%] flex items-center justify-center text-4xl font-thin font-sans">
    +
  </button>
{/if}

<slot />