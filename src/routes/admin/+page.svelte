<script lang="ts" type="module">
  import type { LayoutData } from '../$types';

  export let data: LayoutData;

  if(typeof window !== 'undefined') {
    if(!data.user.admin) {
      window.location = '/';
      console.log('ur not admin!!!')
    }
  }
</script>