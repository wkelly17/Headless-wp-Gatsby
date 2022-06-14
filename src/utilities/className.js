export default function cn(type = undefined, map) {
  if (!type) {
    return
  }
  if (Array.isArray(type)) {
    let total = ""
    type.forEach((t) => {
      total += " " + map[t]
    })
    return total
  } else {
    return map[type]
  }
}
