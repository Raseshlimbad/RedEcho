'use client'

import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { GetPostVotesQueryResult, GetUserPostVoteStatusQueryResult } from "sanity.types";

const PostVoteButtons = ({
    contentId,
    votes,
    vote,
    contentType,
} : {
    contentId: string;
    votes: GetPostVotesQueryResult;
    vote: GetUserPostVoteStatusQueryResult;
    contentType: "post" | "comment";
}) => {
    const {user, isSignedIn} = useUser();
    const [isPending, setIsPending] = useState(false);
    const [optimisticVote, setOptimisticVote] = useState<GetUserPostVoteStatusQueryResult>(vote);
    const [optimisticScore, setOptimisticScore] = useState<number>(votes.netScore);
  return (
    <div>
      
    </div>
  )
}

export default PostVoteButtons
