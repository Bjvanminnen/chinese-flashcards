const characters = [
  ['你', 'nǐ', 'you'],
  ['好', 'hǎo', 'good'],
  ['再', 'zài', 'again'],
  ['见', 'jiàn', 'see'],
  ['零', 'líng', 'zero'],
  ['一', 'yī', 'one'],
  ['二', 'èr', 'two'],
  ['三', 'sān', 'three'],
  ['四', 'sì', 'four'],
  ['五', 'wǔ', 'five'],
  ['六', 'liù', 'six'],
  ['七', 'qī', 'seven'],
  ['八', 'bā', 'eight'],
  ['九', 'jiǔ', 'nine'],
  ['十', 'shí', 'ten'],
  ['百', 'bǎi', 'hundred'],
  ['我', 'wǒ', 'me'],
  ['叫', 'jiào', 'called'],
  ['吗', 'ma', 'question marker'],
  ['人', 'rén', 'person'],
  ['女', 'nǚ', 'female'],
  ['男', 'nán', 'male'],
  ['孩', 'hái', 'child'],
  ['高兴', 'gāoxìng', 'happy (high happy)'],
  ['也', 'yĕ', 'also'],
  ['认识', 'rènshí', 'to know (both characters seem to also mean this individually?)'],
  ['王', 'wáng', 'king/surname'],
  ['李', 'lǐ', 'surname'],
  ['很', 'hĕn', 'very'],
  ['名字', 'míngzi', 'name character'],
  ['姓', 'xìng', 'surname'],
  ['什么', 'shénme', 'what / interrogative'],
  ['是', 'shì', 'to be'],
  ['元', 'yuán', 'Chinese currency (RMB)'],
  ['的', 'de', 'makes personal pronouns possessive'],
  ['果', 'guŏ', 'fruit'],
  ['水', 'shuĭ', 'water'],

  ['鱼', 'yú', 'fish'],
  ['面', 'miàn', 'noodles'],
  ['吃', 'chī', '	eat'],
  ['饭', 'fàn', 'rice / meal'],
  ['喝', 'hē', '	to drink'],
  ['茶', 'chá', 'tea'],
  ['不', 'bù', 'not'],
];

let currentCharacter = -1;

export function getCharacter() {
  // Make sure we dont give the same character
  let index;
  do {
    index = ~~(Math.random() * characters.length);
  } while (index === currentCharacter);
  currentCharacter = index;

  const char = characters[index];
  return {
    chinese: char[0],
    pinyin: char[1],
    english: char[2],
  };
}
