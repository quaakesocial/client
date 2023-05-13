<script lang="ts">
  export let post: {
    by: string,
    content: string,
    id: string
  };
</script>

<div class="bg-[#15151A] w-[26em] rounded-lg p-10">
  <div class="w-full h-12 border-b-[#3a3a49] border-b-[1px]">
    <a class="font-semibold !text-white !no-underline" href={`/@${post.by}`}>@{post.by}</a>
  </div>
  <br>
  <div class="font-apercu"> 
    {post.content}
  </div>
  <br>
  <a class="!text-[#3a3a49] !no-underline" href={`/$${post.id}`}>
    {post.id}
  </a>
</div>