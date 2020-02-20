export const filterByMultiple = filters => module => filters.every(filter => filter(module))

export const filterByDisplayName = name => module => module.displayName && module.displayName === name

export const filterByProperties = (...properties) => module => properties.every(property => module[property] !== undefined)

export const filterByPrototypeProperties = (...properties) => module => module.prototype && properties.every(property => module.prototype[property] !== undefined)

export const filterSpecific = (field, filter) => module => module[field] && filter(module[field])
export const filterDefault = filter => filterSpecific('default', filter)