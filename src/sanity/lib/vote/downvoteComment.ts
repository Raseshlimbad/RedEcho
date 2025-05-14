import { adminClient } from "../adminClient";
import { sanityFetch } from "../live";
import { defineQuery } from "groq";

export const downvoteComment = async (commentId: string, userId: string) => {
    // Check if user has already voted on this comment
    const existingVoteQuery = defineQuery(
        `*[_type == "vote" && comment._ref == $commentId && user._ref == $userId][0]`
    );

    const existingVote = await sanityFetch({
        query: existingVoteQuery,
        params: { commentId, userId },
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
        comment: {
            _type: "reference",
            _ref: commentId,
        },
        user: {
            _type: "reference",
            _ref: userId,
        },
        voteType: "downvote",
        createdAt: new Date().toISOString(),
    })
}