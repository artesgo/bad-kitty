<script lang="ts">
	import { onMount } from 'svelte';
	import { account, ID } from '$lib/appwrite';
	import Input from '$lib/components/input.svelte';
	import Button from '$lib/components/button.svelte';

	let loggedInUser: { name: string } | null = null;

	let email = '';
	let password = '';
	let confirm = '';
	let name = '';

  let urlParams: URLSearchParams;
  let secret: string | null;
  let userId: string | null;

  onMount(() => {
    if (window) {
      urlParams = new URLSearchParams(window.location.search);
      secret = urlParams.get('secret');
      userId = urlParams.get('userId');
    }
  });

	async function login(email: string, password: string) {
		await account.createEmailSession(email, password);
		loggedInUser = await account.get();
	}

  async function recover(password: string, confirm: string) {
    if (userId && secret && password === confirm) {
      await account.updateRecovery(
        userId,
        secret,
        password,
        confirm,
      )
    }
  }
</script>

<p>
	{loggedInUser ? `Logged in as ${loggedInUser.name}` : 'Not logged in'}
</p>

<form>
	<Input type="password" placeholder="Password" bind:value={password} />
	<Input type="password" placeholder="Confirm Password" bind:value={confirm} />
	<Button on:click={() => recover(password, confirm)}>Recover Password</Button>

	<button
		type="button"
		on:click={async () => {
			await account.create(ID.unique(), email, password, name);
			login(email, password);
		}}>Register</button
	>

	<button
		type="button"
		on:click={async () => {
			await account.deleteSession('current');
			loggedInUser = null;
		}}>
		Logout
	</button>
</form>
