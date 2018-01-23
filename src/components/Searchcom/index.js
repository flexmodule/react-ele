import React from "react";
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import "./index.scss";
class Searchcom extends React.Component{
	constructor(){
		super();
		this.state={

		}
	}
	
	render(){
		return <div id="searchcom">
			<section className="search-head">
					<div className="search-head-l">
					    <NavLink to="/">
						  <i className="iconfont icon-back"></i>
						</NavLink>
					</div>
					<div className="search-head-c">
						<em className="iconfont icon-search"></em>
						<input type="text" id="searchid" onInput={this.handleinput.bind(this)} placeholder="输入商家、商品名称" ref="searchtxt" defaultValue={this.props.searchkey}/>
					</div>
					<div className="search-head-r">
						<input type="button" value="搜索" onClick={this.handleclick.bind(this)}/>
					</div>
			    </section>
		</div>
	}
	handleclick(){
		var word=this.refs.searchtxt.value;
  		this.props.history.push("/shop?keyword="+encodeURIComponent(word))
  	}
  	handleinput(){
  		this.props.history.push("/search")
  	}

}

export default Searchcom;