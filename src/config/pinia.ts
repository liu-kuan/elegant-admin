export const ids = {
  user: 'user',
  perference: 'perference',
  devMode: 'dev-mode',
  meta: 'meta',
}

export const getLocalStorageKeysById = (id: string) => {
  return `pinia-persisted-${id}`
}
