const Ajv = require('ajv');
const ajv = new Ajv();
const data = {
  a: 1.1,
  c: [0.1, { a: 1}, 'a'],
}
const scheme = {
  type: 'object',
  properties: {
    a: {
      type: 'number',
      multipleOf: 0.01
    },
    b: {
      type: 'string'
    },
    c: {
      type: 'array',
      items: {
        oneOf: [
          { type: 'number' },
          { type: 'object' }
        ]
      }
    }
  },
  required: ['a', 'c']
}
const validate = ajv.compile(scheme)
console.log(validate(data));