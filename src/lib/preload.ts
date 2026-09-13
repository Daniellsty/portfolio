export function preloadImages(
  urls: string[],
  onProgress?: (progress: number) => void,
): Promise<void> {
  if (urls.length === 0) {
    onProgress?.(1)
    return Promise.resolve()
  }

  let done = 0

  return Promise.all(
    urls.map(
      (url) =>
        new Promise<void>((resolve) => {
          const image = new Image()
          const finish = () => {
            done += 1
            onProgress?.(done / urls.length)
            resolve()
          }
          image.onload = finish
          image.onerror = finish
          image.src = url
        }),
    ),
  ).then(() => undefined)
}
