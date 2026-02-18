import { postgresAdapter } from "@payloadcms/db-postgres";

import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import  Blogs  from "./collections/Blogs";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  cors: [
    'http://localhost:3000',
    'https://test-omega-coral-10.vercel.app', 
  ],
  csrf: [
    'https://test-omega-coral-10.vercel.app',
  ],
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Blogs],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || "",
 ssl: {
    rejectUnauthorized: false,
  },
  },
  }),
  sharp,
  plugins: [],
});
