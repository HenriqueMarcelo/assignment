function hexTimeStamp() {
  const timestamp = Date.now()
  const timestampHex = timestamp.toString(16)

  return timestampHex
}

export function createUUID() {
  const chars = '0123456789abcdef'.split('')

  const uuid = hexTimeStamp().split('')
  // const uuid = []
  const rnd = Math.random
  let r
  uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
  uuid[14] = '4' // version 4

  for (let i = 0; i < 36; i++) {
    if (!uuid[i]) {
      r = 0 | (rnd() * 16)

      uuid[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r & 0xf]
    }
  }

  return uuid.join('')
}
