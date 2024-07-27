export const generateRandomString = (length: number = 6) => {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  let result = ''

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength)
    result += characters[randomIndex]
  }

  return result
}
