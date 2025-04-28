import { defineQuery } from "groq";
import { sanityFetch } from "../live";
import { adminClient } from "../adminClient";

export const addUser = async ({
  id,
  username,
  email,
  imageUrl,
}: {
  id: string;
  username: string;
  email: string;
  imageUrl: string;
}) => {
    const user = await adminClient.createIfNotExists({
      _type: "user",
      _id: id,
      username,
      email,
      imageUrl,
      // imageUrl: {
      //   _type: "image",
      //   asset: {
      //     _type: "reference",
      //     _ref: imageUrl,
      //   }
      // },
      joinedAt: new Date().toISOString(),
    });

    return user;
};
