<script lang="ts">
	import { user } from '$lib';
	import { account, ID } from '$lib/appwrite';
	import Button from '$lib/components/button.svelte';
	import Input from '$lib/components/input.svelte';

	let email = '';
	let password = '';
	let name = '';
	let register = false;
	let forgot = false;

	async function login(email: string, password: string) {
		await user.login(email, password);
	}

  async function recover(email: string) {
    await user.recover(email);
  }

	async function logout() {
		await user.logout();
	}
</script>



<form>
	{#if !$user}
		<div>
			<Input type="email" placeholder="Email" bind:value={email} />
			<Input type="password" placeholder="Password" bind:value={password} />
		</div>
		<div>
			<label for="register">Register</label>
			<input id="register" type="checkbox" bind:checked={register} />
		</div>
		{#if !register}
			<Button on:click={() => login(email, password)}>Login</Button>
		{/if}
	{/if}
	{#if register}
		<Input type="text" placeholder="User Name" bind:value={name} />
		<Button
			on:click={async () => {
				await account.create(ID.unique(), email, password, name);
				login(email, password);
			}}>Register</Button>
	{/if}
	
	<div>
		{#if forgot}
			<Button on:click={() => recover(email)}>Recover Password</Button>
		{/if}
		{#if $user}
			Hello {$user.name},
			<Button on:click={() => logout()}>Logout</Button>
		{/if}
	</div>
</form>
