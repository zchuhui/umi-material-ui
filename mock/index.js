export default {
    'get /index': {
      data: [
        {
          id: 1,
          name: '阅读量',
          value: 10,
          unit:'页',
          introduction:'每周阅读量统计'
        },
        {
          id: 2,
          name: '运动量',
          value: 3,
          unit:'小时',
          introduction:'每周运动量统计'
        },
        {
          id: 3,
          name: '开销',
          value: 9099,
          unit:'元',
          introduction:'每周开销统计'
        },
        {
          id: 4,
          name: '工作量',
          value: 50,
          unit:'小时',
          introduction:'每周工作量统计'
        }
      ],
      code:200,
      msg:'success!'
    }
  }
