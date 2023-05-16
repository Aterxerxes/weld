import get from 'lodash.get'
import set from 'lodash.set'
import unset from 'lodash.unset'

const mapValuesBasedOnSourceKeys = (mapper, source) => {
  const result = { ...source }
  mapper.mappings.forEach((mapping) => {
    let data
    try {
      data = get(source, mapping.source)
    } catch (error) {
      console.error('Error getting data to save.')
    }
    
    if (!data) {
      console.error('No Data found')
    }

    try {
      unset(result, mapping.source)
      set(result, mapping.target, data)
    } catch (error) {
      console.error('Error setting data in object')
    }
  })
  return result
}

const mapValuesBasedOnMapperKeys = (mapper, source) => {
  const result = {}
  if (Array.isArray(mapper.mappings)) {
    mapper.mappings.forEach((mapping) => {
      let data
      try {
        data = get(source, mapping.source)
      } catch (error) {
        console.error('Error getting data to save.')
      }
      
      if (!data) {
        console.error('No Data found')
      }

      try {
        set(result, mapping.target, data)
      } catch (error) {
        console.error('Error setting data in object')
      }
    })
  } else {
    throw new Error ('mapper.mappings must be an array of objects with a source and a target field.')
  }
  return result
}

export const map = ({mapper, source} = {}) => {
  if (!mapper || !source) {
    let message = ''
    if (!mapper) { message += '"mapper" is a required field.\n'}
    if (!source) { message += '"source" is a required field.\n'}
    throw new Error (message)
  }

  if (mapper.include === 'none') {
    return mapValuesBasedOnMapperKeys(mapper, source) 
  }
  return mapValuesBasedOnSourceKeys(mapper, source)
}
