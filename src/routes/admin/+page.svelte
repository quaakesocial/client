<script lang="ts" type="module">
  import type { LayoutData } from '../$types';
  import axios from 'axios';
  import dayjs from 'dayjs';
  import relativeTime from 'dayjs/plugin/relativeTime'

  dayjs.extend(relativeTime);

  export let data: LayoutData;
  
  let postId: String;
  let userHandle: String;
  let posts: Object;
  let api;

  if(typeof window !== 'undefined') {
    if(!data.user.admin) {
      window.location.href = '/';
      console.log('ur not admin!!!')
    } else {
      const a = async () => {
        api = await axios.get('/api');
      }
      a();
      console.log(api);
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
  <h3>reported posts (raw):</h3>
  <code>
    {@html api}
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