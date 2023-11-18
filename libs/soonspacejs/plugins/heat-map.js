import{Matrix4 as t,Vector2 as e,Shape as a,ShapeGeometry as i,Box2 as n,Plane as s,Vector3 as r,Matrix3 as o,PlaneGeometry as h,CanvasTexture as d,MeshStandardMaterial as c,Mesh as l,Box3 as u,DoubleSide as p}from"three";var m={defaultRadius:40,defaultGradient:{.25:"rgb(0,0,255)",.55:"rgb(0,255,0)",.85:"yellow",1:"rgb(255,0,0)"},defaultMaxOpacity:1,defaultMinOpacity:0,defaultBlur:.85,defaultXField:"x",defaultYField:"y",defaultValueField:"value",plugins:{}},g=function(){function t(){this.eStore={}}return t.prototype.on=function(t,e,a){this.eStore[t]||(this.eStore[t]=[]),this.eStore[t].push((function(t){return e.call(a,t)}))},t.prototype.emit=function(t,e){this.eStore[t]&&this.eStore[t].forEach((function(t){return t(e)}))},t}(),x=function(){function t(t){this.coordinator=new g,this.data=[],this.radi=[],this.min=10,this.max=1,this.xField=t.xField||m.defaultXField,this.yField=t.yField||m.defaultYField,this.valueField=t.valueField||m.defaultValueField,this.radius=t.radius||m.defaultRadius}return t.prototype._organiseData=function(t,e){var a=t[this.xField],i=t[this.yField],n=this.radi,s=this.data,r=this.max,o=this.min,h=t[this.valueField]||1,d=t.radius||this.radius;n[a]||(s[a]=[],n[a]=[]),n[a][i]?s[a][i]+=h:(s[a][i]=h,n[a][i]=d);var c=s[a][i];return c?c>r?(e?this.setDataMax(c):this.max=c,!1):c<o?(e?this.setDataMin(c):this.min=c,!1):void 0:{x:a,y:i,value:h,radius:d,min:o,max:r}},t.prototype._unOrganizeData=function(){for(var t=[],e=0;e<this.radi.length;e++)for(var a=0;a<this.radi[e].length;a++)t.push({x:e,y:a,radius:this.radi[e][a],value:this.radi[e][a]});return{min:this.min,max:this.max,data:t}},t.prototype._onExtremaChange=function(){this.coordinator.emit("extremachange",{min:this.min,max:this.max})},t.prototype.addData=function(t){var e=this._organiseData(t,!0);e&&(0===this.data.length&&(this.min=e.value,this.max=e.value),this.coordinator.emit("renderpartial",{min:this.min,max:this.max,data:[e]}))},t.prototype.setData=function(t){var e=t.data;this.data=[],this.radi=[];for(var a=0;a<e.length;a++)this._organiseData(e[a],!1);return this.min=t.min||0,this.max=t.max||100,this._onExtremaChange(),this.coordinator.emit("renderall",this._getInternalData()),this},t.prototype.setDataMax=function(t){return this.max=t,this._onExtremaChange(),this.coordinator.emit("renderall",this._getInternalData()),this},t.prototype.setDataMin=function(t){return this.min=t,this._onExtremaChange(),this.coordinator.emit("renderall",this._getInternalData()),this},t.prototype._getInternalData=function(){return{max:this.max,min:this.min,data:this.data,radi:this.radi}},t.prototype.getData=function(){return this._unOrganizeData()},t}(),y=function(){function t(t){this.canvas=t.canvas||document.createElement("canvas"),this.ctx=this.canvas.getContext("2d"),this.shadowCanvas=t.shadowCanvas||document.createElement("canvas"),this.shadowCtx=this.shadowCanvas.getContext("2d"),this.width=t.width||512,this.height=t.height||512,this.max=100,this.min=1,this.blur=1,this.opacity=1,this.maxOpacity=1,this.minOpacity=0,this.useGradientOpacity=!1,this.canvas.style.cssText=this.shadowCanvas.style.cssText="position:absolute;left:0;top:0;",t.container&&(t.container.style.position="relative",t.container.appendChild(this.canvas)),this.renderBoundaries=[1e4,1e4,0,0],this.palette=this._getColorPalette(t),this.templates=[],this._setStyles(t)}return t.prototype.renderPartial=function(t){t.data.length>0&&(this._drawAlpha(t),this._colorize())},t.prototype.renderAll=function(t){this._clear(),t.data.length>0&&(this._drawAlpha(this._prepareData(t)),this._colorize())},t.prototype.updateConfig=function(t){t.gradient&&this._updateGradient(t),this._setStyles(t)},t.prototype.setDimensions=function(t,e){this.width=this.canvas.width=this.shadowCanvas.width=t,this.height=this.canvas.height=this.shadowCanvas.height=e},t.prototype.getValueAt=function(t){if(!this.shadowCtx)return 0;var e=this.shadowCtx.getImageData(t.x,t.y,1,1);return Math.abs(this.max-this.min)*(e.data[3]/255)>>0},t.prototype.getDataURL=function(){return this.canvas.toDataURL()},t.prototype._getColorPalette=function(t){var e=t.gradient||m.defaultGradient,a=document.createElement("canvas"),i=a.getContext("2d");if(a.width=256,a.height=1,!i)return new Uint8ClampedArray(1024);var n=i.createLinearGradient(0,0,256,1);for(var s in e)n.addColorStop(Number(s),e[s]);return i.fillStyle=n,i.fillRect(0,0,256,1),i.getImageData(0,0,256,1).data},t.prototype._getPointTemplate=function(t,e){var a=document.createElement("canvas"),i=a.getContext("2d");if(!i)return a;var n=t,s=t;if(a.width=a.height=2*t,1===e)i.beginPath(),i.arc(n,s,t,0,2*Math.PI,!1),i.fillStyle="rgba(0,0,0,1)",i.fill();else{var r=i.createRadialGradient(n,s,t*e,n,s,t);r.addColorStop(0,"rgba(0,0,0,1)"),r.addColorStop(1,"rgba(0,0,0,0)"),i.fillStyle=r,i.fillRect(0,0,2*t,2*t)}return a},t.prototype._prepareData=function(t){for(var e=[],a=t.min,i=t.max,n=t.radi,s=t.data,r=Object.keys(s),o=r.length;o--;)for(var h=r[o],d=Object.keys(s[h]),c=d.length;c--;){var l=d[c],u=s[h][l],p=n[h][l];e.push({x:Number(h),y:Number(l),value:u,radius:p})}return{min:a,max:i,data:e}},t.prototype._setStyles=function(t){this.blur=0===t.blur?0:t.blur||m.defaultBlur,t.backgroundColor&&(this.canvas.style.backgroundColor=t.backgroundColor),this.width=this.canvas.width=this.shadowCanvas.width=t.width||this.width,this.height=this.canvas.height=this.shadowCanvas.height=t.height||this.height,this.opacity=255*(t.opacity||0),this.maxOpacity=255*(t.maxOpacity||m.defaultMaxOpacity),this.minOpacity=255*(t.minOpacity||m.defaultMinOpacity),this.useGradientOpacity=!!t.useGradientOpacity},t.prototype._updateGradient=function(t){this.palette=this._getColorPalette(t)},t.prototype._drawAlpha=function(t){for(var e=this.min=t.min||0,a=this.max=t.max||100,i=t.data||[],n=i.length,s=1-this.blur;n--;){var r=i[n],o=r.x,h=r.y,d=r.radius,c=Math.min(r.value,a),l=o-d,u=h-d;if(!this.shadowCtx)return;var p=void 0;this.templates[d]?p=this.templates[d]:this.templates[d]=p=this._getPointTemplate(d,s);var m=(c-e)/(a-e);this.shadowCtx.globalAlpha=m<.01?.01:m,this.shadowCtx.drawImage(p,l,u),l<this.renderBoundaries[0]&&(this.renderBoundaries[0]=l),u<this.renderBoundaries[1]&&(this.renderBoundaries[1]=u),l+2*d>this.renderBoundaries[2]&&(this.renderBoundaries[2]=l+2*d),u+2*d>this.renderBoundaries[3]&&(this.renderBoundaries[3]=u+2*d)}},t.prototype._colorize=function(){var t=this.renderBoundaries[0],e=this.renderBoundaries[1],a=this.renderBoundaries[2]-t,i=this.renderBoundaries[3]-e,n=this.width,s=this.height;if(t<0&&(t=0),e<0&&(e=0),t+a>n&&(a=n-t),e+i>s&&(i=s-e),this.ctx&&this.shadowCtx){for(var r=this.shadowCtx.getImageData(t,e,a,i),o=3;o<r.data.length;o+=4){var h,d=r.data[o],c=4*d;c&&(h=this.opacity>0?this.opacity:d<this.maxOpacity?d<this.minOpacity?this.minOpacity:d:this.maxOpacity,r.data[o-3]=this.palette[c],r.data[o-2]=this.palette[c+1],r.data[o-1]=this.palette[c+2],r.data[o]=this.useGradientOpacity?this.palette[c+3]:h)}this.ctx.putImageData(r,t,e),this.renderBoundaries=[1e3,1e3,0,0]}},t.prototype._clear=function(){this.ctx&&this.shadowCtx&&(this.ctx.clearRect(0,0,this.width,this.height),this.shadowCtx.clearRect(0,0,this.width,this.height))},t}(),f=function(){function t(t){this.config=t,this.renderer=new y(this.config),this.store=new x(this.config),this._init()}return t.prototype._init=function(){var t=this;this.store.coordinator.on("renderpartial",this.renderer.renderPartial,this.renderer),this.store.coordinator.on("renderall",this.renderer.renderAll,this.renderer),this.store.coordinator.on("extremachange",(function(e){t.config.onExtremaChange&&t.config.onExtremaChange({min:e.min,max:e.max,gradient:t.config.gradient||m.defaultGradient})}))},t.prototype.addData=function(t){return this.store.addData(t),this},t.prototype.setData=function(t){return this.store.setData(t),this},t.prototype.setDataMaxx=function(t){return this.store.setDataMax(t),this},t.prototype.setDataMin=function(t){return this.store.setDataMin(t),this},t.prototype.repaint=function(){return this.store.coordinator.emit("renderall",this.store._getInternalData()),this},t.prototype.getData=function(){return this.store.getData()},t.prototype.getDataURL=function(){return this.renderer.getDataURL()},t.prototype.getValueAt=function(t){return this.renderer.getValueAt(t)},t}();function v(h){const d=function(t){const[e,a,i]=t,n=new s;n.setFromCoplanarPoints(a,e,i);const h=n.normal,d=h.clone().cross(new r(0,0,1));d.equals(new r)&&d.set(1,0,0);const c=h.clone().cross(d);d.normalize(),c.normalize(),h.normalize();const l=new o;return l.elements=[d.x,d.y,d.z,c.x,c.y,c.z,h.x,h.y,h.z],l}(h),c=new t;c.setFromMatrix3(d);const l=h[0],u=c.clone();u.setPosition(l);const p=u.clone().invert(),m=h.map((t=>{const a=t.clone().applyMatrix4(p);return new e(a.x,a.y)})),g=new a(m),x=new i(g),y=new n;y.setFromPoints(m);const f=function(t){const a=t.min,i=t.getSize(new e),n=new o;return n.elements=[i.x,0,0,0,i.y,0,a.x,a.y,1],n.invert()}(y);return x.getAttribute("uv").applyMatrix3(f),x.applyMatrix4(c),{geometry:x,polygonBox:y,modelMatrix:c,planeMatrix:u,projectionMatrix:p,position:l}}class w{constructor(t){this.ssp=t,this.store=new Map,this.maxCanvasSize=512,this.hmInstance=null}create(t){const{id:e,name:a,yAxisHeight:i,minPosition:n,maxPosition:s,data:o,min:u=0,max:p=100,radius:m=100,canvasScalar:g=1}=t,x=new r((s.x+n.x)/2,i,(s.z+n.z)/2),y=s.x-n.x,f=s.z-n.z,v=this._formatCanvasSize(y*g,f*g),{canvas:w,hmInstance:D}=this.createInitData(Object.assign(Object.assign({},v),{radius:m}));D.setData({max:p,min:u,data:this._formatData(o,n,{width:y,height:f},v)});const C=new h(y,f),_=new d(w),b=new c({map:_,depthWrite:!1,transparent:!0}),O=new l(C,b),z=this.ssp.createPluginObject({id:e,name:a,position:x.clone(),rotation:{x:-Math.PI/2,y:0,z:0}},O);return this.store.set(e,{object:z,canvas:w,param:Object.assign(Object.assign({},t),{min:u,max:p}),width:y,height:f}),z}createPolygon(t){const{id:a,name:i,points:n,data:s,min:o=0,max:h=100,radius:l=100}=t,m=n.map((t=>new r(t.x,t.y,t.z))),{geometry:g,projectionMatrix:x,polygonBox:y,position:f}=v(m);(new u).setFromPoints(m);const{x:w,y:D}=y.getSize(new e),C=this._formatCanvasSize(w,D),{canvas:_,hmInstance:b}=this.createInitData(Object.assign(Object.assign({},C),{radius:l}));b.setData({max:h,min:o,data:this._formatData_Polygon(s,x,y,C)});const O=new d(_),z=new c({map:O,depthWrite:!1,transparent:!0,side:p}),M=new this.ssp.library.BaseMesh({id:`${a}_mesh`,name:i},g,z);M.renderOrder=0;const I=this.ssp.createPluginObject({id:a,name:i,position:f},M);return this.store.set(a,{object:I,canvas:_,param:Object.assign(Object.assign({},t),{min:o,max:h}),width:w,height:D,projectionMatrix:x,polygonBox:y,position:f.clone()}),I}setData(t,e){const a=this.store.get(t);if(a){const{object:t,canvas:i,param:{minPosition:n,min:s,max:r},width:o,height:h}=a,c=this.createInitData(),{canvas:l,hmInstance:u}=c;u.renderer.updateConfig({width:i.width,height:i.height}),u.setData({max:r,min:s,data:this._formatData(e,n,{width:o,height:h},this._formatCanvasSize(o,h))});const p=t.children[0].material;return this.ssp.render((()=>{const t=new d(l);p.map=t,p.version++})),t}return console.warn(`In soonspacejs: 插件（plugin-heat-map）未找到 id 为 '"${t}"' 的热力图对象!`)}setDataPolygon(t,a){const i=this.store.get(t);if(i){const{object:n,canvas:s,param:{min:o,max:h},projectionMatrix:c,polygonBox:l,position:u}=i;if(!c)throw new Error(`${t} 不是多边形热力图类型`);const p=this.getById(t),m=null==p?void 0:p.getWorldPosition(new r),g=this.createInitData(),{canvas:x,hmInstance:y}=g;y.renderer.updateConfig({width:s.width,height:s.height});const f=l.getSize(new e);y.setData({max:h,min:o,data:this._formatData_Polygon(a,c,l,this._formatCanvasSize(f.x,f.y),u,m)});const v=n.children[0].material;return this.ssp.render((()=>{const t=new d(x);v.map=t,v.version++})),n}return console.warn(`In soonspacejs: 插件（plugin-heat-map）未找到 id 为 '"${t}"' 的热力图对象!`)}getById(t){return this.ssp.getObjectById(t)}getByName(t){return this.ssp.getObjectByName(t)}removeById(t){return!!this.store.has(t)&&(this.ssp.removeObjectById(t),this.store.delete(t),!0)}createInitData(t){const e=this.hmInstance=new f(t||{});return{hmInstance:e,canvas:e.renderer.canvas}}_formatCanvasSize(t,e){const a=t/e;return t>this.maxCanvasSize&&(e=(t=this.maxCanvasSize)/a),e>this.maxCanvasSize&&(t=a*(e=this.maxCanvasSize)),{width:t,height:e}}_formatData(t,e,a,i){return t.map((t=>Object.assign(Object.assign({},t),{x:Math.trunc((t.x-e.x)/a.width*i.width),y:Math.trunc((t.z-e.z)/a.height*i.height)})))}_formatData_Polygon(t,a,i,n,s,o){const h=s&&o?o.clone().sub(s):new r(0,0,0);return t.map((t=>{const s=new r(t.x,t.y,t.z);s.sub(h),s.applyMatrix4(a);const{x:o,y:d}=i.getParameter(new e(s.x,s.y),new e);return Object.assign(Object.assign({},t),{x:Math.trunc(o*n.width),y:Math.trunc((1-d)*n.height)})}))}}export{w as default};
