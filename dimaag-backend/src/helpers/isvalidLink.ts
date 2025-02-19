export const isValidLink = (link: string): boolean => {
  return /^https?:\/\/(?:www\.)?(youtube\.com|youtu\.be)(\/|$)/i.test(link);
};
