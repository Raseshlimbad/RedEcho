import { sanityFetch } from "../live";
import { defineQuery } from "groq";

export const getPosts = async () => {
  // const getAllPostsQuery =
  //   defineQuery(`*[_type == "post" && isDeleted != true] {
  //   _id,
  //   title,
  //   "slug": slug.current,
  //   body,
  //   publishedAt,
  //   "author": author->,
  //   "subecho": subecho->,
  //   image,
  //   isDeleted,
  // } | order(publishedAt desc)`);
  const getAllPostsQuery =
    defineQuery(`*[_type == "post" && isDeleted == false] {
      _id,
      title,
      "slug": slug.current,
      body,
      publishedAt,
      "author": author->,
      "subecho": subecho->{
        ...,
        image{
        alt,
        "url": asset-> url
      },
      },
      image{
        alt,
        "url": asset-> url
      },
      isDeleted,
    } | order(publishedAt desc)`);

  const posts = await sanityFetch({ query: getAllPostsQuery });
  return posts.data;
};
