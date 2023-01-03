const mongooseDateToYYYYMMDD = (date) => {
  const formattedDate = new Date(date).toLocaleString("eu-ES", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  })
  return formattedDate
}

const getRandomFromArray = (array) => array[Math.floor(Math.random() * array.length)]

const toCamelCase = (value) => value.replace(/([-_]\w)/g, returnLetterWithALeftScoreToUpperCase)
const returnLetterWithALeftScoreToUpperCase = (charWithScoreOnLeft) => charWithScoreOnLeft[1].toUpperCase()

module.exports = { mongooseDateToYYYYMMDD, getRandomFromArray, toCamelCase, returnLetterWithALeftScoreToUpperCase }