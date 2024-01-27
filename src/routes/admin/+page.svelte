<script lang="ts" type="module">
  import type { LayoutData } from '../$types';
  import axios from 'axios';

  export let data: LayoutData;

  if(typeof window !== 'undefined') {
    if(!data.user.admin) {
      window.location.href = '/';
      console.log('ur not admin!!!')
    }

    const api = axios.get('/api')

    posts = axios.get(`${api}/getReportedPosts`, { data: {
      token: data.user.token
    } });

    async () => {
      const a = await axios.get(`${api}/getReportedPosts`, { data: {
        token: data.user.token
      } }).data;
    }

    console.log(posts);
  }
</script>

<div class="p-12">
  <h1>admin panel</h1>
  <br>
</div>