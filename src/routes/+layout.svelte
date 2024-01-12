<script lang="ts" type="module">
  import '../app.css';

  import Nav from '$lib/Nav.svelte';
  import NavLink from '$lib/NavLink.svelte';
  import NewPost from '$lib/NewPost.svelte';
  import { fade } from 'svelte/transition';

  import type { LayoutData } from './$types';

  export let data: LayoutData;

  let Cookie: any;
  let isOverlayOpen: boolean = false;

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
</script>

<svelte:head>
  <link rel="icon" href="/favicon.svg">
</svelte:head>

<Nav>
  <NavLink href="/" title={true}>quaake</NavLink>
  <div class="space-x-6 mt-1">
    <NavLink href="/">home</NavLink>
    <NavLink href="/explore">explore</NavLink>
    <NavLink href="/about">about</NavLink>
    {#if data.loggedIn}
      <NavLink href={`/@${data.user.username}`}>
        {data.user.username}
      </NavLink>
    {/if}
  </div>
</Nav>

{#if data.loggedIn}
  <button
    on:click={() => isOverlayOpen = true}
    class="bg-primary w-16 h-16 fixed bottom-4 right-4 rounded-[50%] flex items-center justify-center text-4xl font-thin font-sans"
  >
    +
  </button>

  {#if isOverlayOpen}
    <div transition:fade={{ delay: 250, duration: 300}} on:click={() => isOverlayOpen = false} class="w-screen h-screen fixed top-0 left-0 flex justify-center items-center bg-black opacity-90 z-[9999999]">
      <div on:click|stopPropagation class="bg-white/5 px-6 py-4 rounded-md opacity-1">
        <a on:click={() => isOverlayOpen = false} class="float-right text-3xl !text-white !no-underline">x</a>
        <NewPost />
      </div>
    </div>
  {/if}
{/if}

<slot/>