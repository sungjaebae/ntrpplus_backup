import { CharacterName, CharacterImage } from "./Constants";

export const retrunNtrpCharacterName = (ntrp) => {
  if (ntrp >= 4.5) {
    return CharacterName[7];
  }
  if (ntrp >= 4.0) {
    return CharacterName[6];
  }
  if (ntrp >= 3.5) {
    return CharacterName[5];
  }
  if (ntrp >= 3.0) {
    return CharacterName[4];
  }
  if (ntrp >= 2.5) {
    return CharacterName[3];
  }
  if (ntrp >= 2.0) {
    return CharacterName[2];
  }
  return CharacterName[1];
};

export const returnNtrpCharacterImage = (ntrp) => {
  if (ntrp >= 4.5) {
    return CharacterImage[7];
  }
  if (ntrp >= 4.0) {
    return CharacterImage[6];
  }
  if (ntrp >= 3.5) {
    return CharacterImage[5];
  }
  if (ntrp >= 3.0) {
    return CharacterImage[4];
  }
  if (ntrp >= 2.5) {
    return CharacterImage[3];
  }
  if (ntrp >= 2.0) {
    return CharacterImage[2];
  }
  return CharacterImage[1];
};

export const convertTimeToStr = (time) => {
  const newDate = new Date(time);
  return `${newDate.getFullYear()}년 ${newDate.getMonth() + 1}월 ${newDate.getDate()}일`;
};
