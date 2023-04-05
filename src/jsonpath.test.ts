import { jp } from './jsonpath';

describe('jsonpath test', () => {
  it('sanity test 1', async () => {
    const result = jp({
      json: [
        { name: 'foo', age: 30 },
        { name: 'bar', age: 17 },
      ],
      path: '$.*.name',
    });
    expect(result).toStrictEqual(['foo', 'bar']);
  });
  it('sanity test 2', async () => {
    const result = jp({
      json: [
        { name: 'foo', age: 30 },
        { name: 'bar', age: 17 },
      ],
      path: '$.0.name',
    });
    expect(result).toStrictEqual(['foo']);
  });
  it('sanity test 3', async () => {
    const json = {
      store: {
        book: [
          {
            category: 'reference',
            author: 'Nigel Rees',
            title: 'Sayings of the Century',
            price: 8.95,
          },
          {
            category: 'fiction',
            author: 'Evelyn Waugh',
            title: 'Sword of Honour',
            price: 12.99,
          },
          {
            category: 'fiction',
            author: 'Herman Melville',
            title: 'Moby Dick',
            isbn: '0-553-21311-3',
            price: 8.99,
          },
          {
            category: 'fiction',
            author: 'J. R. R. Tolkien',
            title: 'The Lord of the Rings',
            isbn: '0-395-19395-8',
            price: 22.99,
          },
        ],
        bicycle: {
          color: 'red',
          price: 19.95,
        },
      },
      expensive: 10,
    };
    expect(jp({ json, path: '$.store.book.length' })).toStrictEqual([4]);
  });
  it('sanity test 4', () => {
    expect(() => {
      jp({
        json: [
          { name: 'foo', age: 30 },
          { name: 'bar', age: 17 },
        ],
        path: `$..[?(@property !== this.constructor.constructor("alert('foo')")();)]`,
      });
    }).toThrow();
  });
});
