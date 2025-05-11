import { getPostComments } from "@/sanity/lib/comments/getPostComments";
import { getPostVotes } from "@/sanity/lib/vote/getPostVotes";
import { getUserPostVoteStatus } from "@/sanity/lib/vote/getUserPostVoteStatus";
import { GetAllPostsQueryResult } from "sanity.types";
import TimeAgo from "../ui/TimeAgo";
import Image from "next/image";
import { MessageSquare } from "lucide-react";
import CommentInput from "../comment/CommentInput";

interface PostProps {
  post: GetAllPostsQueryResult[number];
  userId: string | null;
}

const Post = async ({ post, userId }: PostProps) => {
  const votes = await getPostVotes(post._id);
  const vote = await getUserPostVoteStatus(post._id, userId);
  const comments = await getPostComments(post._id, userId);
  return (
    <article
      key={post._id}
      className="relative bg-white rounded-md shadow-md border border-gray-200 hover:border-gray-300 transition-colors"
    >
      <div className="flex">
        {/* Vote Buttons */}

        {/* Post Content */}
        <div className="flex-2 p-3">
          <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
            {post.subecho && (
              <>
                <a
                  href={`/community/${post.subecho.slug}`}
                  className="font-mediom hover:underline"
                >
                  c/{post.subecho.title}
                </a>
                <span>•</span>
                <span>Posted by</span>
                {post.author && (
                  <a
                    href={`/u/${post.author.username}`}
                    className="hover:underline"
                  >
                    u/{post.author.username}
                  </a>
                )}
                <span>•</span>
                {post.publishedAt && (
                  <TimeAgo date={new Date(post.publishedAt)} />
                )}
              </>
            )}
          </div>
          {/* Post Title */}
          {post.subecho && (
            <div>
              <h2 className="txt-lg font-medium text-gray-900 mb-2">
                {post.title}
              </h2>
            </div>
          )}
          {/* Post Body */}
          {post.body && post.body[0]?.children?.[0]?.text && (
            <div className="prose prose-sm max-w-none text-gray-700 mb-3">
              {post.body[0]?.children?.[0]?.text}
            </div>
          )}
          {/* Post Image */}
          {post.image && post.image?.url && (
            <div className="relative w-full h-64 mb-3 px-2 bg-gray-100/30">
              <Image
                src={post.image.url}
                alt={post.image.alt || "Post image"}
                fill
                className="object-contain rounded-md p-2"
              />
            </div>
          )}
          {/* Comments count */}
          <button className="flex items-center px-1 py-2 gap-1 text-sm text-gray-500">
            <MessageSquare className="w-4 h-4" />
            <span>{comments.length} Comments</span>
          </button>

          {/* CommentInput */}
          <CommentInput postId={post._id} />
          {/* CommentList */}
        </div>
      </div>

      {/* Buttons */}
      {/* Report Button */}
      {/* Delete Button */}
    </article>
  );
};

export default Post;
