import React from "react";
import {connect} from "react-redux";
import "./index.scss";
import {NavLink} from "react-router-dom";
import ReactSwipe from 'react-swipe';
import InfiniteScroll from 'react-infinite-scroller';
class Home extends React.Component{
	constructor(){
		super();
		this.state={
			address:"",
			weather:{},
			keylist:[],
			recommon:[],
			sellerlist:[],
			currentid:0,
			offset:0,
			hasMoreItems:true,
			judge:false,
			fix:{position:"fixed",top:0,zIndex:2},
    	    sta:{position:"static"},
    	    loadtext:"正在加载......"
		}
		this.lock = false;  
	}
	componentWillUnmount(){
	 this.lock = true;
      window.removeEventListener('scroll', this.bodyscroll.bind(this),false);
     }
	componentDidMount(){
		 axios.get("/bgs/poi/reverse_geo_coding?latitude=30.274151&longitude=120.155151").then(res=>{
	    	if(!this.lock){
	    		    	this.setState({
	    						address:res.data.name
	    					})
	    	}
	    });
		axios.get("/bgs/weather/current?latitude=30.274151&longitude=120.155151").then(res=>{
  		if(!this.lock){
  		this.setState({
  							weather:res.data
  					})
  	}
  	    });
  	    if(this.props.keynamelist.length==0){
	   		this.props.keylistul();
	   };
	   axios.get("/shopping/v2/entries?latitude=30.274151&longitude=120.155151&templates[]=main_template").then(res=>{
	   	  if(!this.lock){
	   	   this.setState({
  							recommon:res.data[0].entries
  					})
	   	}
	   });
	   axios.get("/shopping/restaurants?latitude=30.274151&longitude=120.155151&offset=0&limit=20&extras[]=activities&extra_filters=home&terminal=h5").then(res=>{
  		console.log(res.data)
  		if(!this.lock){
  		this.setState({
  							sellerlist:res.data
  					})
  	}
  	
  	});

    var that=this;
   
  	if(window.location.pathname=="/common/home"){
  		window.addEventListener("scroll",this.bodyscroll.bind(this),false);
  	}
	}
	render(){
    return <div id="home">
<section className="header">
	  <div className="header-l">
	  <i className="iconfont icon-map"></i>
	  <span>{this.state.address}</span>
	  <em></em>
	  </div>
	  <div className="header-r">
		  <span>
			  <h3>{this.state.weather.temperature}°</h3>
			  <p>{this.state.weather.description}</p>
		  </span>
		  <img src={this.weatherpic()}/>
	  </div>
</section>
<section className="search" style={this.state.judge?this.state.fix:this.state.sta}>
	<NavLink to="/search">
      <div className="search-child">
	      <i className="iconfont icon-search"></i>
	      <span>搜索商家、商品名称</span>
      </div>
    </NavLink>
</section>
<section className="keylist">
	<ul>	
		{this.props.keynamelist.map((item,index)=>
				<li key={item.word} onClick={this.swiftto.bind(this,item.word)}>
				{item.word}
				</li>
			)
	     }
	</ul>
</section>
<section className="recom">
	<ReactSwipe className="carousel" swipeOptions={{continuous: false}} key={this.state.recommon.length}>
					<div className="recom-child">
					{this.state.recommon.map((item,index)=>{
						if(index<8){
							return <a className="recom-a" key={item.id} onClick={this.switchseller.bind(this,item.name,item.link)}>
								<div className="recom-img">
									<img src={this.recimg(item.image_hash)}/>
								</div>
								<span>{item.name}</span>
							</a>
						}
					}	
					)
			        }
					</div>
					<div className="recom-child">
					{this.state.recommon.map((item,index)=>{
						if(index>7){
							return <a className="recom-a" key={item.id} onClick={this.switchseller.bind(this,item.name,item.link)}>
								<div className="recom-img">
									<img src={this.recimg(item.image_hash)}/>
								</div>
								<span>{item.name}</span>
							</a>
						}
					   }
								)
			         }
					</div>
	 </ReactSwipe>
</section>
<section className="banner">
      <img src="https://fuss10.elemecdn.com/3/c8/45b2ec2855ed55d90c45bf9b07abbpng.png?imageMogr/format/webp/thumbnail/!710x178r/gravity/Center/crop/710x178/"/>
</section>
<section className="rec-seller">
	<h4>推荐商家</h4>
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
	swiftto(word){
		this.props.history.push("/shop?keyword="+encodeURIComponent(word))
	}
	sellerskip(id){
  		this.props.history.push("/seller?id="+id);
  	}
	 bodyscroll(){
    	var scrolltop=document.documentElement.scrollTop||document.body.scrollTop;
  		if(scrolltop>38){
  			if(!this.lock){
  			this.setState({
  				judge:true
  			})
  		}
  		}else{
  			if(!this.lock){
  			this.setState({
  				judge:false
  			})
  		}
  		}
    }
	weatherpic(){
  		if(Object.keys(this.state.weather).length!=0){
  		var weather_image_hash=this.state.weather.image_hash.slice(0,1)+"/"+this.state.weather.image_hash.slice(1,3)+"/"+this.state.weather.image_hash.slice(3)
  		this.imgurl=`//fuss10.elemecdn.com/${weather_image_hash}.png?imageMogr/format/webp/thumbnail/!69x69r/gravity/Center/crop/69x69/`
  		return this.imgurl
  		}
  	}
  	recimg(url){
  		var image_path=url.slice(0,1)+"/"+url.slice(1,3)+"/"+url.slice(3)+"."+url.slice(32)
  		return `//fuss10.elemecdn.com/${image_path}?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/`
  	}
  	switchseller(name,linkdata){
  		var linkd=decodeURIComponent(linkdata);
  		var category_ids;
  		if(linkd.split("?")[1].split("&")[1].split("=")[0]=="target"){
  			category_ids=JSON.parse(linkd.split("?")[1].split("&")[1].split("=")[1]).restaurant_category_id.join(",");
  		}else if(linkd.split("?")[1].split("&")[2].split("=")[0]=="target"){
  			if(JSON.parse(linkd.split("?")[1].split("&")[2].split("=")[1]).restaurant_category_id){
  				category_ids=JSON.parse(linkd.split("?")[1].split("&")[2].split("=")[1]).restaurant_category_id.join(",");
  			}else{
  				category_ids=""
  			}
  		}else{
  			category_ids=""
  		}
  		this.props.history.push("/kindlist?target_name="+name+"&restaurant_category_ids="+category_ids)
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
  	isact(id){
  		if(this.state.currentid!=id){
  			return false;
  		}else{
  			return true;
  		}
  	}
}
export default connect(
    (state)=>{
		return {
			keynamelist:state.list
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
	)(Home);