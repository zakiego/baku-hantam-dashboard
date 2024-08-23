export const trimUrl = (url: string) => {
  return url.replace(/(^\w+:|^)\/\//, '')
}
