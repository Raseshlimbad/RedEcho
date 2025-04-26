import { MessageSquare } from "lucide-react";
import { defineField, defineType } from "sanity";

export const commentType = defineType({
  name: "comment",
  title: "Comment",
  type: "document",
  icon: MessageSquare,
  description: "A comment on a post or another comment",
  fields: [
    defineField({
      name: "content",
      title: "Content",
      type: "text",
      description: "The text content of the comment",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      description: "The user who wrote this comment",
      to: [{ type: "user" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "post",
      title: "Post",
      type: "reference",
      description:
        "The post this comment belongs to (even for nested comments)",
      to: [{ type: "post" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "parentComment",
      title: "Parent Comment",
      type: "reference",
      description: "If this is a reply, referance to the parent comment",
      to: [{ type: "comment" }],
    }),
    defineField({
      name: "isReported",
      title: "Is Reported",
      type: "boolean",
      description: "Indecates if the comment has been reported",
      initialValue: false,
    }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      description: "When this comment was posted",
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "isDeleted",
      title: "Is Deleted",
      type: "boolean",
      description: "Indecates if the comment has been deleted",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "content",
      subtitle: "author.username",
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle,
      };
    }
  }
});
