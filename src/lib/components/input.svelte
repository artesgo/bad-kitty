<script lang="ts">
  export let value = '';
  export let type: 'email' | 'text' | 'password';
  export let placeholder = '';
</script>

{#if type === 'email'}
  <input class="px-4 py-2 border rounded-sm" {placeholder} type="email" bind:value>
{:else if type === 'text'}
  <input class="px-4 py-2 border rounded-sm" {placeholder} type="text" bind:value>
{:else}
  <input class="px-4 py-2 border rounded-sm" {placeholder} type="password" bind:value>
{/if}