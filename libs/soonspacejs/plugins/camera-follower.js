const t="cameraFollower",a={position:{x:0,y:0,z:0},rotation:{x:0,y:0,z:0}};class e{constructor(t){this.ssp=t}start(e){let r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:a;if(!e)return;const{cameraManager:o}=this.ssp.viewport,s=o.createCamera(t);o.setCurrentCamera(s);const{position:n={x:0,y:0,z:0},rotation:i={x:0,y:0,z:0}}=r;s.position.set(n.x,n.y,n.z),s.rotation.set(i.x,i.y,i.z),e.add(s)}stop(){const{cameraManager:a}=this.ssp.viewport,e=a.getMainCamera();a.setCurrentCamera(e),a.removeCamera(t)}}export{e as default};
