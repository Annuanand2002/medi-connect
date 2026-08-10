export const generateCode = (sequence: number,name:string): string => {
  return `${name}${String(sequence).padStart(3, "0")}`;
};