function trimSpace(value: string): string {
  const arrValue = value.split('')
  const result: string[] = []
  let rightP = 0
  let leftP = rightP

  for (; rightP < arrValue.length; rightP++){
    const item = arrValue[rightP]
    const isLetter = item >= 'a' && item <= 'z'
    const isSpace = item === ' '
    const isComma = !isLetter && !isSpace

    if (isLetter) {
      if (rightP - leftP > 1 && result.length > 0) {
        result.push(' ')
      }
      result.push(item)
      leftP = rightP
    }

    if (isComma) {
      result.push(item)
      leftP = rightP
    }
  }

  return result.join('')
};

console.log(trimSpace('   a hello    shopee , welcome!  a  b')) // 'a hello shopee, welcome! a b'