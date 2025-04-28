import { ImageData } from "action/createCommunity";
import { sanityFetch } from "../live";
import { defineQuery } from "groq";
import { adminClient } from "../adminClient";
import { Subecho } from "sanity.types";

export const createSubecho = async (
  name: string,
  moderatorId: string,
  imageData: ImageData | null,
  customSlug?: string,
  customDescription?: string
) => {
  console.log(`Creating subecho: ${name} with moderator: ${moderatorId}`);
  try {
    // Check if Subecho with the same name already exists
    const checkExistingSubechoQuery = defineQuery(
      `*[_type == "subecho" && name == $name][0]{
            id
        }`
    );

    const existingSubecho = await sanityFetch({
      query: checkExistingSubechoQuery,
      params: { name },
    });

    if (existingSubecho.data) {
      console.log(`Subecho ${name} already exists`);
      return { error: "Subecho with this name already exists" };
    }

    // Check if slug is already taken if customSlug is provided
    if (customSlug) {
      const checkSlugQuery = defineQuery(
        `*[_type == "subecho" && slug.current == $slug][0]{
            id
        }`
      );

      const existingSlug = await sanityFetch({
        query: checkSlugQuery,
        params: { slug: customSlug },
      });

      if (existingSlug.data) {
        console.log(`Slug ${customSlug} is already taken`);
        return { error: "Slug is already taken" };
      }
    }

    const slug = customSlug || name.toLowerCase().replace(/\s+/g, "-");

    // upload image if provided
    let imageAsset = null;
    if (imageData) {
      const base64 = imageData.base64.split(",")[1];
      const buffer = Buffer.from(base64, "base64");
      imageAsset = await adminClient.assets.upload("image", buffer, {
        filename: imageData.file.name,
        contentType: imageData.contentType,
      });

      console.log("Image uploaded successfully:", imageAsset);
    }

    // Create the subecho
    const subechoDoc: Partial<Subecho> = {
      _type: "subecho",
      title: name,
      description: customDescription || `Welcome to e/${name}!`,
      slug: {
        _type: "slug",
        current: slug,
      },
      moderator: {
        _type: "reference",
        _ref: moderatorId,
      },
      createdAt: new Date().toISOString(),
    };

    // Add image if available
    if (imageAsset) {
      subechoDoc.image = {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: imageAsset._id,
        },
      };
    }

    const createdSubecho = await adminClient.create(subechoDoc as Subecho);
    console.log("Subecho created successfully:", createdSubecho);
    return { subecho: createdSubecho };
  } catch (error) {
    console.error("Error creating subecho:", error);
    return { error: "Failed to create subecho" };
  }
};
