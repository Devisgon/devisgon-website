import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";
import { s3Storage } from "@payloadcms/storage-s3";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import Blogs from "./collections/Blogs";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  // VITAL: This tells Payload its public address on Vercel
  serverURL:"https://devisgon.com",
cors: [
  "http://localhost:3000",
  "https://devisgon.com",
],

csrf: [
  "http://localhost:3000",
  "https://devisgon.com",
],
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
   
  },

  collections: [Users, Media, Blogs],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "default_secret_for_dev_only",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || "",
      max:15 ,
      ssl: { rejectUnauthorized: false },
    },
  }),
  sharp,
  plugins: [
    s3Storage({
      collections: {
        media: true, 
      },
      bucket: process.env.S3_BUCKET!,
      config: {
        endpoint: process.env.S3_ENDPOINT!,
        region: process.env.S3_REGION || "auto",
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID!,
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
        },
        forcePathStyle: true, // This is required for Supabase S3 compatibility
      },
    }),
  ],
});
