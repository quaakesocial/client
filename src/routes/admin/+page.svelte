<script lang="ts" type="module">
  import type { LayoutData } from '../$types';
  import axios from 'axios';
  import dayjs from 'dayjs';
  import relativeTime from 'dayjs/plugin/relativeTime'

  dayjs.extend(relativeTime);

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
  }

  export let data: LayoutData;
  
  let postId: String;
  let userHandle: String;
  let posts: Object = {};
  let api = {};

  if(typeof window !== 'undefined') {
    if(!data.user.admin) {
      window.location.href = '/';
      console.log('ur not admin!!!')
    } else {
      // [TODO) implement the reported posts
    }
  }
</script>

<div class="p-12">
  <h1>admin panel</h1>
  <a href='/rules'>CHECK THE RULES BEFORE DELETING THEIR POST/USER</a>
  <br>
  <h3>delete a post:</h3>
  <input type="text" placeholder="post id without $" bind:value={postId} spellcheck="false">
  <button>delete</button>
  <br>
  <h3>delete a user:</h3>
  <input type="text" placeholder="user handle without @" bind:value={userHandle} spellcheck="false">
  <button>delete</button>
  <br>
  <h3>reported posts:</h3>
  <code>
    wip, send a request to the api on path "/getReportedPosts" with the body (in json) token: YOUR_TOKEN_HERE
  </code>
  <br>
  <p class="font-bold text-red-600">HERE ARE SOME RULES FOR THE ADMIN PAGE:</p>
  <span class="italic text-red-400">please only use the delete a user as a last resort, 
    there is currently no banning system. if you feel someone breaks a fairly soft rule,
    delete the post and notify them. if someone breaks a many soft rules or a hard rule,
    they have one more chance before they get deleted. (please notify them of this though,
     they might be confused) after their second offense, 
    please comment on one of their posts (or wall i need to add the wall) something like "you broke the rules
    ur account go bye bye next week lol!"</span>
  <br>
</div>