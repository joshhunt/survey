export function findText($: CheerioStatic, matchString: string) {
  let matches = false;
  $("*")
    .contents()
    .each((index, node) => {
      const text = node.data?.trim();
      matches = matches || text === matchString;
    });

  return matches;
}
