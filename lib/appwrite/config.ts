import{Client, Account, Databases, Storage, Avatars} from 'node-appwrite';

export const appwriteConfig = {
    projectId:  process.env.APPWRITE_PROJECT_ID,
    url: process.env.APPWRITE_URL,
    databaseId: process.env.APPWRITE_DATABASE_ID,
    storageId: process.env.APPWRITE_STORAGE_ID,
    usercollectionId: process.env.APPWRITE_USER_COLLECTION_ID,
    postcollectionId: process.env.APPWRITE_POST_COLLECTION_ID,
    savescollectionId: process.env.APPWRITE_SAVES_COLLECTION_ID,
    apiKey: process.env.APPWRITE_API_KEY
};

// export const client = new Client();
// client.setProject(appwriteConfig.projectId as string);
// client.setEndpoint(appwriteConfig.url as string);


// export const account = new Account(client);
// export const databases = new Databases(client);
// export const storage = new Storage(client);
// export const avatars = new Avatars(client);