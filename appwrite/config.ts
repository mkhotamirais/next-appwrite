import { Account, Client, Databases } from "appwrite";

const dbShopId = process.env.NEXT_PUBLIC_APPWRITE_DB_SHOP_ID as string;
const collProductsId = process.env.NEXT_PUBLIC_APPWRITE_COLL_PRODUCTS_ID as string;

const client = new Client();

client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string);

const account = new Account(client);
const databases = new Databases(client);

export { dbShopId, collProductsId, client, account, databases };
