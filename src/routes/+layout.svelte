<script>
  import "$lib/app.css";
	import Header from "$lib/components/header.svelte";
</script>

<Header></Header>
<main class="p-4">
  <slot />
</main>