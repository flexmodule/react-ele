import React from "react";
import "./index.scss";
import "@/assets/iconfont/iconfont.css";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
class Common extends React.Component{

	constructor(){  
	super();  
	this.state={ 
	foottext:[{id:"wm",icon:"iconfont icon-operation",navtext:"外卖",roulink:"/common/home"},
	{id:"fx",icon:'iconfont icon-compass',navtext:"发现",roulink:"/common/discover"},
	{id:"dd",icon:'iconfont icon-form',navtext:"订单",roulink:"/common/order"},
	{id:"wd",icon:'iconfont icon-account',navtext:"我的",roulink:"/common/profile"}] 
	 } 
	  }

	render(){
		return <div id="common">
		{
			this.titleisshow()?
			<header><i className="iconfont icon-back"></i><strong>{this.props.commontitle}</strong></header>
			:""
		}
		{
			this.props.children
		}
		<footer>
		<ul>
		{
			this.state.foottext.map(item=>
				<li key={item.id}>
					<NavLink to={item.roulink} activeClassName="active">
						<i className={item.icon}></i>
						<p>{item.navtext}</p>
					</NavLink>
				</li>
				)
		}
		</ul>
		</footer>
		</div>
	}

	titleisshow(){
		console.log(window.location.pathname)
		if(window.location.pathname=="/common/home"){
			return false
		}else{
			return true
		}
	}
}



export default connect(
	(state)=>{
		return {
			commontitle:state.title
		}
	},
	null
	)(Common);

