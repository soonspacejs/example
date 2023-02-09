import{Box3 as t,Vector3 as e,Matrix4 as s,Raycaster as i}from"soonspacejs";function n(i,n){const a=function(i){const n=new t,a=n.min.clone(),o=n.max.clone();if(n.setFromObject(i),n.min.equals(a)&&n.max.equals(o)){const t=new e;i.getWorldPosition(t),n.min.copy(t),n.max.copy(t)}if(i.isInstancedMesh){const{count:t,matrixWorld:e,geometry:a}=i;let o=a.boundingBox;if(o||(a.computeBoundingBox(),o=a.boundingBox),o){const a=e.clone();for(let e=0;e<t;e++){const t=new s;i.getMatrixAt(e,t),t.premultiply(a);const h=o.clone();h.applyMatrix4(a),n.union(h)}}}return n}(n);return i.intersectsBox(a)}function a(t,e){t.disableAll();for(const s of e)t.enable(s)}let o=performance.now();let h;class r{get camera(){let t=this._camera;return t||(t=this._camera=this.viewport.cameraManager.createCamera("firstPersonCamera"),this.isExternalCamera=!1),t}set camera(t){this._camera=t,this.isExternalCamera=!0}get rotate(){return this._rotate&&(this.horizontalRotate||this.verticalRotate)}set rotate(t){this._rotate=t}constructor(t,e){this._camera=null,this.isExternalCamera=!1,this.gravitySpeed=10,this.jumpOffset=0,this.clashCheckDistance=200,this.clashDistance=50,this.reverseRotate=!1,this._rotate=!0,this.horizontalRotate=!0,this.verticalRotate=!0,this._touch=null,this.searchRadiusFactor=3,this.checkedObjects=null,this.sceneObjectsChanged=()=>{this.checkedObjects=null},this.gravitySearchFactor=3,this.gravityCheckedObjects=null,this.gravityInterObject=null,this.kneeInterObject=null,this.eyeInterObject=null,this.hasUpdated=!1,this.ssp=t,this._camera=null!=e?e:null,this.viewport=t.viewport,this.enabled=!1,this.rotationAngle={min:-Math.PI/2,max:Math.PI/2},this.state={moveForward:!1,moveBackward:!1,moveLeft:!1,moveRight:!1,moveUp:!1,moveDown:!1,canJump:!1,canRotate:!1},this.moveSpeed=10,this.eyeHeight=160,this.kneeHeight=50,this.jumpHeight=110,this.enableClash=!0,this.enableGravity=!0,this.onKeyDown=this.onKeyDown.bind(this),this.onKeyUp=this.onKeyUp.bind(this),this.onMouseDown=this.onMouseDown.bind(this),this.onMouseUp=this.onMouseUp.bind(this),this.onMouseMove=this.onMouseMove.bind(this),this.onTouchStart=this.onTouchStart.bind(this),this.onTouchMove=this.onTouchMove.bind(this),this.onTouchEnd=this.onTouchEnd.bind(this);const s=this.ssp.THREE,{Vector3:i,Sphere:n,Vector2:a,Box3:o}=s;this.velocity=new i,this.vector=new i,this.movement=new a,this.lastDirection=new i,this.checkedSphere=new n,this.gravityCheckedBox=new o}onKeyDown(t){if(!1!==this.enabled){switch(t.code){case"ArrowUp":case"KeyW":this.state.moveForward=!0;break;case"ArrowLeft":case"KeyA":this.state.moveLeft=!0;break;case"ArrowDown":case"KeyS":this.state.moveBackward=!0;break;case"ArrowRight":case"KeyD":this.state.moveRight=!0;break;case"KeyI":this.state.canRotate=!0,this.movement.x=0,this.movement.y=-10;break;case"KeyJ":this.state.canRotate=!0,this.movement.x=-10,this.movement.y=0;break;case"KeyK":this.state.canRotate=!0,this.movement.x=0,this.movement.y=10;break;case"KeyL":this.state.canRotate=!0,this.movement.x=10,this.movement.y=0;break;case"KeyQ":this.state.moveUp=!0;break;case"KeyE":this.state.moveDown=!0;break;case"Space":!0===this.state.canJump&&(this.jumpOffset+=3*this.jumpHeight),this.state.canJump=!1}(this.jumpOffset||Object.values(this.state).some((t=>t)))&&this.needsUpdate()}}onKeyUp(t){if(!1!==this.enabled)switch(t.code){case"ArrowUp":case"KeyW":this.state.moveForward=!1;break;case"ArrowLeft":case"KeyA":this.state.moveLeft=!1;break;case"ArrowDown":case"KeyS":this.state.moveBackward=!1;break;case"ArrowRight":case"KeyD":this.state.moveRight=!1;break;case"KeyI":case"KeyJ":case"KeyK":case"KeyL":this.state.canRotate=!1;break;case"KeyQ":this.state.moveUp=!1;break;case"KeyE":this.state.moveDown=!1}}onMouseDown(t){this.state.canRotate=!0}onMouseUp(t){this.state.canRotate=!1}onMouseMove(t){if(this.enabled&&this.state.canRotate){let e=t.movementY,s=t.movementX;0===s&&(t.clientX<20?s=-10:t.clientX>this.viewport.interactiveContainer.clientWidth-20&&(s=10)),this.reverseRotate&&(s=-s,e=-e),this.movement.x=s,this.movement.y=e,this.needsUpdate()}}onTouchStart(t){this._touch=t.targetTouches[0],this._touch&&(this.state.canRotate=!0)}onTouchEnd(t){const e=this._touch;if(!e)return;if(t.targetTouches.length>0){if(!Array.from(t.targetTouches).find((t=>t.identifier===e.identifier)))return}this._touch=null,this.state.canRotate=!1}onTouchMove(t){const e=this._touch;if(!e)return;const s=Array.from(t.targetTouches).find((t=>t.identifier===e.identifier));if(!s)return;if(!this.enabled||!this.state.canRotate)return;let i=s.screenX-e.screenX,n=s.screenY-e.screenY;0===i&&(s.clientX<20?i=-10:s.clientX>this.viewport.interactiveContainer.clientWidth-20&&(i=10)),this.reverseRotate&&(i=-i,n=-n),this.movement.x=i,this.movement.y=n,this._touch=s,this.needsUpdate()}clearClashCache(){this.kneeInterObject=null,this.eyeInterObject=null}onClashCheck(t,e){const s=e.length(),n=e.clone().divideScalar(s);n.distanceToSquared(this.lastDirection)>1e-9&&this.clearClashCache(),this.lastDirection=n;const o=this.ssp.THREE,{eyeHeight:h,kneeHeight:r,camera:c,clashCheckDistance:l,clashDistance:m,clashLayers:u}=this;let{kneeInterObject:d,eyeInterObject:p}=this;if(!d){const e=t.clone().setY(t.y-h+r),s=new i(e,n,0,l);s.firstHitOnly=!0,null!=u&&a(s.layers,u),s.camera=c;const o=this.getCheckedObjects(e),m=s.intersectObjects(o);this.kneeInterObject=d=m[0]}let v=-s;if(d&&(v+=d.distance,v<m))return!0;if(!p){const e=new o.Raycaster(t,n,0,l);e.firstHitOnly=!0,null!=u&&a(e.layers,u),e.camera=c;const s=this.getCheckedObjects(t),i=e.intersectObjects(s);this.eyeInterObject=p=i[0]}let y=-s;if(p){if(y+=p.distance,y<m)return!0;p.distance=y}return d&&(d.distance=v),!1}getCheckedObjects(t){const{clashDistance:e,clashCheckDistance:s,searchRadiusFactor:i,clashFilter:a}=this,o=s*i,h=this.checkedSphere,r=o+e;h.set(t,r);const c=null!=a?a:function(){return!0};return this.viewport.scener.intersectsList.getAll().filter((t=>!!c(t)&&n(h,t)))}getGravityCheckedObjects(t,s){const i=this.gravityCheckedBox;let a=this.gravityCheckedObjects;if(a){const e=t.clone();e.y=s,i.containsPoint(t)&&i.containsPoint(e)||(a=null)}if(!a){const{eyeHeight:s,clashCheckDistance:o,gravitySearchFactor:h,clashDistance:r,clashFilter:c}=this,l=o+r,m=new e(l,l,0),u=t.clone().add(m),d=t.clone().sub(m);d.y-=s*h,i.set(d,u);const p=this.viewport.scener.intersectsList.getAll(),v=null!=c?c:function(){return!0};this.checkedObjects=a=p.filter((t=>!!v(t)&&n(i,t)))}return a}gravityClashCheck(t,s){var n;let o=this.gravityInterObject;if(o){const{Vector3:e,Matrix4:s}=this.ssp.THREE,{object:i,face:a,instanceId:h}=o,r=null===(n=i.geometry)||void 0===n?void 0:n.getAttribute("position");if(r&&a){let n=o.facePoints;if(!n){let t=i.matrixWorld;if(null!=h){const e=new s;i.getMatrixAt(h,e),t=e.premultiply(t)}const{a:c,b:l,c:m}=a,u=new e(r.getX(c),r.getY(c),r.getZ(c));u.applyMatrix4(t),u.setY(0);const d=new e(r.getX(l),r.getY(l),r.getZ(l));d.applyMatrix4(t),d.setY(0);const p=new e(r.getX(m),r.getY(m),r.getZ(m));p.applyMatrix4(t),p.setY(0),o.facePoints=n=[u,d,p]}let c=n[2],l=null;const m=t.clone();m.y=0;n.every((t=>{const e=t.clone();e.sub(c);const s=m.clone();if(s.sub(c),e.cross(s),l){if(e.dot(l)<=0)return!1}return l=e,c=t,!0}))||(this.gravityInterObject=o=null)}}if(!o){const n=new i(t,new e(0,-1,0));n.firstHitOnly=!0;const h=this.clashLayers;null!=h&&a(n.layers,h),n.camera=this.camera;const r=this.getGravityCheckedObjects(t,s),c=n.intersectObjects(r);this.gravityInterObject=o=c[0]}return o}setOptions(t){const{position:s,rotation:i,moveSpeed:n,eyeHeight:a,kneeHeight:o,jumpHeight:h,enableClash:r,enableGravity:c,searchRadiusFactor:l,clashDistance:m,clashCheckDistance:u,gravitySpeed:d,gravitySearchFactor:p,reverseRotate:v,rotate:y,horizontalRotate:g,verticalRotate:b,clashFilter:w,clashLayers:f}=t;if(a){const t=this.eyeHeight;this.eyeHeight=a;const s=null==t?a:a-t;this.camera.position.add(new e(0,s,0))}o&&(this.kneeHeight=o),h&&(this.jumpHeight=h),l&&(this.searchRadiusFactor=l),m&&(this.clashDistance=m),u&&(this.clashCheckDistance=u),d&&(this.gravitySpeed=d),p&&(this.gravitySearchFactor=p),null!=v&&(this.reverseRotate=v),null!=y&&(this.rotate=y),null!=g&&(this.horizontalRotate=g),null!=b&&(this.verticalRotate=b),null!=r&&(this.enableClash=r),null!=c&&(this.enableGravity=c),null!=w&&(this.clashFilter=w),null!=f&&(this.clashLayers=f),s&&this.camera.position.set(s.x,s.y+this.eyeHeight,s.z),i&&this.camera.rotation.set(i.x,i.y,i.z),n&&(this.moveSpeed=n),this.ssp.signals.cameraChange.dispatch(this.camera.position.clone())}start(t){h=this.ssp.getCameraViewpoint(),this.viewport.controls.currentControls.enabled=!1,this.enabled=!0,this.isExternalCamera||this.viewport.cameraManager.setCurrentCamera(this.camera),this.setOptions(t),this.viewport.postRender.set("FirstPersonControls",this.update.bind(this)),this.ssp.signals.mouseDown.add(this.onMouseDown),this.ssp.signals.mouseUp.add(this.onMouseUp),this.ssp.signals.mouseMove.add(this.onMouseMove),this.ssp.signals.keyDown.add(this.onKeyDown),this.ssp.signals.keyUp.add(this.onKeyUp);const e=this.ssp.viewport.container;e.addEventListener("touchstart",this.onTouchStart),e.addEventListener("touchmove",this.onTouchMove),e.addEventListener("touchend",this.onTouchEnd),this.ssp.signals.objectAdded.add(this.sceneObjectsChanged),this.ssp.signals.objectRemoved.add(this.sceneObjectsChanged)}stop(){h&&this.ssp.setCameraViewpoint(h),this.viewport.controls.currentControls.enabled=!0,this.enabled=!1,this.isExternalCamera||this.viewport.cameraManager.setCurrentCamera(this.viewport.cameraManager.getMainCamera()),this.viewport.postRender.delete("FirstPersonControls"),this.ssp.signals.mouseDown.remove(this.onMouseDown),this.ssp.signals.mouseUp.remove(this.onMouseUp),this.ssp.signals.mouseMove.remove(this.onMouseMove),this.ssp.signals.keyDown.remove(this.onKeyDown),this.ssp.signals.keyUp.remove(this.onKeyUp);const t=this.ssp.viewport.container;t.removeEventListener("touchstart",this.onTouchStart),t.removeEventListener("touchmove",this.onTouchMove),t.removeEventListener("touchend",this.onTouchEnd),this.ssp.signals.objectAdded.remove(this.sceneObjectsChanged),this.ssp.signals.objectRemoved.remove(this.sceneObjectsChanged),this.needsUpdate()}needsUpdate(){this.hasUpdated&&(this.hasUpdated=!1,o=performance.now(),this.ssp.signals.cameraChange.dispatch(this.camera.position.clone()))}update(){if(!this.enabled)return;const t=performance.now(),e=(t-o)/1e3;o=t;const s=this.ssp.THREE,{Vector3:i}=s,n=new s.Vector3,{state:a,camera:h,eyeHeight:r,kneeHeight:c}=this,l=20*this.moveSpeed,m=20*this.gravitySpeed,{position:u,quaternion:d}=h;let p=0,v=!1;a.moveForward&&(n.z-=l),a.moveBackward&&(n.z+=l),a.moveLeft&&(n.x-=l),a.moveRight&&(n.x+=l),a.moveUp&&(p+=l),a.moveDown&&(p-=l),n.multiplyScalar(e);const y=new s.Euler(0,0,0,"YXZ");y.setFromQuaternion(d);const{x:g,y:b}=this.movement,w=this.horizontalRotate&&0!==g,f=this.verticalRotate&&0!==b;if(this.rotate&&a.canRotate&&(w||f)){f&&(y.x-=.003*b),w&&(y.y-=.003*g);const{max:t,min:e}=this.rotationAngle;y.x=Math.min(t,Math.max(y.x,e)),h.quaternion.setFromEuler(y),v=!0}const C=this.jumpOffset+p*e;if(0!==y.y&&!n.equals(new i)){const t=new s.Quaternion;t.setFromAxisAngle(new i(0,1,0),y.y),n.applyQuaternion(t)}const k=u.clone();if((C||!n.equals(new i))&&(n.y+=C,!this.onClashCheck(u,n)&&(k.add(n),this.gravityInterObject))){const t=this.gravityInterObject.point.clone().sub(k);t.y=0,t.length()>c&&(this.gravityInterObject=null)}let j=k.y;if(this.enableGravity){const t=j;j-=m*e,a.canJump=!1;const s=this.gravityClashCheck(k,j);if(s){const t=s.point.y+r;j<t&&(j=t,a.canJump=!0)}t!==j&&this.clearClashCache()}k.y=j;const R=!u.equals(k);R&&h.position.copy(k),this.jumpOffset=0,(R||v)&&this.ssp.signals.cameraChange.dispatch(this.camera.position.clone()),this.hasUpdated=!0}}export{r as default};
