const data = [
  { name: 'Charlie', age: 30 },
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 35 },
];

describe('sortByStringProperty', () => {
  it('should sort an array of objects by a string property', () => {
    const sortedData = sortByStringProperty(data, 'name');

    expect(sortedData).toEqual([
      { name: 'Alice', age: 25 },
      { name: 'Bob', age: 35 },
      { name: 'Charlie', age: 30 },
    ]);
  });

  it('should sort an array of objects by a string property using a custom getter', () => {
    const sortedData = sortByStringProperty(data, (item) => item.name);

    expect(sortedData).toEqual([
      { name: 'Alice', age: 25 },
      { name: 'Bob', age: 35 },
      { name: 'Charlie', age: 30 },
    ]);
  });

  it('should handle an empty array', () => {
    const emptyArray: any[] = [];
    const sortedData = sortByStringProperty(emptyArray, 'name');

    expect(sortedData).toEqual([]);
  });

  it('should handle an array with a single element', () => {
    const singleElementArray = [{ name: 'Alice', age: 25 }];
    const sortedData = sortByStringProperty(singleElementArray, 'name');

    expect(sortedData).toEqual([{ name: 'Alice', age: 25 }]);
  });

  it('should sort case-insensitively by default (localeCompare behavior)', () => {
    const caseData = [
      { name: 'zebra' },
      { name: 'Apple' },
      { name: 'banana' },
    ];
    const sortedCaseData = sortByStringProperty(caseData, 'name');

    expect(sortedCaseData[0].name.toLowerCase()).toBe('apple');
    expect(sortedCaseData[1].name.toLowerCase()).toBe('banana');
    expect(sortedCaseData[2].name.toLowerCase()).toBe('zebra');
  });
});
