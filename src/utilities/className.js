export function cnMap(type = undefined, map) {
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
export function baseCn({ overRideBaseStyles, className, baseClasses }) {
  if (!overRideBaseStyles) {
    return `${baseClasses} ${className ?? ""}`
  } else return `${className ?? ""}`
}
