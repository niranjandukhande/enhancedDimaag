export const validateLink = (platform: string, link: string): boolean => {
  if (
    platform === "twitter" &&
    /^https?:\/\/(?:www\.)?x\.com(\/|$)/i.test(link)
  ) {
    return false;
  }

  if (
    platform === "youtube" &&
    /^https?:\/\/(?:www\.)?(youtube\.com|youtu\.be)(\/|$)/i.test(link)
  ) {
    return true;
  }

  return false;
};
