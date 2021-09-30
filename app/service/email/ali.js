module.exports = app => {
    class AliService extends app.Service {
      // 列表
      async list(query){
        const {page, size, status, keyword} = query
  
        let where = {}
        if (status != undefined && status.length != 0) where.status = status// 筛选状态
        if (keyword && keyword.length != 0){// 查询关键词
          where[this.app.Sequelize.Op.or] = [
            {account: {[this.app.Sequelize.Op.like]: `%${keyword}%`}},
            {password: {[this.app.Sequelize.Op.like]: `%${keyword}%`}},
            {phone: {[this.app.Sequelize.Op.like]: `%${keyword}%`}},
            {desc: {[this.app.Sequelize.Op.like]: `%${keyword}%`}}
          ]
        }
  
        // 全部数据
        const data = await this.app.model.EmailAli.findAndCountAll({
          where: where,
          offset: (Number(page)- 1) * size,
          limit: Number(size),
          order: [['updateTime', 'DESC']]
        })

        return {
          code: 200,
          data: {
            list: data.rows,
            total: data.count
          }
        }
      }
  
      // 新增
      async add(body){
        try{
          await this.app.model.EmailAli.create(body)
          return {
            code: 200,
            msg: '新增成功'
          }
        }catch{
          return {
            code: 201,
            msg: '新增失败, 数据已存在'
          }
        }
      }
  
      // 编辑
      async edit(body){
        const {id} = body 
        const ali = await this.app.model.EmailAli.findByPk(id)
        if (!ali) {
          return {
            code: 404,
            msg: '编辑失败, 数据不存在'
          }
        }
  
        try{
          await ali.update(body)
          return {
            code: 200,
            msg: '编辑成功'
          }
        }catch{
          return {
            code: 201,
            msg: '编辑失败, 数据重复'
          }
        }
      }
  
      // 删除
      async delete(body){
        const {id} = body 
        const ali = await this.app.model.EmailAli.findByPk(id)
        if (!ali) {
          return {
            code: 404,
            msg: '删除失败, 数据不存在'
          }
        }
  
        await ali.destroy()
        return {
          code: 200,
          msg: '删除成功'
        }
      }
  
      // 表格
      async excel(){
        const total = await this.app.model.query('SELECT COUNT(`id`) as `count` FROM `email_ali`')
        return this.list({page: 1, size: total[0][0].count})
      }

      // 获取邮箱列表
      async email(body){
        const {id} = body
        const ali = await this.app.model.EmailAli.findByPk(id)
        if (!ali) {
          return {
            code: 404,
            msg: '获取失败, 数据不存在'
          }
        }

        // 查找cookie 
        if ((ali.cookies.indexOf('alimail_core_session_key') == -1 && ali.cookies.indexOf('_csrf_token_') == -1) || (!ali.cookies)){
          return {
            code: 404,
            msg: 'Cookie参数格式不正确, 缺少 alimail_core_session_key 或 _csrf_token_'
          }
        }

        const cookies = ali.cookies.replace("'", '').replace(' ', '')
        let list = cookies.split(';')
        let _csrf_token_ = ''
        let alimail_core_session_key = ''
        list.forEach(item => {
            if (item.indexOf('_csrf_token_') != -1){
              _csrf_token_ = item.split('=')[1]
            }
            if (item.indexOf('alimail_core_session_key') != -1){
                alimail_core_session_key = item.split('=')[1]
            }
        })

        // 发送请求
        const api = 'http://mail.hichina.com/alimail/ajax/mail/queryMailList.txt'// 阿里邮箱api
        const rsp = await app.curl(api, {
          method: 'POST',
          headers: {'Cookie': cookies},
          data: {showFrom: 1, query:  '{folderIds:[2]}', offset: 0, length: 10, _csrf_token_: _csrf_token_},
          dataType: 'json',
          timeout: 10000,
        })

        if (rsp.data.status != 0){
          return {
            code: 404,
            msg: 'Cookie 失效, 请重新配置Cookie'
          }
        }
        
        return {
          code: 200,
          data: rsp.data.dataList
        }
      }
    }
    return AliService
  }
  
  
  
  