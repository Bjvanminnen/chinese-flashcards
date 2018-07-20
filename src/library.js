import _ from 'lodash';
import {characters} from './characters';

export function getShuffledCharacters() {
  return _.shuffle(characters).map(c => ({
    chinese: c[0],
    pinyin: c[1],
    english: c[2],
  }));
}
