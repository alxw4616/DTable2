/*
目的:1.建立javascript 数据表格 开发框架
2.呈现数据
3.检索数据
4.修改数据
原则:
1.封装:该控件应能独立使用并不干扰全局代码;
2.模块代:每一功能应为单独的一功能包;
3.可扩展:在加载相应控件包后,应能自如扩展功能;
4.减少偶合
5.方便配置
*/
/*
依赖 jquery 1.8+
*/
//使用独立的命名空间
var DTable = {};
// 控件主体
DTable.Table = function(option) {
	var Default = {
		db: {

		},
		page: {

		},
		search: {

		},
		filter: {

		},
		sort: {

		}
	}
	//缓存请求到的数据,用以处理业务逻辑.
	this.data = {};
	//ajax 发送的数据
	this.sendData = option.db.data || {};
	this.body = $();
	$.extend(this, option);
	this.addPlug(this, option);
};
DTable.Table.prototype = {
	//加载功能模块
	addPlug: function(option) {
		var self = this;
		for(var f1 in DTable.plug) {
			if(option[f1]) {
				this[f1.toLowerCase()] = new DTable.plug[f1](option);
				this[f1.toLowerCase()].callback = this.get;
			};
		}
	},
	get: function(sendData, flag) {
		//默认值: false。设置为 true 将不在继承原请求参数。 
		if(flag || false) {
			this.sendData = sendData;
		} else {
			this.sendData = $.extend(this.sendData, sendData);
		}
		var self = this;
		var df = this.db.send(sendData).done(function(d) {
			self.createBody(d);
			self.callback(d);
		});
		return df;
	},
	createBody: function(d) {

	},
	createLine: function(d) {

	},
	callback: function(d) {

	}
};
//功能模块
DTable.plug = {};
//数据 
DTable.plug.Plug.DB = function(option) {
	this.loadBox = $();
	var self = this;
	this.option = {
		// 默认值: truec。设置为 false 将发送同步请求。
		async: false,
		//cache: 默认值: true。设置为 false 将不缓存此页面。
		cache: false,
		//发送信息至服务器时内容编码类型。utf-8处理中文乱码。
		contentType: 'application/x-www-form-urlencoded; charset=utf-8',
		//预期服务器返回的数据类型 xml/html/script/json/jsonp/text
		dataType: 'json',
		// 是否触发全局 AJAX 事件。默认值: true。设置为 false 将不会触发全局 AJAX 事件。
		global: false
		// 设置请求超时时间（毫秒）。
		timeout: 60 * 1000
		// 请求方式 ("POST" 或 "GET")， 默认为 "GET"。
		type: 'GET',
		// 发送请求的地址。
		url: '',
		//事件 
		// 在发送请求之前调用，并且传入一个 XMLHttpRequest 作为参数。
		beforeSend: function(xhr) {
			self.showLoadBox();
		},
		// 当请求完成之后调用这个函数，无论成功或失败。
		complete: function(xhr, textStatus) {
			self.hideLoadBox();
		},
		// 在请求出错时调用。
		error: function(xhr, textStatus, errorThrown) {
			alert(this.type + ' url:' + this.url + '; error:' + textStatus + ';' + xhr.status);
			return false;
		}
	}
	this.option = $.extend(this.option, option);
	// 延迟对象,用以控制访问.
	this.df = $.Deferred();
}
DTable.plug.DB.prototype = {
	send: function(sendData) {
		// 放弃前一个请求
		if(this.df.abort) {
			this.df.abort();
		};
		this.option.data = sendData;
		this.df = $.ajax(this.option);
		return this.df;
	},
	showLoadBox: function(argument) {

	},
	hideLoadBox: function(argument) {

	}
}
//分页
DTable.plug.Page = function(option) {
	// body...
}
DTable.plug.Page.prototype = {

}
//搜索
DTable.plug.Search = function(option) {
	// body...
}
DTable.plug.Search.prototype = {

}
//过滤
DTable.plug.Filter = function(option) {
	// body...
}
DTable.plug.Filter.prototype = {

}
//排序 Sort
DTable.plug.Sort = function(option) {
	// body...
}
DTable.plug.Sort.prototype = {

}