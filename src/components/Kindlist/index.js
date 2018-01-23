import React from "react";
import "./index.scss";
import {connect} from "react-redux";
import InfiniteScroll from 'react-infinite-scroller';
class Kindlist extends React.Component{
	constructor(){
		super();
		this.state={
			 loadtext:"正在加载......",
			 sellerlist:[],
	    	 titlename:"",
	    	 currentid:0,
	    	 currentid:0,
			 offset:0,
			 hasMoreItems:true
		}
		this.lock=false;
	}
	componentDidMount(){
		var target_name=this.props.location.search.split("?")[1].split("&")[0].split("=")[1];
		if(!this.lock){
			this.setState({
				titlename:decodeURIComponent(target_name)
			})
		}
		var idarr=this.props.location.search.split("?")[1].split("&")[1].split("=")[1].split(",");
		var idstr=""
		for(var i=0;i<idarr.length;i++){
			idstr+="&restaurant_category_ids[]="+idarr[i];
		}
		axios.get(`/shopping/restaurants?latitude=30.274151&longitude=120.155151&keyword=&offset=0&limit=20&extras[]=activities&extras[]=tags&terminal=h5&brand_ids[]=${idstr}`).then(res=>{
			if(!this.lock){
				this.setState({
					sellerlist:res.data
				})
			}
		});
	}
	render(){
	return <div id="kindlist">
	<section id="header">
	<i className="iconfont icon-back" onClick={this.handleclick.bind(this)}></i>
	<span>{this.state.titlename}</span>
	</section>
	<section className="nav">
	<div className="nav-l">
		<span>分类</span>
		<em></em>
	</div>
	<div className="nav-c">
		<span>排序</span>
		<em></em>
	</div>
	<div className="nav-r">
		<span>筛选</span>
		<em></em>	
	</div>
	</section>
	<section className="rec-seller">
		  <InfiniteScroll
		      pageStart={0}
		      initialLoad={false}
		      threshold={300}
		      loadMore={this.loadFunc.bind(this)}
		      hasMore={this.state.hasMoreItems}
		  >
		  {this.state.sellerlist.map((item,index)=>
		  	<div className="seller-list-child" key={index} onClick={this.sellerskip.bind(this,item.id)}>
				<div className="seller-list-t">
					<img src={this.sellerimg(item.image_path)} className="sellerimg"/>
					<div className="img-right">
						<div className="img-right-t">
							<strong>{item.name}</strong>
							<span><i>{this.supporta(item)}</i><i>{this.supportb(item)}</i></span>
						</div>
						<div className="img-right-c">
							<span>评价{item.rating} 月售{item.recent_order_num}单</span>
							<span>{this.delivery(item)}</span>
						</div>
						<div className="img-right-b">
							<span>¥{item.float_minimum_order_amount}起送|配送费¥{item.float_delivery_fee}</span>
							<span><i>{this.distance(item)}</i>|{item.order_lead_time}分钟</span>
						</div>
					</div>
				</div>
				<div className="seller-list-b">
					<h3>
						<img src={this.koubeiimg(item)}/>
						<span>{this.koubei(item)}</span>
					</h3>
					<em></em>
					<div className="seller-list-b-child">
						<div className="seller-list-bl">
						{
							item.activities.map((items,indexs)=>{
						      if(indexs>=2){
						     	if(this.isact(item.id)){
						     		return <p key={items.id}><i>{items.icon_name}</i>{items.description}</p>
						     	}else{
						     		return "";
						     	}
								}else{
									return <p key={items.id}><i>{items.icon_name}</i>{items.description}</p>
								}
							    }	
								)
							
						}
						</div>
						{	item.activities.length>2?
							<div className="seller-list-br" onClick={(e)=>this.activity(e,item.id)}>
								<span>{item.activities.length}</span>个活动
								<i className={this.state.currentid!=item.id?'xiajian':'shangjian'}></i>
							</div>
							:""
						}
						
					</div>
				</div>
			</div>
		  	)
	     }
		</InfiniteScroll>
	 </section>
	 <section className="loadinfo">
				{this.state.loadtext}
	</section>
		
		</div>
	}


	handleclick(){
		this.props.history.push("/");
	  }

	loadFunc(){
  		   var offreplace=this.state.offset;
  		   offreplace+=20;
  		    var self=this;
  		    if(!this.lock){
	  		this.setState({
	  			offset:offreplace
	  		})
	  	 }
  			axios.get(`/shopping/restaurants?latitude=30.274151&longitude=120.155151&offset=${self.state.offset}&limit=20&extras[]=activities&extra_filters=home&terminal=h5`).then(res=>{
  			if(res.data.length!=0){
  				if(!self.lock){
  				self.setState({
  					sellerlist:[...self.state.sellerlist,...res.data]
  				})
  			}
  			}else{
  				if(!self.lock){
  				self.setState({
  					hasMoreItems:false,
  					loadtext:"加载完成"
  				})
  			}
  			}
  		})
  	}
  	isact(id){
  		if(this.state.currentid!=id){
  			return false;
  		}else{
  			return true;
  		}
  	}
  	sellerskip(id){
  		this.props.history.push("/seller?id="+id);
  	}
	sellerimg(url){
		var image_path=url.slice(0,1)+"/"+url.slice(1,3)+"/"+url.slice(3)+"."+url.slice(32)
		return `//fuss10.elemecdn.com/${image_path}?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/`
	}
	supporta(data){
		return data.supports[0]?data.supports[0].icon_name:""
	}
	supportb(data){
		return data.supports[1]?data.supports[1].icon_name:""
	}
	delivery(data){
		return data.delivery_mode?data.delivery_mode.text:""
	}
	distance(data){
		if(data.distance>1000){
			return (data.distance/1000).toFixed(2)+"km"
		}else{
			return data.distance+"m"
		}
	}
	koubei(data){
		return data.recommend?data.recommend.reason:"";
	}
	koubeiimg(data){
		if(data.recommend.image_hash){
			var image_path=data.recommend.image_hash.slice(0,1)+"/"+data.recommend.image_hash.slice(1,3)+"/"+data.recommend.image_hash.slice(3)+"."+data.recommend.image_hash.slice(32)
		return `//fuss10.elemecdn.com/${image_path}?imageMogr/format/webp/thumbnail/!60x60r/gravity/Center/crop/60x60/`
	}else{
		this.koubeishow=false;
		return ""
	}	
	}
	activity(e,id){
		e.stopPropagation();
  		if(this.state.currentid!=id){
  			if(!this.lock){
  			this.setState({
                  currentid:id
  			})
  		}
  		}else{
  			if(!this.lock){
  			this.setState({
  				currentid:0
  			})
  		}
  		}
		
	}
	noact(id){
		if(this.currentid!=id){
			return false;
		}else{
			return true;
		}
	}
}

export default connect(
	null,
	null
	)(Kindlist);