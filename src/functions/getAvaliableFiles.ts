export default function getAvaliableFiles(dbRes: any, apacheRes: any) {
  const databaseDataCount = Math.floor(dbRes.rows[0].count / 100);

  const hrefPattern = /<a\s+href="([^"]+)">/g;

  const apacheFileCount = [...apacheRes.data.matchAll(hrefPattern)]
    .map((match: any) => match[1])
    .filter((href: any) => href !== "/").length;

  const availableFileCount = Math.abs(databaseDataCount - apacheFileCount);

  const availableFiles = Array.from(
    { length: availableFileCount },
    (_, i) => i + 1 + databaseDataCount
  );

  return availableFiles;
}
