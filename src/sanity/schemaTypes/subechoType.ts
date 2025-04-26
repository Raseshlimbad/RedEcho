import { TagIcon } from 'lucide-react';
import { defineField, defineType } from "sanity";

export const subechoType = defineType({
  name: 'subecho',
  title: 'Subecho',
  type: 'document',
  icon: TagIcon,
  description: 'A community whwre users can post and engage with content',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The title of the subecho',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'A brief description of what this subecho is about',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'The unique URL-friendly identifier for the subecho',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
        description: 'Icon or banner iumage for the subecho',
        fields: [
            {
                name: 'alt',
                title: 'Alt Text',
                type: 'string',
                description: 'Alternative text for screen readers and SEO',
            }
        ]
    }),
    defineField({
      name: 'moderator',
      title: 'Moderator',
      type: 'reference',
      description: 'The user who created this subecho and has admin privileges',
      to: [{ type: 'user' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      description: 'When this subecho was created',
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
  }
})