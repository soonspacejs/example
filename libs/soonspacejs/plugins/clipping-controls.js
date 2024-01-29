import e from"soonspacejs";import{Vector3 as s,Plane as i,Box3 as n}from"three";class a{constructor(e){this.ssp=e,this.scenePlaneHelpers={x:null,y:null,z:null,"-x":null,"-y":null,"-z":null}}addPlaneHelper(e,s,i){const n=this.ssp.addPlaneHelper(Object.assign(Object.assign({},s),{opacity:.3}));this.scenePlaneHelpers[e]=n,i&&this.ssp.addObject(n,i)}sceneClipping(n){var a,l,r;const{axis:t,clipPoint:o,isForward:p=!0,openHelper:c=!0}=n,d=p?t:`-${t}`,h=p?o-1:1-o,w=`scene_clippingPlaneHelper_${d}`;if(c)if(this.scenePlaneHelpers[d])switch(d){case"x":null===(a=this.scenePlaneHelpers[d])||void 0===a||a.position.setX(h);break;case"y":null===(l=this.scenePlaneHelpers[d])||void 0===l||l.position.setY(h);break;case"z":null===(r=this.scenePlaneHelpers[d])||void 0===r||r.position.setZ(h)}else{const i=e.utils.getBoundingBox(this.ssp.viewport.scene),n=i.getSize(new s);let a=0,l=0,r="green";const o=i.getCenter(new s).clone(),p={x:0,y:0,z:0};switch(t){case"x":a=n.z,l=n.y,r="green",o.x=h,p.y=Math.PI/2;break;case"y":a=n.x,l=n.z,r="blue",o.y=h,p.x=Math.PI/2;break;case"z":a=n.x,l=n.y,o.z=h,r="red"}this.addPlaneHelper(d,{id:w,width:a,height:l,color:r,position:o,rotation:p})}else this.scenePlaneHelpers[d]&&(this.ssp.removeHelperById(w),this.scenePlaneHelpers[d]=null);const x={x:new s(-1,0,0),"-x":new s(1,0,0),y:new s(0,-1,0),"-y":new s(0,1,0),z:new s(0,0,-1),"-z":new s(0,0,1)},g=x[d][t],y=this.ssp.viewport.renderer.clippingPlanes.find((e=>e.normal[t]===g));if(y)y.constant=o;else{this.ssp.viewport.renderer.clippingPlanes.push(new i(x[d],o))}this.ssp.signals.sceneChanged.dispatch()}removeSceneClipping(e,s=!0){const i=e?[{axis:e,isForward:s}]:[{axis:"x",isForward:!0},{axis:"x",isForward:!1},{axis:"y",isForward:!0},{axis:"y",isForward:!1},{axis:"z",isForward:!0},{axis:"z",isForward:!1}];for(const{axis:e,isForward:s}of i){const i=s?-1:1,n=s?e:`-${e}`,a=this.ssp.viewport.renderer.clippingPlanes,l=a.findIndex((s=>s.normal[e]===i));a.splice(l,1);const r=`scene_clippingPlaneHelper_${n}`;this.ssp.removeHelperById(r),this.scenePlaneHelpers[n]=null}this.ssp.signals.sceneChanged.dispatch()}modelClipping(e,a){const{axis:l,clipPercent:r,isForward:t=!0,openHelper:o=!0}=a,p=t?l:`-${l}`,c=(new n).setFromObject(e);c.max.add(new s(2,2,2)),c.min.sub(new s(2,2,2));const d=c.getSize(new s),h=t?c.max[l]-r/100*d[l]+1:c.min[l]+r/100*d[l]-1,w=t?h+1:h-1,x=`model_${e.sid}_clippingPlaneHelper_${p}`,g=this.ssp.getObjectById(x);if(o)if(g)switch(l){case"x":null==g||g.position.setX(w);break;case"y":null==g||g.position.setY(w);break;case"z":null==g||g.position.setZ(w)}else{const e=c.getSize(new s);let i=0,n=0,a="green";const r=c.getCenter(new s).clone(),t={x:0,y:0,z:0};switch(l){case"x":i=e.z,n=e.y,a="green",r.x=w,t.y=Math.PI/2;break;case"y":i=e.x,n=e.z,a="blue",r.y=w,t.x=Math.PI/2;break;case"z":i=e.x,n=e.y,r.z=w,a="red"}this.addPlaneHelper(p,{id:x,width:i,height:n,color:a,position:r,rotation:t})}else g&&this.ssp.removeObjectById(x);const y={x:new s(-1,0,0),y:new s(0,-1,0),z:new s(0,0,-1),"-x":new s(1,0,0),"-y":new s(0,1,0),"-z":new s(0,0,1)},P=y[p][l];e.traverse((e=>{if(e.material){const s=e,n=e=>{e.clippingPlanes||(e.clippingPlanes=[]);const s=e.clippingPlanes.find((e=>e.normal[l]===P));if(s)s.normal=y[p],s.constant=h,t||s.negate();else{const s=new i(y[p],h);t||s.negate(),e.clippingPlanes.push(s)}};Array.isArray(s.material)?s.material.forEach((e=>n(e))):n(s.material)}})),this.ssp.signals.sceneChanged.dispatch()}removeModelClipping(e,s,i=!0){const n=e=>{if(s){if(e.clippingPlanes){const i=e.clippingPlanes.findIndex((e=>1===Math.abs(e.normal[s])));e.clippingPlanes.splice(i,1)}}else e.clippingPlanes=[]};e.traverse((e=>{if(e.material){const s=e;Array.isArray(s.material)?s.material.forEach((e=>n(e))):n(s.material)}}));const a=s?[{axis:s,isForward:i}]:[{axis:"x",isForward:!0},{axis:"x",isForward:!1},{axis:"y",isForward:!0},{axis:"y",isForward:!1},{axis:"z",isForward:!0},{axis:"z",isForward:!1}];for(const{axis:s,isForward:i}of a){const n=i?s:`-${s}`,a=`model_${e.sid}_clippingPlaneHelper_${n}`;this.ssp.removeHelperById(a)}this.ssp.signals.sceneChanged.dispatch()}}export{a as default};
