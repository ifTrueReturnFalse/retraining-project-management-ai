export function getInitials(names: string): string {
  const separatedNames = names.split(" ");
  const initials: string[] = [];

  separatedNames.forEach((name) => {
    initials.push(name[0].toUpperCase());
  });
  
  return initials.join("");
}
