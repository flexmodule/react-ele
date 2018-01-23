import React from "react";
import "./index.scss";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
class Cast extends React.Component{
	constructor(){
		super();
		this.state={
			totalp:null
		}
	}
	componentDidMount(){	
	}
// {"555696":[{"entities":[{"id":101558863,"sku_id":"6712669214","item_id":"5854741534","quantity":3,"name":"麦辣鸡翅2块","price":11,"original_price":null,"packing_fee":0,"stock":8854,"specs":[{"name":"规格","value":"例"}],"attrs":[],"weight":100,"extra":{},"view_discount_price":33,"view_original_price":33},{"id":1232409541,"sku_id":"200000033187370014","item_id":"200000032498429982","quantity":2,"name":"麦乐鸡5块","price":11,"original_price":null,"packing_fee":0,"stock":9096,"specs":[{"name":"规格","value":"例"}],"attrs":[],"weight":100,"extra":{},"view_discount_price":22,"view_original_price":22}],"maxDiscountQuantity":-1}]}
// 		{"555696":[{"entities":[{"id":101558863,"sku_id":"6712669214","item_id":"5854741534","quantity":3,"name":"麦辣鸡翅2块","price":11,"original_price":null,"packing_fee":0,"stock":8854,"specs":[{"name":"规格","value":"例"}],"attrs":[],"weight":100,"extra":{},"view_discount_price":33,"view_original_price":33},{"id":1232409541,"sku_id":"200000033187370014","item_id":"200000032498429982","quantity":2,"name":"麦乐鸡5块","price":11,"original_price":null,"packing_fee":0,"stock":9096,"specs":[{"name":"规格","value":"例"}],"attrs":[],"weight":100,"extra":{},"view_discount_price":22,"view_original_price":22},{"id":101558866,"sku_id":"6712635422","item_id":"5854707742","quantity":1,"name":"经典麦辣鸡腿汉堡","price":17,"original_price":null,"packing_fee":0,"stock":9525,"specs":[{"name":"规格","value":"例"}],"attrs":[],"weight":100,"extra":{},"view_discount_price":17,"view_original_price":17}],"maxDiscountQuantity":-1}],"156156015":[{"entities":[{"id":679126858,"sku_id":"295785902996","item_id":"255744147348","quantity":1,"name":"（大杯）红茶玛奇朵","price":15,"original_price":null,"packing_fee":0,"stock":8652,"specs":[{"name":"规格","value":"+免费配料"}],"attrs":[{"name":"甜度","value":"七分甜"},{"name":"加料1","value":"不加"},{"name":"加料2","value":"不加"},{"name":"冰块","value":"少冰"}],"weight":0,"extra":{},"view_discount_price":15,"view_original_price":15}],"maxDiscountQuantity":1}]}
	render(){
		var castinfo=localStorage.getItem('castinfo')?JSON.parse(localStorage.getItem('castinfo')):{};
		console.log(castinfo)
		var keyarr=Object.keys(castinfo);
		console.log(keyarr)
		var currentid=0;
		function sellershow(id){
			return false;
		}
		function sellerdelete(id,e){
			e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode);
			delete castinfo[id];
			localStorage.setItem('castinfo',JSON.stringify(castinfo));
		}
		function goodsdelete(rid,itemid,e){
			e.stopPropagation();
			for(var key in castinfo){
				if(key==rid){
					for(var i=0;i<castinfo[key].length;i++){
						if(castinfo[key][i].itemid==itemid){
						castinfo[key].splice(i,1)
					   }
					}
				}
			}
			localStorage.setItem('castinfo',JSON.stringify(castinfo));	
			e.target.parentNode.parentNode.parentNode.parentNode.lastChild.childNodes[0].firstChild.lastChild.innerHTML=totalprice(rid);
			e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode);
			
		}
		
		function totalprice(rid){
			for(var key in castinfo){
				if(rid==key){
					var total=0;
					for(var i=0;i<castinfo[key].length;i++){
						total+=parseInt(castinfo[key][i].num)*parseInt(castinfo[key][i].iprice)
					}
					return total;
				}
			}
		}
		return <div id="cast">
 <section className="cast-header">
	<NavLink to="/">
		<i className="iconfont icon-back"></i>
	</NavLink>
	<strong>购物车</strong>
</section>
<section className="castlist">
{
	keyarr.map(item=>
		  <div className="cast-child" key={item}>
		    <div className="cast-t">
		       <span>{castinfo[parseInt(item)][0].rname} ></span><i className="iconfont icon-delete" onClick={sellerdelete.bind(this,item)}></i>
		    </div>
			<div className="cast-c" onClick={this.skipseller.bind(this,item)}>
			{
				castinfo[parseInt(item)].map((items,indexs)=>
					<div className="cast-c-child" key={items.itemid}>
					<div className="cast-c-l">
						<img src={this.sellerlogo(items.itempath)}/>
						<div className="imgtitle">
						<p>{items.iname}</p>
						<p>x{items.num}</p>
						</div>
					</div>
					<div className="cast-c-r">
						<div className="close iconfont icon-close" onClick={goodsdelete.bind(this,item,items.itemid)}>
						</div>
						<div className="price">
						¥{(items.iprice*items.num).toFixed(2)}
						</div>
					</div>
					</div>

					)
			}
			</div>
			<div className="cast-b">
			<span className="cast-b-r">
			<span className="total">合计¥<i ref="total" className={item}>{totalprice(item)}</i></span>
			<span className="cal">去结算</span>
			</span>
			</div>
		</div>

	)
}
	</section>	
		</div>
	}
	skipseller(id){
		this.props.history.push(`seller?id=${id}`)
	}
	sellerlogo(url){
  		var image_path=url.slice(0,1)+"/"+url.slice(1,3)+"/"+url.slice(3)+"."+url.slice(32)
  		return `//fuss10.elemecdn.com/${image_path}?imageMogr/format/webp/`
  	}
}

export default connect(
	null,
	null
	)(Cast);