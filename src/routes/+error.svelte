<script lang="ts">
  import { page } from '$app/stores';
</script>

<svelte:head>
  <title>{$page.status}: {$page.error?.message}</title>
</svelte:head>

<div class="ml-12 mt-6">
  <h1 class="text-5xl font-black">{$page.status}</h1>
  <p>{$page.error?.message}</p>
</div>