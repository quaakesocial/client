<script lang="ts">
  import Post from '$lib/Post.svelte';
  import User from '$lib/User.svelte';

  /** @type {import('./$types').PageData}
    */
  export let data: any;
</script>

{#if data.type == 'post'}
  <div class="mt-6 flex justify-center">
    <Post id={data.id} />
  </div>
{:else if data.type == 'user'}
  <div class="mt-6 flex items-center flex-col gap-5">
    <User name={data.username} />
  </div>
{/if}