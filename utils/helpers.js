const mongooseDateToYYYYMMDD = (date) => {
  const formattedDate = new Date(date).toLocaleString("eu-ES", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  })
  return formattedDate
}

module.exports = { mongooseDateToYYYYMMDD }