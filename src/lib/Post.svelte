<script lang="ts">
  import axios from 'axios';

  export let id: string;

  let apiUrl: string;
  let content: string;
  let author: string;

  function loadPost(id: string) {
    fetch('/api')
      .then(async (req) => {
        apiUrl = await req.text();

        const { data: post } = await axios.get(`${apiUrl}/p/${id}`);
        content = post.content;
        author = post.by;
      })
  }

  if(typeof window != 'undefined') {
    loadPost(id);
  }
</script>

<div class="bg-[#15151A] w-[26em] rounded-lg p-10">
  <div class="w-full h-12 border-b-[#3a3a49] border-b-[1px]">
    <a class="font-semibold !text-white !no-underline" href={`/@${author}`}>@{author || 'user'}</a>
  </div>
  <br>
  <div class="font-apercu"> 
    {content || 'content'}
  </div>
  <br>
  <a class="!text-[#3a3a49] !no-underline" href={`/$${id}`}>
    {id}
  </a>
</div>