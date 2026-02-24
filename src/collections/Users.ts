import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,

  admin: {
    useAsTitle: 'email',
  },

  access: {
    admin: () => true,      // ✅ Allow admin access
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },

  fields: [],
}