export function driveToImageUrl(
  url: string
) {

  const match =
    url?.match(
      /\/d\/([^/]+)\//
    );

  if (!match)
    return url;

  const fileId =
    match[1];

  return `https://lh3.googleusercontent.com/d/${fileId}=w2000`;
}