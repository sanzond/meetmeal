import Mock from 'mockjs'

let homeList = Mock.mock({
	"code":0,
	"data|4":[{
		"id|+1":1,
		"uid|+1":1,
		"distance|1-10.1":1,
		"age":"@datetime(yyyy)",
		"name":"@cname",
		"gender|1":["0","1"],
		"online|1":["0","1"],
		"score|1":["1.0","1.5","2.0","2.5","3.0","3.5","4.0","4.5","5.0"],
		"title|1":["午餐时间","下午茶时间","晚餐时间"],
		"minTitle|1":["午餐","下午茶","晚餐"],
		"take":"@float(0.5,2,1,1)",
		"countdown":"12:34:43",
		"local":"@province",
		"price|1-100":1,
		"staPrice|1-50":1,
		"time":"@time()",
		"date":"@datetime(M月d日)",
		"job|1":["学生","教师","会计","工程师","自由职业","职员"],
		"fullTime":"@datetime(MM/dd/yyyy hh:mm-hh:mm)",
		"img":"@image(500x500,@color)",
		"imgList":["@image(500x500,@color)","@image(500x800,@color)","@image(500x800,@color)"],
	}],
	"msg":"success,"
})

let person  = Mock.mock({
	"code":0,
	"data|4":[{
		"uid|+1":1,
		"age":"@datetime(yyyy)",
		"name":"@cname",
		"distance|1-10.1":1,
		"job|1":["学生","教师","会计","工程师","自由职业","职员"],
		"gender|1":["0","1"],
		"online|1":["0","1"],
		"distance|1-10.1":1,
		"score|1":["1.0","1.5","2.0","2.5","3.0","3.5","4.0","4.5","5.0"],
		"imgList":["@image(500x800,@color)","@image(500x800,@color)","@image(500x800,@color)"],
		"info":[
			{"name":"身高(cm)","value|150-200":1},
			{"name":"体重(kg)","value|40-80":1},
			{"name":"城市","value":"@province"},
			{"name":"职业","value|1":["学生","教师","会计","工程师","自由职业","职员"],},
			{"name":"抽烟","value|1":["抽烟","不抽烟"]},
			{"name":"喝酒","value|1":["红酒","白酒","啤酒","饮料"]},
			{"name":"爱好","value|1":["唱歌","跳舞","打篮球","踢足球","看电影","逛街"]}],
	}],
	"msg":"success,"
})

let order = Mock.mock({
	"code":0,
	"data|4":[{
		"oid|+1":1,
		"distance|1-10.1":1,
		"age":"@datetime(yyyy)",
		"name":"@cname",
		"gender|1":["0","1"],
		"online|1":["0","1"],
		"take":"@float(0.5,2,1,1)",
		"countdown":"12:34:43",
		"local":"@province",
		"price|1-100":1,
		"staPrice|1-50":1, //起拍价
		"curPrice|40-70":1, //当前价
		"myPrice|30-60":1, //我出价
		"time":"@time()",
		"fullTime":"@datetime(MM/dd/yyyy hh:mm-hh:mm)",
		"img":"@image(500x500,@color)",
		"imgList":["@image(500x800,@color)","@image(500x800,@color)","@image(500x800,@color)"],
	}],
	"msg":"success,"
})

let todayList = Mock.mock({
	"code":0,
	"data|4":[{
		"uid|+1":1,
		"distance|1-10.1":1,
		"age":"@datetime(yyyy)",
		"name":"@cname",
		"score|1":["1.0","1.5","2.0","2.5","3.0","3.5","4.0","4.5","5.0"],
		"gender|1":["0","1"],
		"online|1":["0","1"],
		"title|1":["今日早餐","今日午餐","今日晚餐"],
		"minTitle|1":["早餐","午餐","晚餐"],
		"take":"@float(0.5,2,1,1)",
		"countdown":"12:34:43",
		"local":"@province",
		"price|1-100":1,
		"staPrice|1-50":1,
		"time":"@time()",
		"date":"@datetime(M月d日)",
		"fullTime":"@datetime(MM/dd/yyyy hh:mm-hh:mm)",
		"img":"@image(500x500,@color)",
		"imgList":["@image(500x500,@color)","@image(500x800,@color)","@image(200x500,@color)"],
	}],
	"msg":"success,"
})

let publish = Mock.mock({
	"code":0,
	"data|4":[{
		"oid|+1":1,
		"age":"@datetime(yyyy)",
		"name":"@cname",
		"gender|1":["0","1"],
		"take":"@float(0.5,2,1,1)",
		"countdown":"12:34:43",
		"price|1-100":1,
		"staPrice|1-50":1,
		"timeZone":"@datetime(hh:mm) - @datetime(hh:mm)",
		"time":"@time()",
		"fullTime":"@datetime(MM/dd/yyyy hh:mm-hh:mm)",
		"img":"@image(500x500,@color)",
		"imgList":["@image(500x500,@color)","@image(500x800,@color)","@image(200x500,@color)"],
	}],
	"msg":"success,"
})

