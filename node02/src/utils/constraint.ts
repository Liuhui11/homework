
/**
 * 必须是一个判定为空的值 undefined | null | '' | NaN
 */
export const Null = val => {
  if (val === undefined || val === null || val === '' || isNaN(val)) {
    return true
  }
  return false
}

/**
 * 必须存在一个值 包括0
 */
export const NotNull = val => {
  return !Null(val)
}

/**
 * 必须是一个数组
 */
export const isNumber = val => {
  return typeof val === 'number'
}

/**
 * 必须是一个数字并且大于等于最小值
 */
export const Min = (val, min) => {
  return isNumber(val) && val >= min
}

/**
 * 必须是一个数字并且小于等于最大值
 */
export const Max = (val, max) => {
  return isNumber(val) && val <= max
}

/**
 * 必须是一个数字并且在指定范围
 */
export const Size = (val, min, max) => {
  return isNumber(val) && Min(val, min) && Max(val, max)
}
