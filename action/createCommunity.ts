"use server";

import { createSubecho } from "@/sanity/lib/subechos/createSubecho";
import { getUser } from "@/sanity/lib/user/getUser";

export type ImageData = {
  base64: string;
  file: File;
  contentType: string;
} | null;

export const createCommunity = async (
  name: string,
  imageBase64: string | null | undefined,
  imageFileName: string | null | undefined,
  imageContentType: string | null | undefined,
  slug?: string,
  description?: string
) => {
  try {
    const user = await getUser();

    if ("error" in user) {
      return { error: "Failed to fetch user" };
    }

    // // Prepare image data if provided
    // let imageData: ImageData = null;
    // if (imageBase64 && imageFileName && imageContentType) {
    //   const imageData= {
    //     base64: imageBase64,
    //     filename: imageFileName,
    //     contentType: imageContentType,
    //   };
    // }

        // Prepare image data if provided
        let imageData: ImageData = null;
        if (imageBase64 && imageFileName && imageContentType) {
          imageData = {             // <-- Fixed: Assigning to existing variable
            base64: imageBase64,
            file: new File([imageBase64], imageFileName),  // <-- Fixed: Matching interface
            contentType: imageContentType,
          };
        }

    const result = await createSubecho(
        name,
        user._id,
        imageData,
        slug,
        description
    );

    return result;

  } catch (error) {
    console.error("Error creating community:", error);
    return { error: "Failed to create community" };
  }
};
