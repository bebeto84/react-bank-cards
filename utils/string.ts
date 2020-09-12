export const spaceWordOnCharacters = (
  word: string,
  characters: number
): string =>
  word
    .match(new RegExp(`.{1,${characters}}`, 'g'))
    .join(' ');

export const getNumericValue = (
  currentValue: string,
  evt: any
): string => {
  var charCode = evt.which ? evt.which : evt.keyCode;

  if (charCode > 31 && (charCode < 48 || charCode > 57))
    return currentValue;
  return `${currentValue}${charCode}`;
};
