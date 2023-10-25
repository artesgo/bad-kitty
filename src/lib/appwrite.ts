import { Client, Account } from 'appwrite';

export const client = new Client();

client.setEndpoint('https://cloud.appwrite.io/v1').setProject('6459ae9f53672478e9ee');

export const account = new Account(client);
export { ID, Databases } from 'appwrite';
