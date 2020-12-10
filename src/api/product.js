import axios from 'axios';

function productListApi(){
	return axios({
		method: 'get',
		url: '/rest/V1/product-list',
		// params: {
		// }
	})
}

function getProductInfo(data){
	return axios({
		method: 'get',
		url: '/rest/V1/product-list',
		// params: {
		// 	...data
		// }
	})
}

function getPerson(data){
	return axios({
		method: 'get',
		url: '/rest/person',
		// params: {
		// 	...data
		// }
	})
}

export  {productListApi,getProductInfo,getPerson}