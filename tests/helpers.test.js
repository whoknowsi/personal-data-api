const { returnLetterWithALeftScoreToUpperCase, getRandomFromArray } = require('../utils/helpers')

const characters = 'a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z'

test('setToUpperCase', () => {
  const randomChar = getRandomFromArray(characters)
  expect(returnLetterWithALeftScoreToUpperCase(`-${randomChar}`)).toBe(randomChar.toUpperCase())
})
