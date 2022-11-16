const randomStringFromArray = (originalArray: string[]) => {
  const randomSelection = (n: number) => {
    let newArr: string[] = [];
    if (n >= originalArray.length) {
      return originalArray;
    }
    for (let i = 0; i < n; i++) {
      let newElem = originalArray[Math.floor(Math.random() * originalArray.length)];
      while (newArr.includes(newElem)) {
        newElem = originalArray[Math.floor(Math.random() * originalArray.length)];
      }
      newArr.push(newElem);
    }
    return newArr;
  };

  return randomSelection(1)[0];
};
export default randomStringFromArray;
