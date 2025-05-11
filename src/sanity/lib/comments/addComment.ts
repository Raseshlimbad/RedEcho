import { adminClient } from "../adminClient";

interface AddCommentParams {
  postId: string;
  userId: string;
  content: string;
  parentCommentId?: string;
}

export const addComment = async ({
  postId,
  userId,
  content,
  parentCommentId,
}: AddCommentParams) => {
  try {
    // Create comment document
    const CommentData = {
      _type: "comment",
      content,
      author: {
        _type: "reference",
        _ref: userId,
      },
      post: {
        _type: "reference",
        _ref: postId,
      },
      parentComment: parentCommentId
        ? {
            _type: "reference",
            _ref: parentCommentId,
          }
        : undefined,
      createdAt: new Date().toISOString(),
    };

    // Create the comment in Sanity
    const comment = await adminClient.create(CommentData);
    return { comment };
  } catch (error) {
    console.error("Error adding comment: ", error);
    return { error: "Failed to add comment" };
  }
};
