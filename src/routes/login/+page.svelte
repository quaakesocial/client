<style>
  :root {
    overflow: hidden;
  }
</style>

<script lang="ts">
  import axios from 'axios';

  let username: string;
  let password: string;
  let apiUrl: string;

  if(typeof window != 'undefined') {
    fetch('/api')
      .then(async (req) => {
        apiUrl = await req.text();
      })
  }

  async function login() {
    try {
      const res = await axios.post(`${apiUrl}/login`, { username, password });
      const d = new Date();
      const t = d.getTime();
      const et = t + (70 * 24 * 3600 * 100 /* seven days */);
      d.setTime(et);
      document.cookie = `token=${res.data.token};expires=${d.toUTCString()};`;
      location.href = '/';
    } catch(err) {
      const notice = document.getElementById('notice');
      notice.innerText = err.response.data.msg || err.message;
    }
  }
</script>

<div class="flex items-center justify-center h-screen">
  <div class="bg-[#15151A] py-[6rem] px-5 rounded text-center space-y-2">
    <h1 class="text-4xl">Login</h1>
    <p>No account? <a href="/register">Make one!</a></p>
    <input type="text" placeholder="Username" bind:value={username}>
    <br>
    <input type="password" placeholder="Password" bind:value={password}>
    <br>
    <button class="w-full py-1" on:click={login}>Login</button>
    <br>
    <span id="notice"></span>
  </div>
</div>