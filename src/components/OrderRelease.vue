<template>
	<div class="order-release">
		<div class="header">
			<div class="auction" :class="{'pick-up':orderType}">
				<div class='sty'>
					<div class="on-sale" @click="changeStyle(1);getPartOrder()">竞拍订单</div>
					<div class="fin" @click="changeStyle(2);getPublishOrder()">发布订单</div>
				</div>
			</div>
			<div v-if="orderType" class="day">
				<div :class="{'day-sty':dayType == 1}" @click="changeDay(1)">参拍中</div>
				<div :class="{'day-sty':dayType == 2}" @click="changeDay(2);getMeetList()">
					待见面
					<div class="msg-pop">{{toMeet.length}}</div>
				</div>
				<div :class="{'day-sty':dayType == 3}" @click="changeDay(3);getFinOrder()">已结束</div>
			</div>
			<div v-if="!orderType" class="day">
				<div :class="{'day-sty':dayType == 1}" @click="changeDay(1)">发布中</div>
				<div :class="{'day-sty':dayType == 2}" @click="changeDay(2);getMeetList()">
					待见面
					<div class="msg-pop fb">{{toMeet.length - 1}}</div>
				</div>
				<div :class="{'day-sty':dayType == 3}" @click="changeDay(3)">见面中</div>
				<div :class="{'day-sty':dayType == 4}" @click="changeDay(4)">已结束</div>
			</div>
		</div>
		<!-- 参与订单  参拍中  -->
		<div v-if="orderType" class="body">
			<div v-if="dayType == 1" >
				<div v-for="item in order" class="list">
					<div class="l1">
						<div class="info">
							<i v-if="item.gender == 0" class="el-icon-female gender-bg">
							{{convertAge(item.age)}}
							</i>
							<i v-if="item.gender == 1" class="el-icon-male gender-bg" 
							style="background: #3182FD;">{{convertAge(item.age)}}</i>
							<span style="color:black;">{{item.name}}</span>
						</div>
						<div class="l-time">距结束:
							<span class="sty-color">
								<CountDown
									:endTime="endTime">
								</CountDown>
							</span>
						</div>
						<el-dropdown trigger="click" @command="revokeOrder">
							<i class="el-icon-more"></i>
						  <el-dropdown-menu slot="dropdown" class="revocation">
						    <el-dropdown-item :command="item.oid">撤销</el-dropdown-item>
						  </el-dropdown-menu>
						</el-dropdown>
					</div>
					<p>时间：（21:00-23:00）{{item.take}}小时</p>
					<div class="l3">
						<p>起拍价：${{item.staPrice}}</p>
						<p>我出价：${{item.myPrice}}</p>
					</div>					
					<div class="l4">
						<div class="last-price">
							当前价：<span class="sty-color">${{item.curPrice}}</span>
						</div>
						<div class="check-person sty-color" @click="goJoin(item.oid)">
							再次出价
						</div>
					</div>
				</div>
			</div>
			<div v-if="dayType == 2">
				<div v-for="item in toMeet">
					<div class="list">
						<div class="l1">
							<div class="info">
								<i v-if="item.gender == 0" 
								class="el-icon-female gender-bg">{{convertAge(item.age)}}</i>
								<i v-if="item.gender == 1" 
								class="el-icon-male gender-bg" 
								style="background: #3182FD;">{{convertAge(item.age)}}</i>
								<span style="color:black;">{{item.name}}</span>
							</div>
							<div class="l-time">距见面:
								<span class="sty-color">
									<CountDown
										:endTime="endTime">
									</CountDown>
								</span>
							</div>
							<el-dropdown trigger="click" @command="revokeOrder">
								<i class="el-icon-more"></i>
							  <el-dropdown-menu slot="dropdown" class="revocation">
							    <el-dropdown-item :command="item.oid">撤销</el-dropdown-item>
							  </el-dropdown-menu>
							</el-dropdown>
						</div>
						<p>时间：（{{item.timeZone}}）{{item.time}}小时</p>
						<div class="page2">
							<!-- <P v-if="item.isSet == '0'">请联系发布人设置地址</P> -->
							<p v-if="item.isSet == '1'">地址：{{item.address}}</p>
							<span>最终价：<span class="sty-color">${{item.finPrice}}</span></span>
						</div>
						<div class="l4">
							<div class="last-price">
								当前价：<span class="sty-color">${{item.price}}</span>
							</div>
							<div v-if="item.isSet == '0'" 
							class="check-person sty-color" @click="checkAddress(item.id)">
								查看店名地址
							</div>
							<div v-if="item.isSet == '1'" 
							class="check-person sty-color" @click="confirm(item.oid)">
								开始见面
							</div>
						</div>
					</div>
				</div>
			</div>
			<div v-if="dayType == 3">
				<div v-for="item in finOrder" class="list">
					<div class="l1">
						<div class="info">
							<i v-if="item.gender == 0" 
							class="el-icon-female gender-bg">{{convertAge(item.age)}}</i>
							<i v-if="item.gender == 1" 
							class="el-icon-male gender-bg" 
							style="background: #3182FD;">{{convertAge(item.age)}}</i>
							<span style="color:black;">{{item.name}}</span>
						</div>
						<div class="l-time evaluate" @click="dialogVisible = true; value1 = 5">去评价</div>
						<el-dialog
							  title="评价"
							  :visible.sync="dialogVisible"
							  width = 83vmin>
							<div class="block">
								<el-rate v-model="value1" @change="changeScore(value1)" 
								text-color="#ff9900" allow-half  :colors="colors"></el-rate>
								<p class="f-score">{{score}}</p>
							</div>
							<el-button type="primary" @click="subEvalution()">提交评价</el-button>
						</el-dialog>
					</div>
					<p>时间：（{{item.fullTime}}）{{item.take}}小时</p>
					<div class="page2">
						<p>地址：{{item.address}}</p>
					</div>
					<div class="l4">
						<span>起拍价：${{item.staPrice}}</span>
						<span>最终价：<span class="sty-color">${{item.finPrice}}</span></span>
						<div class="info">
							<i class="el-icon-male gender-bg">{{convertAge(item.age)}}</i>
							<span style="color:black;">{{item.name}}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div v-if="!orderType" class="body">
			<div v-if="dayType == 1" >
				<div v-for="item in publish" class="list">
					<div class="l1">
						<div class="info">
							<i v-if="item.gender == 0" class="el-icon-female gender-bg">
							{{convertAge(item.age)}}</i>
							<i v-if="item.gender == 1" class="el-icon-male gender-bg" 
							style="background: #3182FD;">{{convertAge(item.age)}}</i>
							<span style="color:black;">{{item.name}}</span>
						</div>
						<div class="l-time">距结束:
							<span class="sty-color">
								<CountDown
									:endTime="endTime">
								</CountDown>
							</span>
						</div>
						<el-dropdown trigger="click" @command="revokeOrder">
							<i class="el-icon-more"></i>
						  <el-dropdown-menu slot="dropdown" class="revocation">
						    <el-dropdown-item :command="item.oid">撤销</el-dropdown-item>
						  </el-dropdown-menu>
						</el-dropdown>
					</div>
					<p>时间：（{{item.timeZone}}）{{item.take}}小时</p>
					<p>起拍价：${{item.staPrice}}</p>
					<div class="l4">
						<div class="last-price">
							当前价：<span class="sty-color">${{item.price}}</span>
						</div>
						<div class="check-person sty-color" @click="goPart(item.oid)">
							查看参与人
						</div>
					</div>
				</div>
			</div>
			<div v-if="dayType == 2">
				<div v-for="item in toMeet">
					<div class="list">
						<div class="l1">
							<div class="info">
								<i v-if="item.gender == 0" class="el-icon-female gender-bg">
								{{convertAge(item.age)}}</i>
								<i v-if="item.gender == 1" class="el-icon-male gender-bg" 
								style="background: #3182FD;">{{convertAge(item.age)}}</i>
								<span style="color:black;">{{item.name}}</span>
							</div>
							<div class="l-time">距见面:
								<span class="sty-color">
									<CountDown
										:endTime="endTime">
									</CountDown>
								</span>
							</div>
							<el-dropdown trigger="click" @command="revokeOrder">
								<i class="el-icon-more"></i>
							  <el-dropdown-menu slot="dropdown" class="revocation">
							    <el-dropdown-item :command="item.oid">撤销</el-dropdown-item>
							  </el-dropdown-menu>
							</el-dropdown>
						</div>
						<p>时间：（{{item.timeZone}}）{{item.time}}小时</p>
						<div class="page2">
							<p v-if="item.isSet == '1'">地址：{{item.address}}</p>
							<span>最终价：<span class="sty-color">${{item.finPrice}}</span></span>
						</div>
						<div class="l4">
							<div class="last-price">
								当前价：<span class="sty-color">${{item.price}}</span>
							</div>
							<div v-if="item.isSet == '0'"
							class="check-person sty-color" @click="checkAddress(item.id)">
								查看店名地址
							</div>
							<div v-if="item.isSet == '1'" 
							class="check-person sty-color" @click="confirm(item.oid)">
								开始见面
							</div>
						</div>
					</div>
				</div>
			</div>
			<div v-if="dayType == 3">
				<div class="list">
					<div class="l1">
						<div class="info">
							<i class="el-icon-male gender-bg">18</i>
							<span style="color:black;">上海刘亦菲</span>
						</div>
						<div class="l-time">距结束:<span class="sty-color">12:21:21</span></div>
					</div>
					<p>时间：（21:00-23:00）2小时</p>
					<p>地址：Trump Tower at Century City</p>
					<div class="l4">
						<div class="last-price">
							起拍价：<span class="sty-color">$50</span>
						</div>
						<span>最终价：<span class="sty-color">$60</span></span>
						<div class="check-person sty-color" >
							见面结束
						</div>
					</div>
				</div>
			</div>
			<div v-if="dayType == 4">
				<div class="list">
					<div class="l1">
						<div class="info">
							<i class="el-icon-male gender-bg">18</i>
							<span style="color:black;">上海刘亦菲</span>
						</div>
						<div class="l-time evaluate">去评价</div>
					</div>
					<p>时间：（21:00-23:00）2小时</p>
					<div class="page2">
						<p>地址：Trump Tower at Century City</p>
						<span>最终价：<span class="sty-color">$80</span></span>
					</div>
					<div class="l4">
						<span>起拍价：$50</span>
					</div>
				</div>
			</div>
		</div>
		<!-- 所有弹窗页面 -->
		<!-- 确认见面弹窗 -->
		<mt-popup
		  v-model="confirPop"
		  class="publish-pop">
			<div class="pic">
				<i class="el-icon-position"></i>
			</div>
			<p class="pub-title">确认见面</p>
			<div class="pub-con">
				<p>姓名：{{meetpop.name}}</p>
				<p>时间：{{meetpop.timeZone}}</p>
				<p>城市：{{meetpop.address}}</p>
				<p>当前价：{{meetpop.price}}</p>
				<el-button class="but">确认见面</el-button>
			</div>
			<div class="close" @click="confirPop = false">
				<i class="el-icon-circle-close"></i>
			</div>
		</mt-popup>
	</div>	
