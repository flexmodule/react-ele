import React from "react";
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import "./index.scss";
import Searchcom from "../Searchcom";
import InfiniteScroll from 'react-infinite-scroller';
class Search extends React.Component{
	constructor(){
		super();
		this.state={
			searchvalue:"",
			hotsearchshow:true
		}
	}
	componentWillMount(){
		if(window.location.pathname!="/search"){
			this.setState({
				hotsearchshow:false
			})
		}
	}
	componentDidMount(){
		console.log(this.props.searchkeylist)
		if(this.props.searchkeylist.length==0){
	   		this.props.keylistul();
	   };
	}
	render(){
		return <div id="search">
		   <Searchcom {...this.props} searchkey={this.state.searchkey}></Searchcom>
			    {
			    	this.state.hotsearchshow?
			    	<section className="keyword-search">
			    		<div className="history-search h-search">
			    			<h3><strong>历史搜索</strong><i className="iconfont icon-delete"></i></h3>
			    			<div className="keyword">
			    				<ul>
			    					
			    				</ul>
			    			</div>
			    		</div>
			    		<div className="hot-search h-search">
			    			<h3><strong>热门搜索</strong></h3>
			    			<div className="keyword">
			    			{
			    				this.props.searchkeylist.map(item=>
			    					<span key={item.word} onClick={this.searchkey.bind(this,item.word)}>{item.word}</span>
			    				)
			    			}	
			    			</div>
			    		</div>
			    	</section>
			    	:""
			    }  
			    {
			    	this.props.children
			    }  
		</div>
	}

	searchkey(word){
		this.setState({
			searchvalue:word
		});
		this.props.history.push("/shop?keyword="+encodeURIComponent(word))
	}
}

export default connect(	
	(state)=>{
		return {
			searchkeylist:state.list
		}
	    },
	   {
				keylistul:()=>{ 
				 //异步action 借助 redux-thunk 中间件实现 
				 return (dispatch)=>{
				 	axios.get("/shopping/v3/hot_search_words?latitude=30.274151&longitude=120.155151").then(res=>{
					    	console.log(res.data);

					    	dispatch({
					    		type:"keylist",
					    		payload:res.data
					    	})
					})
				 }
			}
	}
	)(Search);