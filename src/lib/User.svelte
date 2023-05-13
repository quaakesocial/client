<script lang="ts">
  /* import axios from 'axios';
  import dayjs from 'dayjs';
  import relativeTime from 'dayjs/plugin/relativeTime';
  import Post from '$lib/Post.svelte';

  export let name: string;

  let apiUrl: string;
  let id: string;
  let ago: any;
  let posts: string[] = [];

  function loadUser(name: string) {
    fetch('/api')
      .then(async (req) => {
        apiUrl = await req.text();

        const { data: user } = await axios.get(`${apiUrl}/u/${name}`);
        id = user.id;
        const joinDate = user.joinDate;
        dayjs.extend(relativeTime);
        ago = dayjs(joinDate).fromNow(true);
        const keys = Object.keys(user.posts);
        let parsedPosts: string[] = [];
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          parsedPosts.push(user.posts[key].id);
        }
        posts = parsedPosts;
      });
  }

  if(typeof window != 'undefined') {
    loadUser(name);
    console.log(posts)
  } */
  import Post from '$lib/Post.svelte'

  export let user;
</script>

<!-- <div class="bg-primary-500 w-[50em] p-4 rounded">
  <h1 class="text-3xl font-semibold font-sans">@{name}</h1>
  <h2>Joined {ago} ago</h2>
</div>

{#each posts as post}
  <Post id={post} />
{/each} -->

<div class="bg-primary-500 w-[50em] p-4 rounded">
  <h1 class="text-3xl font-semibold font-sans">@{user.username}</h1>
  <h2>Joined {user.ago}</h2>
</div>

{#each user.posts as post}
  <Post post={post} />
{/each}