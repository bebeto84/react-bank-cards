export const spaceWordOnCharacters = (
  word: string,
  characters: number
): string =>
  word
    .match(new RegExp(`.{1,${characters}}`, 'g'))
    .join(' ');
