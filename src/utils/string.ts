// create slug from title
export const createSlug = (title: string) => {
  // 1. Convert title to lowercase
  // 2. Change all spaces to hyphens
  // 3. Change all symbols to hyphens
  // 4. Change all multiple hyphens to a single hyphen
  // 5. Remove all hyphens at the beginning and end

  return title
    .toLowerCase() // convert to lowercase
    .replace(/\s/g, "-") // change all spaces to hyphens
    .replace(/[^a-z0-9-]/g, "-") // change all symbols to hyphens
    .replace(/-+/g, "-") // change all multiple hyphens to a single hyphen
    .replace(/^-|-$/g, ""); // remove all hyphens at the beginning and end
};
