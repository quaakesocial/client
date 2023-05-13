<script lang="ts">
  export let title: Boolean = false, href: string = '#';
</script>

{#if !title}
  <a href="{href}" class="text-2xl"><slot /></a>
{:else}
  <a href="{href}" class="ml-12 text-3xl font-black"><slot /></a>
{/if}