</template>

<script>
	import {getOrder} from '../api/product.js';
	import {mapState} from 'vuex';
	import CountDown from './CountDown.vue';
	import {getPublish,getToMeet,getPartFin} from '../api/order.js';
	import {convertYear} from '../util/time.js'
	
	export default {
		computed:mapState({
				orderType: state => state.orderType,
				dayType: state => state.odayType,
			}),
		components:{
			CountDown,
		},
		data() {
			return {
				order: [],
				publish:[],
				toMeet:[],
				finOrder:[],
				meetpop:[],
				endTime:"2021-03-31",
				confirPop:false,
				dialogVisible:false,
				value1:5,
				score:"5.0",
				colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
			};
		},
		mounted(){
			//参与订单->参拍中
			getOrder().then(resp => {
				this.order = resp.data.data
			})
			//发布订单->参拍中
			getPublish().then( resp => {
				this.publish = resp.data.data
			})
			//参与订单->待见面
			getToMeet().then( resp => {
				this.toMeet = resp.data.data
			})
			//发布订单->待见面 暂时与参与订单->待见面用一个mock接口
		},
		methods:{
			changeStyle (num) {
				if (num == 1) {
					this.$store.commit('changeOrder',true)
					this.$store.commit('changeOrderDay','1')
				}
				if (num == 2) {
					this.$store.commit('changeOrder',false)
					this.$store.commit('changeOrderDay','1')
				}
			},
			changeDay (num) {
				this.$store.commit('changeOrderDay',num)
			},
			goPart(oid) {
				this.$store.commit('changePage','order-release')
				this.$router.push({path:`/participant?oid=${oid}`})
			},
			//获取参与订单
			getPartOrder() {
				getOrder().then(resp => {
					this.order = resp.data.data
				})
			},
			// 再次出价跳转到参加竞拍页
			goJoin(id){
				this.$router.push({path:`/join-bidding?id=${id}&status=0`})
			},
			//获取发布订单
			getPublishOrder() {
				getPublish().then( resp => {
					this.publish = resp.data.data
				})
			},
			//获取参与订单 已结束
			getFinOrder(){
				getPartFin().then( resp => {
					this.finOrder = resp.data.data
				})
			},
			getMeetList() {
				getToMeet().then( resp => {
					this.toMeet = resp.data.data
				})
			},
			//确认见面弹窗
			confirm(oid) {
				this.confirPop = true
				for (let info of this.toMeet) {
					if (info.oid == oid){
						this.meetpop = info
					}
				}
			},
			checkAddress(id){
				this.$store.commit('changeOrder',this.orderType)
				this.$store.commit('changeOrderDay',this.dayType)
				this.$router.push({path:`/chat?mid=${id}`})
			},
			convertAge(year){
				return convertYear(year)
			},
			// 撤销订单
			// @param command str
			revokeOrder(command){
				console.log(command)
			},
			// 提交评价
			subEvalution(){
				this.dialogVisible = false
			},
			// 改变评分
			changeScore(value) {
				this.score = value.toFixed(1)
				console.log(this.score)
			}
		}
	}
