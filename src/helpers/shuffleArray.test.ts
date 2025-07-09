describe('shuffleArray', () => {
  it('should return a new array', () => {
    const originalArray = [1, 2, 3];
    const shuffledArray = shuffleArray(originalArray);

    expect(shuffledArray).not.toBe(originalArray);
  });

  it('should return an array of the same length', () => {
    const originalArray = [1, 2, 3, 4, 5];
    const shuffledArray = shuffleArray(originalArray);

    expect(shuffledArray.length).toBe(originalArray.length);
  });

  it('should contain the same elements as the original array', () => {
    const originalArray = [1, 2, 3, 4, 5];
    const shuffledArray = shuffleArray(originalArray);

    expect(shuffledArray).toEqual(expect.arrayContaining(originalArray));
    expect(originalArray).toEqual(expect.arrayContaining(shuffledArray));
  });

  it('should return an empty array if given an empty array', () => {
    const originalArray: number[] = [];
    const shuffledArray = shuffleArray(originalArray);

    expect(shuffledArray).toEqual([]);
  });

  it('should return a single-element array if given a single-element array', () => {
    const originalArray = [1];
    const shuffledArray = shuffleArray(originalArray);

    expect(shuffledArray).toEqual([1]);
  });

  // This test is probabilistic and might fail rarely
  it('should likely change the order of elements for a larger array', () => {
    const originalArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let isShuffled = false;

    for (let i = 0; i < 10; i++) { // Try a few times to reduce flakiness
      const shuffledArray = shuffleArray(originalArray);

      if (shuffledArray.join(',') !== originalArray.join(',')) {
        isShuffled = true;

        break;
      }
    }

    expect(isShuffled).toBe(true);
  });
});
