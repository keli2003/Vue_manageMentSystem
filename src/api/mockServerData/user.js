import Mock from "mockjs";

//get请求从config.url获取参数，post从config.body中获取参数
function param2Obj(url) {
    const search = url.split('?')[1]
    if (!search) {
        return {}
    }
    return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')

}
let List = []
const count = 200
for (let i = 0; i < count; i++) {
    List.push(
        Mock.mock({
            id: Mock.Random.guid(),
            name: Mock.Random.cname(),
            address: Mock.mock('@county(true)'), 'age|18-60': 1,
            birth: Mock.Random.date(),
            gender: Mock.Random.integer(0, 1)
        })
    )
}
export default {
    /* 
        获取列表
        要带参数 name page limit name可以不填 page limit有默认值
    */
    getUserList: config => {
        console.log('config', config);
        const { name, page = 1, limit = 20, } = param2Obj(config.url)
        console.log('name' + name, 'page' + page, '分页大小limit:' + limit)
        const mockList = List.filter(user => {
            if (name && user.name.indexOf(name) === -1 && user.address.indexOf(name) === -1) return false
            return true
        })
        const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
        return {
            code: 20000,
            count: mockList.length,
            lsit: pageList
        }
    },

    /* 
        增加用户
    */
    createUser: config => {
        const { name, address, age, birth, gender } = JSON.parse(config.body)
        console.log(JSON.parse(config.body))
        List.unshift({
            id: Mock.Random.guid(),
            name: name,
            address: address,
            age: age,
            gender: gender,
            birth: birth,
        })
        return {
            code: 20000,
            data: {
                message: '添加成功'
            }
        }
    },
    /*
        删除用户
    */
    deleteUser: config => {
        const { id } = JSON.parse(config.body)
        if (!id) {
            return {
                code: - 999,
                message: '参数不正确'
            }
        } else {
            List = List.filter(u => u.id !== id)
            return {
                code: 20000,
                message: '批量删除成功'
            }
        }
    },
    /* 
        批量删除

    */
    batchremove: config => {
        let { ids } = param2Obj(config.url)
        ids = ids.split(',')
        List = List.filter(u => !ids.includes(u.id))
        return {
            code: 20000,
            data: {
                message: '批量删除成功'
            }
        }
    },
    /* 修改用户 */
    updateUser: config => {
        const { id, name, address, age, birth, gender } = JSON.parse(config.body)
        const gender_num = parseInt(gender)
        List.some(u => {
            if (u.id === id) {
                u.name = name
                u.address = address
                u.age = age
                u.birth = birth
                u.gender = gender_num
                return true
            }
        })
        return {
            code: 20000,
            data: {
                message: '编辑成功'
            }
        }
    }
}
