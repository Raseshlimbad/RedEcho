import { defineQuery } from "groq";
import { sanityFetch } from "../live";

export async function getSubechos() {
  const getSubechosQuery = defineQuery(`*[_type == "subecho"] {
        ...,
        "slug": slug.current,
        "moderator": moderator->,
    } | order(createdAt desc)`);

  const subechos = await sanityFetch({ query: getSubechosQuery });

  return subechos.data;
}
