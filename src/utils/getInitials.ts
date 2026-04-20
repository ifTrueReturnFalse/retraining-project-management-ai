/**
 * Extracts the first letter of each word in a string and converts them to uppercase.
 * Useful for generating user avatars or profile placeholders.
 * 
 * @param names - A string containing one or more words (e.g., "John Doe").
 * @returns A string representing the initials (e.g., "JD").
 */
export function getInitials(names: string): string {
  // Split the input string into an array of words based on spaces
  const separatedNames = names.split(" ");
  const initials: string[] = [];

  separatedNames.forEach((name) => {
    if (name.length > 0) {
      // Take the first character of the word and transform it to uppercase
      initials.push(name[0].toUpperCase());
    }
  });
  
  // Combine all collected initials into a single string
  return initials.join("");
}
