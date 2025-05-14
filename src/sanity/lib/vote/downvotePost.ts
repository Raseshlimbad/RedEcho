import { adminClient } from "../adminClient";
import { sanityFetch } from "../live";
import { defineQuery } from "groq";

export const downvotePost = async (postId: string, userId: string) => {
    // Check if user has already voted on this post
    const existingVoteQuery = defineQuery(
        `*[_type == "vote" && post._ref == $postId && user._ref == $userId][0]`
    );

    const existingVote = await sanityFetch({
        query: existingVoteQuery,
        params: { postId, userId },
    });

    if(existingVote.data) {
        const vote = existingVote.data;

        // If there is already upvote remove it
        if(vote.voteType === "downvote") {
            return await adminClient.delete(vote._id);
        }

        // If there is already downvote, remove it and add upvote
        if(vote.voteType === "upvote") {
            return await adminClient
            .patch(vote._id)
            .set({ voteType: "downvote" })
            .commit();;
        }
    }

    // Create a new upvote
    return await adminClient.create({
        _type: "vote",
        post: {
            _type: "reference",
            _ref: postId,
        },
        user: {
            _type: "reference",
            _ref: userId,
        },
        voteType: "downvote",
        createdAt: new Date().toISOString(),
    })
}