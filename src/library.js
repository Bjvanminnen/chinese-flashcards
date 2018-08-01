import _ from 'lodash';

// TODO: should really have deterministic shuffling/randomness

export function getShuffledCharacters(characters) {
  return _.shuffle(characters).map(c => ({
    chinese: c[0],
    pinyin: c[1],
    english: c[2],
  }));
}
