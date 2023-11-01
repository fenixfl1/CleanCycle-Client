function getBase64<T>(file: T): Promise<string> {
  try {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file as any)
      reader.onload = () => resolve(reader.result as never)
      reader.onerror = (error) => reject(error)
    })
  } catch (error) {
    return Promise.reject(null)
  }
}

export default getBase64
