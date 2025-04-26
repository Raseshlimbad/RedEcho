import { UserIcon } from 'lucide-react';
import Image from 'next/image';
import { defineField, defineType } from "sanity";

export const userType = defineType({
  name: 'user',
  title: 'User',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'username',
      title: 'Username',
      type: 'string',
      description: "The unique username for the user",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      description: "User's email address",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'imageUrl',
      title: 'Profile Image',
      type: 'image',
      description: "User's clerk profile picture",
    }),
    defineField({
      name: 'joinedAt',
      title: 'Joined At',
      type: 'datetime',
      description: "When this user account was created",
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'isReported',
      title: 'Is Reported',
      type: 'boolean',
      description: "Whether this user has been reported",
      initialValue: false,
    }),
  ],
  preview:{
    select:{
      title: 'username',
      Subtitle: 'email',
      media: 'imageUrl',
    },
    prepare({title, media}){
      return{
        title,
        media: media ? (
          <Image
            src={media}
            alt={`${title}'s avatar`}
            width={40}
            height={40}
          />
        ) : (
          <UserIcon />
        ),
      }
    }
  }
})