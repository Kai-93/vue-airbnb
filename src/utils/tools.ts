/*
 * @Author: Kaiser 
 * @Date: 2019-06-10 16:36:40 
 * @Last Modified by: Kaiser
 * @Last Modified time: 2019-06-10 16:45:49
 */
/**
 * 判断对象是都为空
 * @param object 目标是对象类型的参数
 * @returns String or Boolean 
 */
export function isObjectEmpty(object: Object) {
  if (getType(object) === "Object") {
    return 'the type of parameter is not an object'
  }
  if (Object.keys(object).length) {
    return false
  }
  return true
}

/**
 * 获取目前的类型
 * @param target 任意类型 
 * @returns String 返回参数的类型
 */
export function getType(target: any) {
  return Object.prototype.toString.call(target).slice(8, -1)
}
