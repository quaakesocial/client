<style>
  :root {
    overflow: hidden;
  }
</style>

<script lang="ts" type="module">
  import axios from 'axios';

  let username: string;
  let email: string;
  let password: string;
  let apiUrl: string;

  if(typeof window != 'undefined') {
    fetch('/api')
      .then(async (req) => {
        apiUrl = await req.text();
      })
  }

  async function register() {
    try {
      const res = await axios.post(`${apiUrl}/register`, { username, email, password });

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
  <div class="bg-[#15151A] py-[6rem] px-5 rounded text-center">
    <h1 class="text-4xl">Register</h1>
    <p>Or <a href="/login">login</a></p>
    <form action="javascript:void(0);" id="form">
      <input type="text" class="mt-2" placeholder="Username" on:input={(e) => { e.target.value = e.target.value.toLowerCase().replace(' ', '-').replace(/[^a-z0-9_-]/, ''); username = e.target.value; }}>
      <br>
      <input type="email" class="mt-2" placeholder="Email" bind:value={email}>
      <br>
      <input type="password" class="mt-2" placeholder="Password" bind:value={password}>
      <br>
      <button class="w-full mt-2 py-1" on:click={register}>Register</button>
      <br>
      <span id="notice"></span>
    </form>
  </div>
</div>