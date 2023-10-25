import { writable } from "svelte/store";
import { ID, Query, type Models } from "appwrite";
import { Databases, client } from "$lib/appwrite";

export const BLOG_DATABASE_ID = "6538893b63b2d7b690ef";
export const POSTS_COLLECTION_ID = "65388c222d3154e89494";

const databases = new Databases(client);

const store = writable<Models.Document[]>([]);

async function init() {
  const response = await databases.listDocuments(
    BLOG_DATABASE_ID,
    POSTS_COLLECTION_ID,
    // Use a query to how the latest ideas first
    [Query.orderDesc("$createdAt")]
  );
  store.set(response.documents);
}

async function add(userId: string, title: string, description: string) {
  const response = await databases.createDocument(
    BLOG_DATABASE_ID,
    POSTS_COLLECTION_ID,
    ID.unique(),
    {
      userId,
      title,
      description,
    }
  );
  store.update((ideas) => [response, ...ideas]);
}

async function remove(id: string) {
  await databases.deleteDocument(BLOG_DATABASE_ID, POSTS_COLLECTION_ID, id);
  store.update((ideas) => ideas.filter((idea) => idea.$id !== id));
}

export const blog = {
  subscribe: store.subscribe,
  init,
  add,
  remove,
};
