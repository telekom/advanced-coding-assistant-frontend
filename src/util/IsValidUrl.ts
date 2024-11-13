export const isValidUrl = (url: string): boolean => {
  const WHITELIST = import.meta.env.VITE_APP_WHITELIST.split(',');
  try {
    const parsedUrl = new URL(url);
    return WHITELIST.some((allowedUrl: string) => parsedUrl.href.startsWith(allowedUrl));
  } catch (e: unknown) {
    throw new Error((e as Error).message);
  }
};
