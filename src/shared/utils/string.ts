export function pluralize(word: string, count: number) {
  if (count === 1) return word;

  const lastWord = word[word.length - 1].toLowerCase();

  if (["a", "e", "i", "o", "u"].includes(lastWord)) {
    return word + "s";
  }

  return word + "es";
}
