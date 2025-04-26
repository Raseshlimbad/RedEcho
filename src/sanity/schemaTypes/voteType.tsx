import { ArrowDown, ArrowUp, ArrowDownUp } from "lucide-react";
import { defineField, defineType } from "sanity";

export const voteType = defineType({
  name: "vote",
  title: "Vote",
  type: "document",
  icon: ArrowDownUp,
  description: "Tracks user votes on posts and comments",
  fields: [
    defineField({
      name: "user",
      title: "User",
      type: "reference",
      description: "The user who cast this vote",
      to: [{ type: "user" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "voteType",
      title: "Vote Type",
      type: "string",
      description: "Whether this is an upvote or downvote",
      options: {
        list: [
          { title: "Upvote", value: "upvote" },
          { title: "Downvote", value: "downvote" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "post",
      title: "Post",
      type: "reference",
      description: "The post this vote belongs to (if voting on a post)",
      to: [{ type: "post" }],
    }),
    defineField({
      name: "comment",
      title: "Comment",
      type: "reference",
      description: "The comment this vote belongs to (if voting on a comment)",
      to: [{ type: "comment" }],
    }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      description: "When this vote was cast",
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      voteType: "voteType",
      postTitle: "post.title",
      commentTitle: "comment.title",
      username: "user.username",
    },
    prepare({ voteType, username, postTitle, commentTitle }) {
      return {
        title: postTitle || commentTitle,
        media: voteType === "upvote" ? <ArrowUp /> : <ArrowDown />,
      };
    },
  },
  validation: (Rule) => 
    Rule.custom((fields) => {
      if (fields?.post && fields?.comment) {
        return "A vote can only belong to a post or a comment, not both";
      }
      if (!fields?.post && !fields?.comment) {
        return "A vote must belong to a post or a comment";
      }
      return true;
    })
});