</script>

<style lang='less'>
	@import '../css/global.less';
	body {
		.revocation{
			width: 20vmin !important;
			left: 77vmin !important;
			.el-dropdown-menu__item {
				border: none;
			}
		}
	}
	.order-release {
		padding-bottom: 20vmin;
		.header {
			position: fixed;
			padding: 2.6vmin;
			box-sizing: border-box;
			top: 0;
			background-color: #FFFFFF;
			height: 25vmin;
			width: 100%;
			color:@unpick-color;
			font-size: 3.73vmin;
			white-space: nowrap;
			.auction {
				width: 100%;
				&::after {
					content: '';
					width: 2.7vmin;
					height: 0.9vmin;
					background-color: @base-color;
					display: block;
					margin-top: 2.8vmin ;
					border-radius: 10px;
					margin-left: 32vmin;
				}
				.sty {
					display: flex;
					align-items: center;
					.on-sale {
						font-size: 3.6vmin;
					}
					.fin {
						margin-left: 10vmin;
						color: @base-color;
						font-size: 4.5vmin;
					}
				}
			}
			.pick-up {
				&::after {
					margin-left: 7vmin;
				}
				.sty {
					.on-sale {
						color: @base-color;
						font-size: 4.5vmin;
					}
					.fin {
						color: @unpick-color;
						font-size: 3.6vmin;
					}
					.pic {
						width: 5vmin;
						height: 5vmin;
					}
				}
			}
			.day {
				display: flex;
				justify-content: flex-start;
				margin-top: 2vmin;
				div {
					margin-right: 10px;
					padding: 1.6vmin;
				}
				.day-sty {
					background-color: #F1F1F1;
					border-radius: 3vmin;
				}
				.msg-pop {
					background-color: red;
					border-radius: 50%;
					width: 2vmin;
					height: 2vmin;
					position: absolute;
					top: 14vmin;
					right: 60vmin;
					line-height: 2vmin;
					vertical-align: middle;
					text-align: center;
					color: white;
				}
			}
		}
		.body{
			margin-top: 25vmin;
			width: 100%;
			.list {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				height: 42vmin;
				background: #F1F1F1;
				box-sizing: border-box;
				margin: 3vh 3vmin;
				font-size: 3.7vmin;
				font-weight: 400;
				color: @unpick-color;
				padding: 3vmin;
				border-radius: 2vmin;
				p {
					margin: 0;
					padding: 0;
				}
				.sty-color {
					color: @base-color;
				}
				.l1 {
					display: flex;
					justify-content: space-between;
					.gender-bg {
						background: @female-color;
						padding: 0.5vmin 0.5vmin;
						border-radius: 1vmin;
						color: white;
						margin-right: 2vmin;
					}
					.evaluate{
						color: @base-color;
						text-decoration: underline;
					}
					.el-dropdown {
						.el-icon-more{
							transform: rotate(90deg);
						}
					}
					.el-dialog__wrapper{
						top: 34vmin;
						.block{
							display: flex;
							justify-content: space-between;
							align-items: center;
							.f-score{
								font-size: 7vmin;
								width: 13vmin;
								display: inline-block;
								text-align: center;
								color: #FF9900;
							}
							.el-rate{
								height: 11vmin;
								.el-rate__icon{
									font-size: 11vmin;
									margin-right: 0;
								}
							}
						}
						.el-button{
							margin-top: 5vmin;
							border-radius: 2vmin;
							width: 30vmin;
							font-size: 5vmin;
							background-color: @base-color;
							border-color: @base-color;
						}
						.el-dialog__body{
							text-align: center;
							padding: 3vmin 6vmin 8vmin;
						}
						.el-dialog{
							border-radius: 6vmin;
							.el-dialog__title{
								padding-left: 2vmin;
							}
						}
					}
				}
				.l3 {
					display: flex;
					justify-content: space-between;
				}
				.l4 {
					display: flex;
					justify-content: space-between;
					.check-person {
						text-decoration: underline;
					}
					.gender-bg {
						background: @female-color;
						padding: 0.5vmin 0.5vmin;
						border-radius: 1vmin;
						color: white;
						margin-right: 2vmin;
					}
				}
				.page2 {
					display: flex;
					justify-content: space-between;
				}
			}
		}
		.publish-pop {
			border-radius: 1.5vmin;
			text-align: center;
			width: 75vmin;
			height: 91vmin;
			.pic {
				font-size: 20vmin;
			}
			.pub-title {
				font-size: 4.5vmin;
				font-weight: normal;
				color: #B928FD;
			}
			.pub-con {
				padding: 0 10vmin;
				text-align: left;
				font-size: 3.7vmin;
				font-family: Adobe Heiti Std;
				font-weight: normal;
				color: #333333;
				line-height: 3.7vmin;
				.but {
					width: 100%;
					height: 10.6vmin;
					background: #B928FD;
					border-radius: 1.5vmin;
					color: #FFFFFF;
				}
			}
			.close {
				position: absolute;
				bottom: -13vmin;
				font-size: 8.7vmin;
				color: #ffffff;
				left: 33vmin;
			}
		}
	}
</style>
