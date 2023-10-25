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
