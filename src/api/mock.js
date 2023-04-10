import Mock from 'mockjs'
import homeApi from './mockServerData/home'
import permission from './mockServerData/permission'
import user from './mockServerData/user'

// Mock.mock('/api/home/getData', 'get', function () {
//     // 拦截后的请求处理逻辑
//     console.log('拦截到了');
// })
// 定义Mock请求拦截
Mock.mock('/api/home/getData', homeApi.getStatisticalData)

// 用户列表的数据
Mock.mock('/api/user/add', 'post', user.createUser)
Mock.mock('/api/user/edit', 'post', user.updateUser)
Mock.mock('/api/user/delete', 'post', user.deleteUser)
// 当接口出现404的时候可以给mock的接口改为正则
Mock.mock(/api\/user\/getUser/, user.getUserList)

Mock.mock(/api\/permission\/getMenu/, 'post', permission.getMenu)