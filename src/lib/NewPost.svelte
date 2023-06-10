<script lang="ts">
  import axios from 'axios';

  let id: string;

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
  };

  function post() {
    const token: string | null = Cookie.get('token');
    const loggedIn: boolean = !!token;
    axios.get('/api')
        .then(async (res) => {
          const apiUrl = res.data;

          const { data } = await axios.post(`${apiUrl}/createPost`, {
            content: document.getElementById('content')?.value
          }, {
            headers: {
              Authorization: token
            }
          })
          location.replace(`/$${data.id}`)
        });
  }
</script>

<div>
  <textarea class="bg-black/90" cols="30" rows="6" id="content" placeholder="Type something..." />
  <br>
  <button on:click={() => post()} class="px-5 py-1 float-right">Post</button>
</div>