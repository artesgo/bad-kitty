<script lang="ts">
	import { account, ID } from '$lib/appwrite';

	let loggedInUser: { name: string } | null = null;

	let email = '';
	let password = '';
	let name = '';

	async function login(email: string, password: string) {
		await account.createEmailSession(email, password);
		loggedInUser = await account.get();
	}

  async function recover(email: string) {
    await account.createRecovery(email, "http://localhost:5173/recover")
  }
</script>

<p>
	{loggedInUser ? `Logged in as ${loggedInUser.name}` : 'Not logged in'}
</p>

<form>
	<input type="email" placeholder="Email" bind:value={email} />
	<input type="password" placeholder="Password" bind:value={password} />
	<input type="text" placeholder="Name" bind:value={name} />
	<button type="button" on:click={() => login(email, password)}>Login</button>
	<button type="button" on:click={() => recover(email)}>Recover Password</button>

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
		}}>Logout</button
	>
</form>
