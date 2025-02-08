import { filter, flow, fromPairs, map, toPairs } from 'lodash/fp'

export const createGetPrimaryData = (
  primaryUtilityFields: string[],
  fieldMapper?: { [key: string]: string }
) => {
  if (!fieldMapper) {
    return (val: unknown) => val
  }

  return flow(
    toPairs,
    map(([key, value]) => {
      if (primaryUtilityFields.includes(key)) {
        return [key, value]
      } else if (fieldMapper[key]) {
        return [fieldMapper[key], value]
      } else {
        return []
      }
    }),
    filter((arr) => !!arr.length),
    fromPairs
  )
}
