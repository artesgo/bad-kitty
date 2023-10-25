<script lang="ts">
  import { user } from "$lib/stores/user";
  import { blog } from "$lib/stores/blog";

  let title = "";
  let description = "";
</script>

{#if $user}
  {@const id = $user.$id}
  <section>
    <h2>Submit Idea</h2>
    <form>
      <input type="text" placeholder="Title" bind:value={title} />
      <textarea placeholder="Description" bind:value={description} />
      <button
        type="button"
        on:click={async () => {
          blog.add(id, title, description);
          title = "";
          description = "";
        }}>Submit</button
      >
    </form>
  </section>
{:else}
  <section><p>Please login to submit an idea.</p></section>
{/if}
<section>
  <h2>Latest Ideas</h2>
  <ul>
    {#each $blog as post}
      <li>
        <strong>{post.title}</strong>
        <p>{post.description}</p>
        {#if $user && post.userId === $user.$id}
          <button type="button" on:click={() => blog.remove(post.$id)}
            >Remove</button
          >
        {/if}
      </li>
    {/each}
  </ul>
</section>

<style>
  section {
    margin-bottom: 3rem;
  }
  form {
    display: grid;
    gap: 0.25rem;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    border-radius: 0.25em;
    background-color: antiquewhite;
    box-shadow: 8px 8px 4px 0 rgba(0, 0, 0, 0.1);
    min-width: 20%;
    padding: 1rem;
    margin-bottom: 1rem;
  }
</style>
