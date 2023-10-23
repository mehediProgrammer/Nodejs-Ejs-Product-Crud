/**
 * Create a random id
 */
export const getRandomUniqueID = (length = 26) => {
  const timestamp = ((new Date().getTime() / 1000) | 0)
    .toString(16)
    .padStart(8, "0");
  const machineId = Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0");
  const processId = process.pid.toString(16).padStart(4, "0");
  const randomValue = Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0");

  return `${timestamp}${machineId}${processId}${randomValue}`.slice(0, 24);
};
/**
 * Create a slug
 */

export const createateSlug = (name) => {
  // Convert the name to lowercase and replace spaces with dashes
  const slug = name.toLowerCase().replace(/\s+/g, "-");

  // Remove any special characters
  const cleanedSlug = slug.replace(/[^\w-]+/g, "");

  return cleanedSlug;
};
