import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

const Blogs: CollectionConfig = {
  slug: 'blogs',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'date', 'status'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'category',
      type: 'text',
      required: true,
      label: 'Category',
    },

    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Blog Title',
    },

    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      label: 'Slug',
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            const base = value || data?.title
            if (!base) return value

            return base
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/(^-|-$)/g, '')
          },
        ],
      },
    },

    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Cover Image',
    },

    {
      name: 'author',
      type: 'text',
      required: true,
      label: 'author',
    },


    {
      name: 'date',
      type: 'date',
      required: true,
      label: 'Publish Date',
    },



    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({}),
      label: 'Content',
    },

    {
      name: 'status',
      type: 'select',
      label: 'Status',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      defaultValue: 'draft',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}

export default Blogs
