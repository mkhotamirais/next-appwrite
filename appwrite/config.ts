import { Account, Client } from "appwrite";

const dbShopId = process.env.NEXT_PUBLIC_APPWRITE_DB_SHOP_ID;
const collProductsId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_PRODUCTS_ID;

const client = new Client();

client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string);

const account = new Account(client);

export { dbShopId, collProductsId, account };
