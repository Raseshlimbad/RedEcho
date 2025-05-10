import { sanityFetch } from "../live";
import { defineQuery } from "groq";

export const getUserPostVoteStatus = async (postId: string, userId: string | null) => {
  const getUserPostVoteStatusQuery = defineQuery(
    // `[*_type == "vote" && post._ref == $postId && user._ref == $userId][0]`
    `[*[_type == "vote" && post._ref == $postId && user._ref == $userId][0]]`
  );

  const result = await sanityFetch({
    query: getUserPostVoteStatusQuery,
    params: { postId, userId: userId || "" },
  });
  return result.data;
};
