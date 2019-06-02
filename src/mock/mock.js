// 引入mockjs
import Mock from '_modules/mockjs';
// 使用mockjs模拟数据
// eslint-disable-next-line no-unused-vars
Mock.mock('/api/usercenter', (req, res) => {
  window.console.log(req.body);
});

export default {
  Mock,
};
