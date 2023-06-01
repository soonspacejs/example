const t="/SceneMetadata.json",a="/db/sign",e="/db/tree_models.json",s="/db/topology_paths.json",o="/db/properties.json",i="/db/animations.json",n="/db/model_visions.json",r="properties";var l;!function(t){t[t.BIDIRECTION=0]="BIDIRECTION",t[t.POSITIVE=1]="POSITIVE",t[t.OPPOSITE=2]="OPPOSITE",t[t.FORBID=3]="FORBID"}(l||(l={}));class c{get path(){return this._path}set path(t){this._path=t}constructor(t){this.ssp=t,this._path="",this.metaData=null,this.treeData=null,this.topologyData=null,this.propertiesData=null,this.animationsData=null,this.modelVisionsData=null}_resolvePath(t){return`${this._path}${t}`}async _fetchData(t){const{utils:a}=this.ssp;return a.fetchFile(this._resolvePath(t),"json")}async fetchMetaData(){return this._fetchData(t)}async fetchTreeData(){return this._fetchData(e)}async fetchTopologyData(){return this._fetchData(s).then((t=>{const a={linkWidth:.1,linkColor:["#00ff00"],nodeRadius:.05,nodeColor:"#0000ff"};return t.map((t=>{const e=Object.assign(Object.assign({},a),t);return e.imgUrl&&(e.imgUrl=`${this.path}${e.imgUrl}`),e}))}))}async fetchPropertiesData(){return this._fetchData(o).then((t=>h(t,"modelId")))}async fetchAnimationsData(){return this._fetchData(i).then((t=>h(t,"modelId")))}async fetchModelVisionsData(){return this._fetchData(n).then((t=>new Map(Object.entries(t))))}async loadObjects(t){if(!this.treeData)return void console.error("treeData is null");const{syncProperties:a}=t,e=async(t,s)=>{const{ssp:o}=this,{THREE:{Matrix4:i}}=o,{id:n,name:l,renderType:c,path:h,matrix:d}=t,p=(new i).fromArray(d);let y=null;if("3D"===c)if(h)try{const a=Object.assign({},t);Reflect.deleteProperty(a,"children");const e=h.replaceAll(/#/g,"%23");y=await o.loadModel({id:n,name:l,url:this._resolvePath(e),userData:a})}catch(t){console.error(t)}else o.utils.warn(`id: ${n} path 为空`);else"GROUP"!==c&&"STUB"!==c||(y=o.createGroup({id:n,name:l,userData:Object.assign({},t)}));if(y&&(p.decompose(y.position,y.quaternion,y.scale),s&&o.addObject(y,s),a&&this.propertiesData)){const t=this.propertiesData.get(n);t&&(y.userData[r]=t)}t.children.length>0&&await Promise.allSettled(t.children.map((t=>e(t,y))))};await Promise.allSettled(this.treeData.map((t=>e(t,null))))}setPath(t){this.path=t}async loadScene(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};t=Object.assign({syncProperties:!0,syncModelVisions:!0,needsModelsBoundsTree:!0},t),await Promise.allSettled([(async()=>{t.syncProperties&&(this.propertiesData=await this.fetchPropertiesData())})(),(async()=>{t.syncModelVisions&&(this.modelVisionsData=await this.fetchModelVisionsData())})()]),this.treeData=await this.fetchTreeData(),await this.loadObjects(t),t.needsModelsBoundsTree&&this.ssp.computeModelsBoundsTree()}async getTopologies(){return this.topologyData=await this.fetchTopologyData(),this.topologyData}async playAnimationById(t){let a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};const{utils:{error:s},animation:o,THREE:i}=this.ssp,{onStart:n,onUpdate:r}=e;this.animationsData||(this.animationsData=await this.fetchAnimationsData());const l=this.ssp.getObjectById(t);if(!l)return void s(`playAnimationById: id 为 ${t} 场景对象未找到`);const c=this.animationsData.get(t);if(c){const e=c[a];if(e)for(let t=0,a=e.keyframes.length;t<a;t++){let a;if(e.keyframes[t-1]){const s=e.keyframes[t-1];a={x:s.x,y:s.y,z:s.z,rotationX:s.rotationX,rotationY:s.rotationY,rotationZ:s.rotationZ,scaleX:s.scaleX,scaleY:s.scaleY,scaleZ:s.scaleZ}}else{const t=new i.Object3D,e=(new i.Matrix4).fromArray(l.userData.matrix);t.applyMatrix4(e),a={x:t.position.x,y:t.position.y,z:t.position.z,rotationX:t.rotation.x,rotationY:t.rotation.y,rotationZ:t.rotation.z,scaleX:t.scale.x,scaleY:t.scale.y,scaleZ:t.scale.z}}const s=e.keyframes[t],{delay:c,duration:h,easing:d,repeat:p,yoyo:y}=s,u={x:s.x,y:s.y,z:s.z,rotationX:s.rotationX,rotationY:s.rotationY,rotationZ:s.rotationZ,scaleX:s.scaleX,scaleY:s.scaleY,scaleZ:s.scaleZ};await o(a,u,{delay:c,duration:h,mode:d,repeat:-1===p?1/0:p,yoyo:y},((t,a)=>{l.position.set(t.x,t.y,t.z),l.rotation.set(t.rotationX,t.rotationY,t.rotationZ),l.scale.set(t.scaleX,t.scaleY,t.scaleZ),null==r||r(t,a)}),(t=>{null==n||n(t)}))}else s(`id: ${t} 未找到索引为 ${a} 的动画`)}else s(`id: ${t} 未找到动画`)}}function h(t,a){const e=new Map;return t.reduce(((t,e)=>{const s=t.get(e[a]);return s?s.push(e):t.set(e[a],[e]),t}),e),e}export{i as ANIMATIONS_DATA_FILE_PATH,t as META_DATA_FILE_PATH,n as MODEL_VISIONS_DATA_FILE_PATH,o as PROPERTIES_DATA_FLEE_PATH,r as PROPERTIES_KEY,a as SIGN_PATH,s as TOPOLOGY_DATA_FILE_PATH,e as TREE_DATA_FILE_PATH,c as default};
