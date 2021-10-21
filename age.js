module.exports = (birthStr) => {
  const now = new Date()
  const birthDate = new Date(birthStr)

  let age = now.getFullYear() - birthDate.getFullYear()

  const mDiff = now.getMonth() - birthDate.getMonth()
  const dDiff = now.getDate() - birthDate.getDate()

  if (mDiff < 0 || (mDiff === 0 && dDiff < 0)) {
    age--
  }

  return age
}
