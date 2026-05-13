export const getUser = () => {
  const raw = sessionStorage.getItem('user')
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export const setUser = (user) => {
  sessionStorage.setItem('user', JSON.stringify(user))
}

export const clearUser = () => {
  sessionStorage.removeItem('user')
}
