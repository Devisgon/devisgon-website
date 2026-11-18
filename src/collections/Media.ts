import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    resizeOptions: { width: 1600, height: 1600, fit: "inside", withoutEnlargement: true },
    formatOptions: { format: "webp", options: { quality: 82 } },
  },
}
