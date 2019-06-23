/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/*
 * @Author: Kaiser
 * @Date: 2019-06-17 15:18:10
 * @Last Modified by: Kaiser
 * @Last Modified time: 2019-06-23 15:22:08
 */

const syncImport = (file: String) => require(`@/pages/${file}`).default;
export default syncImport;
