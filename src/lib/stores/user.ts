import { writable } from 'svelte/store';
import { ID, type Models } from 'appwrite';
import { goto } from '$app/navigation';
import { account } from '$lib/appwrite';

const store = writable<Models.Preferences | null>(null);

async function init() {
	try {
		store.set(await account.get());
	} catch (e) {
		store.set(null);
	}
}

async function register(email: string, password: string) {
	await account.create(ID.unique(), email, password);
	await login(email, password);
}

async function recover(email: string) {
	await account.createRecovery(email, 'http://localhost:5173/recover');
}

async function login(email: string, password: string) {
	await account.createEmailSession(email, password);
	await init();
	goto('/'); // Redirect to home page after login
}

async function logout() {
	await account.deleteSession('current');
	store.set(null);
}

// Expose the store's value with $user
export const user = {
	subscribe: store.subscribe,
	register,
	login,
	logout,
	recover,
	init
};

// const derp = {
// 	$id: '6459af5f63613c589419',
// 	$createdAt: '2023-05-09T02:26:39.558+00:00',
// 	$updatedAt: '2023-10-24T04:52:43.160+00:00',
// 	name: 'user_name',
// 	registration: '2023-05-09T02:26:39.557+00:00',
// 	status: true,
// 	labels: [],
// 	passwordUpdate: '2023-10-24T04:52:43.160+00:00',
// 	email: 'user_email@gmail.com',
// 	phone: '',
// 	emailVerification: true,
// 	phoneVerification: false,
// 	prefs: {},
// 	accessedAt: ''
// };
