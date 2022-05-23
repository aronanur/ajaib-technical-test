const Helper = {
  sortArrayOfObject: (data, sortType, field) => {
    if (sortType === 'ASC') {
      return data.sort((a, b) => (a[field] > b[field] ? 1 : b[field] > a[field] ? -1 : 0))
    } else {
      return data.sort((a, b) => (a[field] < b[field] ? 1 : b[field] < a[field] ? -1 : 0))
    }
  },
  getLastPathSegment: (path) => {
    return path.substr(path.lastIndexOf('/') + 1)
  },
  paramsSerializer: (params) => {
    return Object.entries(Object.assign({}, params))
      .map(([key, value]) => `${key}=${value}`)
      .join('&')
  },
  formatRupiah: (number) => {
    let string = String(number)
    let reverse = string.split('').reverse().join('')

    let stringReverse = ''
    for (let i = 0; i < reverse.length; i++) {
      stringReverse += reverse[i]
      if ((i + 1) % 3 == 0 && i !== reverse.length - 1) {
        stringReverse += '.'
      }
    }
    let toConvert = stringReverse.split('').reverse().join('')
    return `Rp. ${toConvert}`
  },
  badgeConverter: (value, rules) => {
    if (!Array.isArray(rules)) {
      return 'primary'
    }
    const badgeData = rules.find((rules) => rules.value === value)

    return badgeData.color || 'primary'
  },
}

export default Helper
