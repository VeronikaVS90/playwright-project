export const uniqueEmail = (prefix = "aqa-veronikavs") => {
  const stamp = Date.now();
  return `${prefix}+${stamp}@gmail.com`;
};
