import http from "../utils/request";

// 请求首页数据
export const getData = () => {
    // 返回一个promise对象
    return http.get('home/getData')
}

export const getUser = (params) => {
    // 返回用户列表
    return http.get('/user/getUser', params)
}
export const addUser = (data) => {
    // 返回新增用户的数据
    return http.post('/user/add', data)
}
export const editUser = (data) => {
    // 返回修改后的用户数据
    return http.post('/user/edit', data)
}
export const deleteUser = (data) => {
    // 返回删除后的用户数据
    return http.post('/user/delete', data)
}