let partPerson = Mock.mock({
	"code":0,
	"data|4":[{
		"id|+1":1,
		"oid|+1":1,
		"age":"@datetime(yyyy)",
		"name":"@cname",
		"gender|1":["0","1"],
		"price|1-100":1,
		"time|1-24":1,
		"job|1":["学生","教师","会计","工程师","自由职业","职员"],
		"img":"@image(100x100,@color)",
		"take":"@float(0.5,2,1,1)",
	}],
	"msg":"success,"
})

let toMeet = Mock.mock({
	"code":0,
	"data|4":[{
		"id|+1":1,
		"oid|+1":1,
		"age":"@datetime(yyyy)",
		"name":"@cname",
		"gender|1":["0","1"],
		"price|1-100":1,
		"finPrice|50-100":1,
		"isSet|1":["0","1"],
		"time|1-24":1,
		"job|1":["学生","教师","会计","工程师","自由职业","职员"],
		"address":'@county(true)',
		"timeZone":"@datetime(hh:mm) - @datetime(hh:mm)",
	}],
	"msg":"success,"
})

//消息列表数据
let msgList = Mock.mock({
	"code":0,
	"data|5":[{
		"id|+1":1,
		"mid|+1":1,
		"img":"@image(100x100,@color)",
		"name":"@cname",
		"lastMsg":"@cword(3,40)",
		"time":"@datetime(MM-dd)",
		"unread|1-9":1,
	}],
	"msg":"success,"
})

let chatList = Mock.mock({
	"code":0,
	"data|5":[{
		"id|+1":1,
		"mid|+1":1,
		"img":"@image(100x100,@color)",
		"mineImg":"@image(100x100,@color)",
		"name":"@cname",
		"Msg":[
			{"id|1-2":1,"time":"@datetime(MM-dd)","msg":"@cword(3,40)",},
			{"id|1-2":1,"time":"@datetime(MM-dd)","msg":"@cword(3,40)",},
			{"id|1-2":1,"time":"@datetime(MM-dd)","msg":"@cword(3,40)",},
			{"id|1-2":1,"time":"@datetime(MM-dd)","msg":"@cword(3,40)",},
			{"id|1-2":1,"time":"@datetime(MM-dd)","msg":"@cword(3,40)",},
			{"id|1-2":1,"time":"@datetime(MM-dd)","msg":"@cword(3,40)",},
			{"id|1-2":1,"time":"@datetime(MM-dd)","msg":"@cword(3,40)",},
			],
	}],
	"msg":"success,"
})

//个人信息数据
let mine = Mock.mock({
	"code":0,
	"data":[{
		"id|+1":1,
		"oid|+1":1,
		"name":"@cname",
		"bidAcco":"@integer(100000,600000)",
		"img":"@image(100x100,@color)",
	}],
	"msg":"success,"
})

// 参与订单页，已结束数据
let partFinOrder = Mock.mock({
	"code":0,
	"data|4":[{
		"oid|+1":1,
		"age":"@datetime(yyyy)",
		"name":"@cname",
		"gender|1":["0","1"],
		"countdown":"12:34:43",
		"address":'@county(true)',
		"take|1-5":1,
		"staPrice|1-50":1, //起拍价
		"finPrice|30-60":1, //最终价
		"fullTime":"@datetime(MM/dd/yyyy hh:mm-hh:mm)",
		}],
	"msg":"success,"
})

let d1 = Mock.mock(RegExp(process.env.VUE_APP_API_URL + '/rest/V1/product-list' + ".*"),"get", homeList)
let d2 = Mock.mock(RegExp(process.env.VUE_APP_API_URL + '/rest/person' + ".*"),"get", person)
let d3 = Mock.mock(RegExp(process.env.VUE_APP_API_URL + '/rest/order' + ".*"),"get", order)
let d4 = Mock.mock(RegExp(process.env.VUE_APP_API_URL + '/rest/today' + ".*"),"get", todayList)
let d5 = Mock.mock(RegExp(process.env.VUE_APP_API_URL + '/rest/publish' + ".*"),"get", publish)
let d6 = Mock.mock(RegExp(process.env.VUE_APP_API_URL + '/rest/partPerson' + ".*"),"get", partPerson)
let d7 = Mock.mock(RegExp(process.env.VUE_APP_API_URL + '/rest/toMeet' + ".*"),"get", toMeet)

let m1 = Mock.mock(RegExp(process.env.VUE_APP_API_URL + '/rest/msgList' + ".*"),"get", msgList)
let m2 = Mock.mock(RegExp(process.env.VUE_APP_API_URL + '/rest/chatList' + ".*"),"get", chatList)

let p1 = Mock.mock(RegExp(process.env.VUE_APP_API_URL + '/rest/mine' + ".*"),"get", mine)
let o1 = Mock.mock(RegExp(process.env.VUE_APP_API_URL + '/rest/partFinOrder' + ".*"),"get", partFinOrder)
export default {d1,d2,d3,d4,d5,d6,d7,m1,m2,p1,o1}