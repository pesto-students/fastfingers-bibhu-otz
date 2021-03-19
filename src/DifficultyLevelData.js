import dictionary from './data/dictionary.json'

const data = dictionary
export const EASY_ARRAY = data.filter(word => word.length <= 4);
export const MEDIUM_ARRAY = data.filter(word => (word.length >=5 && word.length <= 8));
export const HARD_ARRAY = data.filter(word => word.length > 8);