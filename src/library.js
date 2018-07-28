import _ from 'lodash';

export function getShuffledCharacters(characters) {
  return _.shuffle(characters).map(c => ({
    chinese: c[0],
    pinyin: c[1],
    english: c[2],
  }));
}
