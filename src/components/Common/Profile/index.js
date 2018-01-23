import React from "react";
import {connect} from "react-redux";
import "./index.scss"
class Profile extends React.Component{
	constructor(){
		super();
		this.state={

		}
	}
	componentWillMount(){
		this.props.changeTitle("我的")
	}
	render(){
		return <div id="profile">
		<section className="register">
		    <div className="register-l">
		    	<em className="iconfont icon-gerenzhongxin"></em>
				<div className="register-l-c">
					<h3>登录/注册</h3>
					<p><i className="iconfont icon-mobilephone"></i>登录后享受更多特权</p>
				</div>
			</div>
			<div className="register-r">
				>
			</div>
		</section>
		<section className="gold">
			<div className="gold-l">
				<span><i className="iconfont icon-email"></i></span>
				<p>优惠</p>
			</div>
			<div className="gold-r">
				<span><i className="iconfont icon-jifen"></i></span>
				<p>金币</p>
			</div>
		</section>
		<section className="address same-pro">
			<div className="address-l">
				<i className="iconfont icon-map"></i>
				<span>我的地址</span>
			</div>
			<div className="address-r">
				>
			</div>
		</section>
		<section className="cast">
			<div className="cast-t same-pro">
				<div className="cast-t-l">
					<i className="iconfont icon-bags"></i>
					<span>金币商城</span>
				</div>
				<div className="cast-t-r">
					>
				</div>
			</div>
			<div className="cast-b same-pro">
				<div className="cast-b-l">
					<i className="iconfont icon-gifts"></i>
					<span>分享拿5元现金</span>
				</div>
				<div className="cast-b-r">
					>
				</div>
			</div>
		</section>
		<section className="cus">
			<div className="cus-t same-pro">
				<div className="cus-t-l">
					<i className="iconfont icon-service"></i>
					<span>我的客服</span>
				</div>
				<div className="cus-t-r">
					>
				</div>
			</div>
			<div className="cus-b same-pro">
				<div className="cus-b-l">
					<i className="iconfont icon-operation"></i>
					<span>下载饿了么APP</span>
				</div>	
				<div className="cus-b-r">
					>
				</div>
			</div>
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
	)(Profile);