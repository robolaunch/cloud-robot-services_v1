export default function getAvaliableFiles(dbRes: any, apacheRes: any) {
  const databaseDataCount = Math.floor(dbRes.rows[0].count / 100);
  const apacheFileCount = (apacheRes.data.match(/href/g) || []).length;
  const availableFileCount = Math.abs(databaseDataCount - apacheFileCount);

  const availableFiles = Array.from(
    { length: availableFileCount },
    (_, i) => i + 1 + databaseDataCount
  );

  return availableFiles;
}
