const regex = /^[^-/][^/]*$/;

export const isValidFileName = (fileName: string) => {
  return regex.test(fileName);
};
