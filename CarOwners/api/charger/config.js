const api="/dev-api/bs-smart-charger";
export default {
	//查询充电桩列表
	charger_pile:function(){
		return  `${api}/pile/alllist`
	},
	//查询充电站列表
	charger_station:function(){
		return `${api}/station/alllist`
	},
	//开始充电接口
	start_charger_orders:function(){
		return `${api}/orders`
	},
	//查询充电订单列表
	select_charger_orders:function(){
		return `${api}/orders/allList`
	},
	//新增充电记录
	add_charger_record:function(){
		return `${api}/record`
	},
	//获取充电记录详细信息
	get_charger_record:function(id){
		return `${api}/record/${id}`
	},
	//时间范围内充电量统计记录
	statistics_charger_record:function(){
		return `${api}/record/statistics`
	},
	//根据时间查询所有充电记录
	all_charger_record:function(){
		return `${api}/record/list`
	},
	//分页查询充电记录列表
	page_charger_record:function(){
		return `${api}/record/page`
	},
	//
	
}