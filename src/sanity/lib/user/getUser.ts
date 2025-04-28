// import { defineQuery } from "groq";
// import { sanityFetch } from "../live";
// import { currentUser } from "@clerk/nextjs/server";
// import { addUser } from "./addUser";

// interface UserResult {
//   _id: string;
//   username: string;
//   imageUrl: string;
//   email: string;
// }

// const parseUsername = (username: string) => {
//   // Remove whitespace and convert to camelCase with random number to avoid conflicts
//   const randomNum = Math.floor(Math.random() * 9000);
//   return (
//     username
//       .replace(/\s+(.)/g, (_, char) => char.toUpperCase())
//       .replace(/\s+/g, "") + randomNum
//   );
// };

// export const getUser = async (): Promise<UserResult | { error: string }> => {
//   try {
//     const loggedInUser = await currentUser();


//     if (!loggedInUser) {
//       console.log("User not logged in");
//       return { error: "User not logged in" };
//     }

//     const getExistingUserQuery = defineQuery(
//       `*[_type == "user" && _id == $id][0]`
//     );

//     const existingUser = await sanityFetch({
//       query: getExistingUserQuery,
//       params: { id: loggedInUser.id },
//     });

//     if (existingUser.data?._id) {
//       console.log("User found in database with ID: ", existingUser.data._id);
//       const user = {
//         _id: existingUser.data._id,
//         username: existingUser.data.username!,
//         imageUrl: existingUser.data.imageUrl!,
//         email: existingUser.data.email!,
//       };
//         return user;
//     }

//     console.log("User not found in database, creating new user");
//     const newUser = await addUser({
//       id: loggedInUser.id,
//       username: parseUsername(loggedInUser.fullName!),
//       email:
//         loggedInUser.primaryEmailAddress?.emailAddress ||
//         loggedInUser.emailAddresses[0]?.emailAddress,
//       imageUrl: loggedInUser?.imageUrl,
//     });

//     console.log("New user created with ID: ", newUser._id);
//     const user = {
//       _id: newUser._id,
//       username: newUser.username,
//       imageUrl: newUser.imageUrl,
//       email: newUser.email,
//     };

//     return user;
//   } catch (error) {
//     console.error("Error fetching user:", error);
//     return { error: "Failed to fetch user" };
//   }
// };



import { defineQuery } from "groq";
import { sanityFetch } from "../live";
import { currentUser } from "@clerk/nextjs/server";
import { addUser } from "./addUser";

interface SanityImageAsset {
  _ref: string;
  _type: "reference";
  _weak?: boolean;
}

interface SanityImage {
  asset?: SanityImageAsset;
  hotspot?: any;
  crop?: any;
  _type: "image";
}

interface UserResult {
  _id: string;
  username: string;
  // imageUrl: SanityImage | string;
  imageUrl: SanityImage | string;
  email: string;
}

const parseUsername = (username: string) => {
  // Remove whitespace and convert to camelCase with random number to avoid conflicts
  const randomNum = Math.floor(Math.random() * 9000);
  return (
    username
      .replace(/\s+(.)/g, (_, char) => char.toUpperCase())
      .replace(/\s+/g, "") + randomNum
  );
};

export const getUser = async (): Promise<UserResult | { error: string }> => {
  try {
    const loggedInUser = await currentUser();

    if (!loggedInUser) {
      console.log("User not logged in");
      return { error: "User not logged in" };
    }

    const getExistingUserQuery = defineQuery(
      `*[_type == "user" && _id == $id][0]`
    );

    const existingUser = await sanityFetch({
      query: getExistingUserQuery,
      params: { id: loggedInUser.id },
    });

    if (existingUser.data?._id) {
      console.log("User found in database with ID: ", existingUser.data._id);
      // Ensure all required fields are present
      if (!existingUser.data.username || !existingUser.data.email) {
        return { error: "Invalid user data in database" };
      }
      const user: UserResult = {
        _id: existingUser.data._id,
        username: existingUser.data.username!,
        imageUrl: existingUser.data.imageUrl!,
        email: existingUser.data.email!,
      };
      return user;
    }

    console.log("User not found in database, creating new user");
    const newUser = await addUser({
      id: loggedInUser.id,
      username: parseUsername(loggedInUser.fullName!),
      email:
        loggedInUser.primaryEmailAddress?.emailAddress ||
        loggedInUser.emailAddresses[0]?.emailAddress,
      imageUrl: loggedInUser?.imageUrl,
    });

    console.log("New user created with ID: ", newUser._id);
    const user = {
      _id: newUser._id,
      username: newUser.username,
      imageUrl: newUser.imageUrl,
      email: newUser.email,
    };

    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return { error: "Failed to fetch user" };
  }
};