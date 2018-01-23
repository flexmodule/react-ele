import React from "react";
import "./index.scss";
import {connect} from "react-redux"
class Discover extends React.Component{
	constructor(){
		super();
		this.state={
			discoverlist:[],
			foodreclist:[],
			daypricelist:[]
		}
		this.locker = false;
	}
	componentWillUnmount() {
	 this.locker = true;
     }
	componentWillMount(){
		this.props.changeTitle("发现");	
		axios.get("/member/v1/discover?platform=1&block_index=0").then(res=>{
			if(!this.locker){
				this.setState({
				discoverlist:res.data[1]
			})
			}
			
		});
		axios.get("/hotfood/v1/guess/likes?latitude=30.274151&longitude=120.155151&offset=0&limit=10&columns=2&request_id=5b5c815f-d6e8-416c-9b3a-35fb94962601&tag_id=-1&extras=%5B%22activities%22%5D").then(res=>{
			if(!this.locker){
			this.setState({
				foodreclist:res.data
			})
			console.log(this.state.foodreclist)
		}
		});
		axios.get("/shopping/v1/sale_list_index?type=special_food&latitude=30.274151&longitude=120.155151&params=%7B%7D").then(res=>{
			if(!this.locker){
			this.setState({
				daypricelist:res.data.query_list
			})
		}
		});
		axios.get("/hotfood/v1/guess/likes?latitude=30.274151&longitude=120.155151&offset=0&limit=3&request_id=b55d6d0f-24cb-4fec-a4da-6649f6ee35e9&tag_id=-1&columns=1").then(res=>{
			console.log(res.data);
		});
	}
	render(){
		return <div id="discover">
	<section className="disul">
		<ul>
		{	this.state.discoverlist.length!=0?
			this.state.discoverlist.map((item,index)=>
				<li key={index}>
					<div className="datalist-l">
						<p><strong>{item.title}</strong></p>
						<p>{item.subtitle}</p>
					</div>
					<img src={this.disimg(item.main_pic_hash)}/>
				</li>
				)
			:""
		}
			
		</ul>
	</section>
	<section className="banner">
		<img src="https://fuss10.elemecdn.com/b/6d/656006edcd86033a1b32b23ddea37jpeg.jpeg?imageMogr/format/webp/" />
	</section>
	<section className="foodrec same-foodrec">
        <h3><span><em className="line-left"></em><u className="iconfont icon-good"></u><i>美食热推</i><em className="line-right"></em></span></h3>
        <p className="titeintro">你的口味我都懂得</p>
        <div className="foodul">
        {
        	this.state.foodreclist.length!=0?
        	this.state.foodreclist.map((item,index)=>
        	{
        		if(index<3){
        			return <a className="fooda" key={index}>
        			<img src={this.foodrec(item)}/>
        			<h4>{this.dataname(item)}</h4>
        			<p>¥{this.dataprice(item)}</p>
        		    </a> 
        		}
        	}
        		
        		)
        	:""
        	
        }
        	
        </div>
        <div className="lookmore">
        	查看更多 >
        </div>
	</section>
	<section className="dayprice same-foodrec">
        <h3><span><em className="line-left"></em><u className="iconfont icon-discount"></u><i>天天特价</i><em className="line-right"></em></span></h3>
        <p className="titeintro">特价商品，一网打尽</p>
        <div className="foodul">
        {
        	this.state.daypricelist.length!=0?
        	this.state.daypricelist.map((item,index)=>
        	{
        		if(index<3){
        	return 	<a className="fooda" key={index}>
        		<img src={this.dayprice(item)}/>
        		<h4>{this.dataname(item)}</h4>
        		<p>¥{this.dataprice(item)} <s>¥{this.originalprice(item)}</s></p>
        	    </a>
        		}	
        	}
        	 )
        	:""
        }
        	
        </div>
        <div className="lookmore">
        	查看更多 >
        </div>
	</section>
	<section className="timegift same-foodrec">
        <h3><span><em className="line-left"></em><u className="iconfont icon-remind1"></u><i>限时好礼</i><em className="line-right"></em></span></h3>
        <p className="titeintro">金币换豪礼</p>
        <div className="foodul">

        	{
        	        	this.state.daypricelist.length!=0?
        	        	this.state.daypricelist.map((item,index)=>
        	        	{
        	        		if(index<3){
        	        	return 	<a className="fooda" key={index}>
        	        		<img src={this.dayprice(item)}/>
        	        		<h4>{this.dataname(item)}</h4>
        	        		<p>¥{this.dataprice(item)} <s>¥{this.originalprice(item)}</s></p>
        	        	    </a>
        	        		}	
        	        	}
        	        	 )
        	        	:""
        	        }
        </div>
        <div className="lookmore">
        	查看更多 >
        </div>
	</section>	
		</div>
	}
	disimg(url){
  		var image_path=url.slice(0,1)+"/"+url.slice(1,3)+"/"+url.slice(3)+"."+url.slice(32)
  		return `https://fuss10.elemecdn.com/${image_path}?imageMogr/format/webp/`
  	}
  	foodrec(data){
  		if(data.foods[0]){
  			var url=data.foods[0].image_hash;
  			var image_path=url.slice(0,1)+"/"+url.slice(1,3)+"/"+url.slice(3)+"."+url.slice(32)
  		return `https://fuss10.elemecdn.com/${image_path}?imageMogr/format/webp/`
  		}
  	}
  	dataname(data){
  		if(data.foods[0]){
  			return data.foods[0].name;
  		}else{
  			return "";
  		}
  	}
  	dataprice(data){
  		if(data.foods[0]){
  			return data.foods[0].price;
  		}else{
  			return "";
  		}
  	}
  	dayprice(data){
  		if(data.foods[0]){
  			var url=data.foods[0].image_path;
  			var image_path=url.slice(0,1)+"/"+url.slice(1,3)+"/"+url.slice(3)+"."+url.slice(32)
  		return `https://fuss10.elemecdn.com/${image_path}?imageMogr/format/webp/`
  		}
  	}
  	originalprice(data){
  		if(data.foods[0]){
  			return data.foods[0].original_price;
  		}
  	}


  
}
export default connect(
	null,
	{
		changeTitle:(name)=>{
			//自动进行dispatch 到 reducer
			return {
				type:"changeTitleReducer",
				payload:name
			}
		}
	}
	)(Discover);