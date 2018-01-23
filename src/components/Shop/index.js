import React from "react";
import {connect} from "react-redux";
import Searchcom from "../Searchcom";
import InfiniteScroll from 'react-infinite-scroller';
import "./index.scss";
class Shop extends React.Component{
	constructor(){
		super();
		this.state={
			hasMoreItems:true,
			searchdata:null,
			restaurant:[],
			offset:0,
			loadtext:"正在加载......",
			searchvalue:"",
			currentid:0,
			isshow:false,
			isx:false
		}
		this.lock=false
	}
	componentWillMount(){
		var keyword=this.props.location.search.split("?")[1].split("=")[1];
		if(!this.lock){
			this.setState({
				searchvalue:decodeURIComponent(keyword)
			})
		}				
		if(keyword){
			axios.get(`/shopping/v2/restaurants/search?offset=0&limit=20&keyword=${keyword}&latitude=30.274151&longitude=120.155151&search_item_type=3&is_rewrite=1&extras[]=activities&extras[]=coupon&terminal=h5`).then(res=>{
				if(res.data.inside){
					if(res.data.inside[0]){
						if(!this.lock){
							this.setState({
							searchdata:res.data.inside[0]
						})
						}
					}else{
						if(!this.lock){
							this.setState({
								searchdata:res.data.inside[3]
							})
						}
					}
				};
				if(this.state.searchdata){
					if(!this.lock){
					 this.setState({
							restaurant:this.state.searchdata.restaurant_with_foods
						  })
					}
				}			
				console.log(this.state.restaurant)	
		})
		};
	}
	render(){
		return <div id="shop">
     <Searchcom {...this.props} searchkey={this.state.searchvalue}></Searchcom>
	 <div className="shop-head">
		<div className="shop-head-l">
			<span>分类</span>
			<em></em>
		</div>
		<div className="shop-head-c">
			<span>排序</span>
			<em></em>
		</div>
		<div className="shop-head-r">
			<span>筛选</span>
			<em></em>	
		</div>
	</div>
	<section className="datalist">
	<InfiniteScroll
		      pageStart={0}
		      initialLoad={false}
		      threshold={300}
		      loadMore={this.loadFunc.bind(this)}
		      hasMore={this.state.hasMoreItems}
		  >
		  {
		  	this.state.restaurant?
		  	this.state.restaurant.map((item,index)=>
		  	{
		  	 return <div className="datalist-child" key={index} onClick={this.sellerskip.bind(this,item.restaurant.id)}>
			 <div className="datalist-t">
				<img src={this.reslogo(item.restaurant.image_path)}/>
				<div className="datalist-t-r">
					<div className="datalist-t-rt">
						<p><strong>{item.restaurant.name}</strong></p>
						<span>{this.delivery(item)}</span>
					</div>
					<div className="datalist-t-rb">
						<p><span>评价{item.restaurant.rating}</span>|<span>起送费¥{item.restaurant.float_minimum_order_amount}</span>|<span>配送费¥{item.restaurant.float_delivery_fee}</span></p>
						<p><span>{this.distance(item)}</span>|<span>{this.time(item)}分钟</span></p>
					</div>
				</div>
		    </div>
			<div className="datalist-b">
				<ul>
				{
					 item.foods.map((items,indexs)=>
					 {	
					 	if(indexs>1){
					 		if(this.isnone(item.restaurant.id)){
					 			return <li key={items.id}>
					 				<img className="foodimg" src={this.foodimg(items.image_path)} alt=""/>
					 				<div className="img-right">
					 					<p>{items.name}</p>
					 					<p><span>月售{items.month_sales}份</span><span>好评率{items.satisfy_rate}</span></p>
					 					<p>¥{items.price}</p>
					 				</div>
					 			</li>
					 		}else{
					 			return ""
					 		}	
					 		}else{
					 		 return <li key={items.id}>
					 				<img className="foodimg" src={this.foodimg(items.image_path)} alt=""/>
					 				<div className="img-right">
					 					<p>{items.name}</p>
					 					<p><span>月售{items.month_sales}份</span><span>好评率{items.satisfy_rate}</span></p>
					 					<p>¥{items.price}</p>
					 				</div>
					 			</li>
					 		}
					    }
						)
				}
				</ul>
				{
					item.foods.length>2?
					<div className="openmore" onClick={(e)=>this.openmore(e,item.restaurant.id)}>
					<span>展开更多商品<strong>{this.morenum(item.foods.length)}</strong>个</span><i className={this.state.currentid!==item.restaurant.id?'iconfont icon-moreunfold':'iconfont icon-less'}></i>
				    </div>
				    :""
				}
				
			</div>
		    </div>
		  	}
		  	)
		  	:""
		  }
		
		</InfiniteScroll>
	</section>
	<section className="loadinfo">
	{this.state.loadtext}
	</section>
		</div>
	}
	reslogo(url){
  		if(this.state.restaurant.length!=0){
  		var image_path=url.slice(0,1)+"/"+url.slice(1,3)+"/"+url.slice(3)+"."+url.slice(32)
  		return `https://fuss10.elemecdn.com/${image_path}?imageMogr/format/webp/thumbnail/64x/`
  		}else{
  			return ""
  		}
  	}
  	sellerskip(id){
  		this.props.history.push("/seller?id="+id);
  	}
  	openmore(e,id){
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
  	isnone(id){
  		if(id!=this.state.currentid){
  			return false;
  		}else{
  			return true;
  		}
  	}
	foodimg(url){
		if(this.state.restaurant.length!=0){
		var image_path=url.slice(0,1)+"/"+url.slice(1,3)+"/"+url.slice(3)+"."+url.slice(32)
		return `https://fuss10.elemecdn.com/${image_path}?imageMogr/format/webp/thumbnail/128x/`
		}else{
			return ""
		}
	}
	delivery(txt){
		return txt.restaurant.delivery_mode?txt.restaurant.delivery_mode.text:""
	}
	distance(data){
		if(data.restaurant.distance>1000){
			return (data.restaurant.distance/1000).toFixed(2)+"km"
		}else{
			return data.restaurant.distance+"m"
		}
	}
	time(data){
		return data.restaurant.order_lead_time+4
	}
	morenum(data){
  		if(data>2){
  			return data-2
  		}else{
  			return data
  		}
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
			if(this.props.location.search.split("?")[1].split("=")[1]){
			axios.get(`/shopping/v2/restaurants/search?offset=${this.state.offset}&limit=20&keyword=${this.props.location.search.split("?")[1].split("=")[1]}&latitude=30.274151&longitude=120.155151&search_item_type=3&is_rewrite=1&extras[]=activities&extras[]=coupon&terminal=h5`).then(res=>{
				if(Object.keys(res.data.inside).length!=0){
				if(res.data.inside){
					if(res.data.inside[0]){
						this.setState({
							searchdata:res.data.inside[0]
						})
					}else{
						this.setState({
							searchdata:res.data.inside[3]
						})
					}
				};
			}else{
				if(!this.lock){
					this.setState({
						hasMoreItems:true,
						loadtext:"加载完成"
					})
				}
			}
				if(this.state.searchdata){
					if(!this.lock){
					 this.setState({
							restaurant:[...this.state.restaurant,...this.state.searchdata.restaurant_with_foods]
						  })
					}
				}
			console.log(this.state.restaurant)
		})
		};
	}
}
export default connect(
		null,
		null
	)(Shop);