/*
 * @Author: Kaiser
 * @Date: 2019-06-17 15:18:10
 * @Last Modified by: Kaiser
 * @Last Modified time: 2019-06-17 15:32:57
 */


const getVue = (file: String) => () => import(`@/pages/${file}`);
// const importLocal = (file: String) => require(`@/pages/${file}`);
// const _import = importDevelopmentAndProduction;

export default getVue;
