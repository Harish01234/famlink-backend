// utils/generateInviteCode.js
export const generateInviteCode = () => {
  const part = () => Math.random().toString(36).substring(2, 6).toUpperCase();
  return `FAM-${part()}${part()}`;
};
