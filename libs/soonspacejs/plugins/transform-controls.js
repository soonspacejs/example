import{TransformControls as t}from"three/examples/jsm/controls/TransformControls.js";class s{constructor(t){this.ssp=t,this.control=null,this.options=null}start(s,o={}){const{mode:n="translate",onUpdate:e,onDragStart:l,onDragEnd:i}=o;return this.options=o,this.control=new t(this.ssp.viewport.camera,this.ssp.viewport.rendererManager.interactiveContainer),this.control.attach(s),this.control.setMode(n),this.control.addEventListener("dragging-changed",(t=>{this.ssp.controls.enabled=!t.value,t.value?null==l||l(s):null==i||i(s)})),this.control.addEventListener("objectChange",(()=>{null==e||e(s),this.ssp.signals.objectChanged.dispatch(s)})),this.ssp.viewport.scene.add(this.control),this.ssp.render(),this.control}close(){var t,s;this.control&&(this.ssp.removeObject(this.control),this.control.detach(),this.control.dispose(),this.control=null,null===(s=null===(t=this.options)||void 0===t?void 0:t.onClose)||void 0===s||s.call(t))}changeMode(t){var s,o;t&&(null===(o=null===(s=this.control)||void 0===s?void 0:s.setMode)||void 0===o||o.call(s,t),this.ssp.signals.objectChanged.dispatch())}}export{s as default};
