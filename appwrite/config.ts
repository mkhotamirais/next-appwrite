import { Account, Client, Databases, Storage } from "appwrite";

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string;
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string;
const dbShopId = process.env.NEXT_PUBLIC_APPWRITE_DB_SHOP_ID as string;

const collProductsId = process.env.NEXT_PUBLIC_APPWRITE_COLL_PRODUCTS_ID as string;
const collArticlesId = process.env.NEXT_PUBLIC_APPWRITE_COLL_ARTICLES_ID as string;
const collGalleryId = process.env.NEXT_PUBLIC_APPWRITE_COLL_GALLERY_ID as string;

const bucketId = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID as string;

const client = new Client();

client.setEndpoint(endpoint).setProject(projectId);

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

export {
  endpoint,
  projectId,
  dbShopId,
  collProductsId,
  collArticlesId,
  collGalleryId,
  bucketId,
  client,
  account,
  databases,
  storage,
};
