import React from "react";
import "./index.scss";
import {connect} from "react-redux";
class Order extends React.Component{
	constructor(){
		super();
		this.state={

		}
	}
	componentWillMount(){
		this.props.changeTitle("订单");	
	}
	render(){
		return <div id="order">
		<section className="order-child">
			<img className="orderimg" src="//fuss10.elemecdn.com/f/18/9fb04779371b5b162b41032baf5f3gif.gif"/>
			<h3>登录后查看外卖订单</h3>
			<button type="button">立即登录</button>
		</section>
		</div>
	}


}
export default connect(
	null,
	{
		changeTitle:(name)=>{
			return {
				type:"changeTitleReducer",
				payload:name
			}
		}
	}	
	)(Order);