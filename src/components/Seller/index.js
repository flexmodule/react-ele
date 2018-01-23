import React from "react";
import {connect} from "react-redux";
import "./index.scss";
import {NavLink} from "react-router-dom";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
class Seller extends React.Component{
	constructor(){
		super();
		this.state={
			seller:{},
			sellerlogo:"",
			actisshow:false,
			menu:[]
		}
		this.lock=false;
	}
	componentWillMount(){
		var id=this.props.location.search.split("?")[1].split("=")[1];
		axios.get(`/shopping/restaurant/${id}?extras[]=activities&extras[]=albums&extras[]=license&extras[]=identification&extras[]=qualification&terminal=h5&latitude=30.274151&longitude=120.155151`).then(res=>{
			 	if(!this.lock){
			 		this.setState({
			 			seller:res.data
			 		})
			 	}
		});
		axios.get(`/shopping/v2/menu?restaurant_id=${id}`).then(res=>{
			console.log(res.data);
			if(!this.lock){
				this.setState({
					menu:res.data
				})
			}
		})
		
	}
	componentDidMount(){
	}
	render(){
		var castlist=localStorage.getItem('castinfo')?JSON.parse(localStorage.getItem('castinfo')):{};
		function joincast(info){
		if(Object.keys(castlist).length!=0){
			var count=0;
			for(var key in castlist){
				console.log(key)
				if(key==info.rid){
					for(var i=0;i<castlist[key].length;i++){
						if(castlist[key][i].itemid==info.itemid){
							castlist[key][i].num++;
							break;
						}
						}
						if(i==castlist[key].length){
							var obj={};
							obj.itemid=info.itemid;
							obj.itempath=info.itempath;
							obj.iname=info.iname;
							obj.rname=info.rname;
							obj.num=1;
							obj.iprice=info.iprice;
							castlist[key].push(obj);
						}		
				}else{
					++count;
				}
			}
			console.log(count,Object.keys(castlist).length)
			if(count==Object.keys(castlist).length){
				var obj1={};
				obj1.itemid=info.itemid;
				obj1.itempath=info.itempath;
				obj1.iname=info.iname;
				obj1.rname=info.rname;
				obj1.num=1;
				obj1.iprice=info.iprice;
				castlist[info.rid]=[obj1];
			}
		}else{
			var obj2={};
			obj2.itemid=info.itemid;
			obj2.itempath=info.itempath;
			obj2.iname=info.iname;
			obj2.rname=info.rname;
			obj2.num=1;
			obj2.iprice=info.iprice;
			castlist[info.rid]=[obj2];
		}
		localStorage.setItem('castinfo',JSON.stringify(castlist));
	}
		return <div id="seller">
	<section className="seller-header">
		<div className="seller-header-t">
			<NavLink to="/">
			<i className="iconfont icon-back"></i>
			</NavLink>
		</div>
		<div className="seller-header-c">
			<div className="seller-header-c-l">
				<img src={this.sellerimg(this.state.seller.image_path)}/>
			</div>
			<div className="seller-header-c-r">
				<h3><strong>{this.state.seller.name}</strong></h3>
				<p><span>{this.delivery(this.state.seller.delivery_mode)}</span>/<span>{this.state.seller.order_lead_time}分钟送达</span>/<span>配送费¥{this.state.seller.float_delivery_fee}</span></p>
				<p>公告：{this.state.seller.promotion_info}</p>
			</div>
		</div>
		<div className="seller-header-b">
			<span><i>{this.activitytitle(this.state.seller.activities)}</i>{this.activity(this.state.seller.activities)}</span>
			<span onClick={this.floatingup.bind(this)}>{this.activitylength(this.state.seller.activities)}个活动<i></i></span>
		</div>
		<div className="shopcar">
			<NavLink to="/cast">
			<i className="iconfont icon-cart"></i>
			</NavLink>
		</div>
	</section>
	<ReactCSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
	 {   this.state.actisshow?
		<section className="activity">
		<div className="activity-t">
			{this.state.seller.name}
		</div>
		<div className="activity-c activity-same">
			<div className="activity-same-c">
				<span>优惠信息</span>
			</div>
			{
				this.state.seller.activities?
				this.state.seller.activities.map((item,index)=>
					<p key={index}><i>{this.actinfo(item).icon_name}</i>{this.actinfo(item).description}</p>
					)
				:""
			}
			
		</div>
		<div className="activity-b activity-same">
			<div className="activity-same-c">
				<span>商家公告</span>
			</div>
			<p>{this.state.seller.promotion_info}</p>
		</div>
		<div className="act-close">
			<i className="iconfont icon-close" onClick={this.floatingdown.bind(this)}></i>
		</div>
	</section>
	:""
	}
	</ReactCSSTransitionGroup>
	<section>
		<ul  className="nav">
			<li className="foods">
				<span className="active">商品</span>
			</li>
			<li className="ratings">
				<span>评价</span>
			</li>
			<li className="store">
				<span>店铺</span>
			</li>
		</ul>	
	</section>	
	<section className="menu">
		  <div className="menu-l">
          <ul className="menu-l-ul">
          		{
          			this.state.menu.map((item,index)=>		
          				 <li key={index}>{item.name}</li>   
          			)
          		}	
           </ul>
         </div>
         <div className="menu-r">
         <ul className="menu-r-ul">
         {
         	this.state.menu.map(item=>
         		item.foods.map((items,indexs)=>
         			<li key={indexs}>
         			<img src={this.menu(items.image_path)}/>
         			<div>
         			<h3>{items.name}</h3>
         			<p>{items.description}</p>
         			<p>{items.tips}好评率{items.satisfy_rate}%</p>
         			<span>¥{items.specfoods[0].price}</span>
         			 <em onClick={joincast.bind(this,{'rid':items.restaurant_id,'rname':this.state.seller.name,'itemid':items.item_id,'itempath':items.image_path,'iname':items.name,'iprice':items.specfoods[0].price})}><i>+</i></em>
         			</div>
         			</li>
         			)
         		)
         }
         </ul>
        </div>
	</section>	
	</div>
	}

	menu(url){
		if(url){
  			var image_path=url.slice(0,1)+"/"+url.slice(1,3)+"/"+url.slice(3)+"."+url.slice(32)
  		return `https://fuss10.elemecdn.com/${image_path}?imageMogr/format/webp/thumbnail/!140x140r/gravity/Center/crop/140x140/`
  	 }else{
  		return ""
  	}
	}
	sellerimg(url){
  		if(url){
  			var image_path=url.slice(0,1)+"/"+url.slice(1,3)+"/"+url.slice(3)+"."+url.slice(32)
  		return `https://fuss10.elemecdn.com/${image_path}?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/`
  	}else{
  		return ""
  	}	
  	}
  	delivery(data){
  		return data?(data.text?data.text:""):""
  	}
  	activitytitle(data){
  		return data?(data[0]?data[0].icon_name:""):"";
  	}
  	activity(data){
  		return data?(data[0]?data[0].description:""):"";
  	}
  	activitylength(data){
  		return data?(data.length?data.length:""):""
  	}
  	actinfo(data){
  		return data?data:""
  	}
  	floatingup(){
  		if(!this.lock){
  			this.setState({
  				actisshow:true
  			})
  		}
  	}
  	floatingdown(){
  		if(!this.lock){
  			this.setState({
  				actisshow:false
  			})
  		}
  	}
}

export default connect(
	null,
	null
	)(Seller);