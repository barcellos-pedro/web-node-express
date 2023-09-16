const FORTUNES = [
  "Conquer your fears or they will conquer you.",
  "Rivers need springs.",
  "Do not fear what you don't know.",
  "You will have a pleasant surprise.",
  "Whenever possible, keep it simple.",
]

module.exports = () => {
  const randomIndex = Math.floor(Math.random() * FORTUNES.length)
  return FORTUNES[randomIndex]
}
