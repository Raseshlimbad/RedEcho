import { getPostComments } from "@/sanity/lib/comments/getPostComments";
import { getPostVotes } from "@/sanity/lib/vote/getPostVotes"
import { getUserPostVoteStatus } from "@/sanity/lib/vote/getUserPostVoteStatus";
import { GetAllPostsQueryResult } from "sanity.types"

interface PostProps{
    post: GetAllPostsQueryResult[number],
    userId: string | null
}

const Post = async ({post, userId} : PostProps) => {
  const votes = await getPostVotes (post._id);
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
        <div>

        </div>
      </div>

      </div>

      {/* Buttons */}
      {/* Report Button */}
      {/* Delete Button */}
      
    </article>
  )
}

export default Post
