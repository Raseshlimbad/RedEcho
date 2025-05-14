"use client";

import { useUser } from "@clerk/nextjs";
import { downvote } from "action/downvote";
import { upvote } from "action/upvote";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useState, useTransition } from "react";
import {
  GetPostVotesQueryResult,
  GetUserPostVoteStatusQueryResult,
} from "sanity.types";

const PostVoteButtons = ({
  contentId,
  votes,
  vote,
  contentType,
}: {
  contentId: string;
  votes: GetPostVotesQueryResult;
  vote: GetUserPostVoteStatusQueryResult;
  contentType: "post" | "comment";
}) => {
  const { user, isSignedIn } = useUser();
  const [isPending, startTransition] = useTransition();
  const [optimisticVote, setOptimisticVote] =
    useState<GetUserPostVoteStatusQueryResult>(vote);
  const [optimisticScore, setOptimisticScore] = useState<number>(
    votes.netScore
  );

  const handleUpvote = () => {
    if (!isSignedIn || isPending) return;

    // Calculate score change based on current vote status
    let scoreChange = 0;
    if (optimisticVote === "upvote") {
      // User is Canceling their upvote
      scoreChange = -1;
      setOptimisticVote(null);
    } else if (optimisticVote === "downvote") {
      // User is changing from downvote to upvote (+2 because remove downvote and add upvote)
      scoreChange = 1;
      setOptimisticVote("upvote");
    } else {
      // User adding a new vote
      scoreChange = 1;
      setOptimisticVote("upvote");
    }

    // update the score immediately
    setOptimisticScore((prev) => prev + scoreChange);

    // Make API call in Transition
    startTransition(async () => {
      try {
        await upvote(contentId, contentType)
      } catch (error) {
        // If there is an error, revert the optimistic updates
        setOptimisticVote(vote);
        setOptimisticScore(votes.netScore);
        console.error(`Failed to upvote ${contentType}:`, error)
      }
    })
  };
  const handleDownvote = () => {
        if (!isSignedIn || isPending) return;

    // Calculate score change based on current vote status
    let scoreChange = 0;
    if (optimisticVote === "downvote") {
      // User is Canceling their upvote
      scoreChange = 1;
      setOptimisticVote(null);
    } else if (optimisticVote === "downvote") {
      // User is changing from downvote to upvote (+2 because remove downvote and add upvote)
      scoreChange = -2;
      setOptimisticVote("downvote");
    } else {
      // User adding a new vote
      scoreChange = -1;
      setOptimisticVote("downvote");
    }

    // update the score immediately
    setOptimisticScore((prev) => prev + scoreChange);

    // Make API call in Transition
    startTransition(async () => {
      try {
        await downvote(contentId, contentType)
      } catch (error) {
        // If there is an error, revert the optimistic updates
        setOptimisticVote(vote);
        setOptimisticScore(votes.netScore);
        console.error(`Failed to upvote ${contentType}:`, error)
      }
    })
  };
  return (
    <div className="flex flex-col items-center bg-gray-50 p-2 rounded-l-md">
      <button
        disabled={!isSignedIn || isPending || !user}
        onClick={handleUpvote}
        className={`p-2 rounded disabled:opacity-50 disabled:cursor-not-allowed
        ${optimisticVote === "upvote" ? "bg-orange-100" : "hover:bg-gray-100"}
        ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <ArrowUp
          className={`w-5 h-5 ${
            optimisticVote === "upvote"
              ? "text-orange-500 font-bold"
              : "text-gray-400 hover:text-orange-500"
          }`}
        />
      </button>

      <span className="text-sm font-medium text-gray-900">
        {optimisticScore}
      </span>

      <button
        disabled={!isSignedIn || isPending || !user}
        onClick={handleDownvote}
        className={`p-2 rounded disabled:opacity-50 disabled:cursor-not-allowed
        ${optimisticVote === "downvote" ? "bg-orange-100" : "hover:bg-gray-100"}
        ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <ArrowDown
          className={`w-5 h-5 ${
            optimisticVote === "downvote"
              ? "text-orange-500 font-bold"
              : "text-gray-400 hover:text-orange-500"
          }`}
        />
      </button>
    </div>
  );
};

export default PostVoteButtons;
