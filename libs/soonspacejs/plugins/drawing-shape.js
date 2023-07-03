const s="drawingCanvas",i="drawingPoint",t="drawingLine",e="drawingPolygon",n="drawingCircle";class o{constructor(s){this.ssp=s,this.drawingLayer=21,this.viewport=s.viewport}getFirstIntersect(s,i){const t=(Array.isArray(i)?i:i?[i]:[]).filter((s=>s));this.configLayer(t);const e=this.ssp.viewport.getIntersects(s);return this.recoverLayer(t),e[0]}configLayer(s){var i;const t=null!==(i=this.drawingLayer)&&void 0!==i?i:21,e=this.ssp.viewport.camera;e.oriMask=e.layers.mask,e.layers.enable(t);const n=Array.isArray(s)?s:[s];for(const s of n)s.oriMask=s.layers.mask,s.layers.set(t)}recoverLayer(s){this.drawingLayer;const i=this.ssp.viewport.camera;i.oriMask&&(i.layers.mask=i.oriMask,i.oriMask=void 0);const t=Array.isArray(s)?s:[s];for(const s of t){const i=s.oriMask;i&&(s.layers.mask=i,s.oriMask=void 0)}}drawingPoint(t,e){return new Promise(((n,o)=>{this.clearDrawingCanvas3D();const a=this.ssp.createCanvas3D({id:s,points:[Object.assign(Object.assign({},t),{id:i})]});this.ssp.addObject(a);const c=a.getPoint(i);if(!c)return o();const r=s=>{if(!c)return;const i=this.getFirstIntersect(s,c),t=i?i.point.clone():this.ssp.getPositionByOffset(s);c.setOptions({position:t})},l=s=>{if(h(),!c)return;const i=this.getFirstIntersect(s,c),e=i?i.point.clone():this.ssp.getPositionByOffset(s);c.setOptions({position:e}),n(Object.assign(Object.assign({},t),{position:e.clone()}))},g=()=>{var s;this.clearDrawingCanvas3D(),h(),null===(s=null==e?void 0:e.onCancel)||void 0===s||s.call(e)},p=s=>{if("Escape"===s.code)g()},h=()=>{this.ssp.signals.mouseMove.remove(r),this.ssp.signals.click.remove(l),this.ssp.signals.rightClick.remove(g),this.ssp.signals.keyUp.remove(p)};this.ssp.signals.mouseMove.add(r),this.ssp.signals.click.add(l),this.ssp.signals.rightClick.add(g),this.ssp.signals.keyUp.add(p)}))}drawingLine(i,e){const{offsetY:n=1e-4}=i;return new Promise((o=>{this.clearDrawingCanvas3D();const a=this.ssp.createCanvas3D({id:s,lines:[Object.assign(Object.assign({},i),{points:[],id:t})]});this.ssp.addObject(a);const c=a.getLine(t),r=[],l=s=>{const t=this.getFirstIntersect(s,c),e=t?t.point.clone():this.ssp.getPositionByOffset(s);c&&c.setOptions(Object.assign(Object.assign({},i),{points:[...r,e.clone().setY(e.y+n)]}))},g=s=>{const t=this.getFirstIntersect(s,c),e=t?t.point.clone():this.ssp.getPositionByOffset(s);r.push(e.clone().setY(e.y+n)),c&&c.setOptions(Object.assign(Object.assign({},i),{points:r}))},p=()=>{var s;r.pop(),c&&(c.setOptions(Object.assign(Object.assign({},i),{points:r})),null===(s=null==e?void 0:e.onCancelPrev)||void 0===s||s.call(e))},h=s=>{const t=this.getFirstIntersect(s,c),e=t?t.point.clone():this.ssp.getPositionByOffset(s);r.push(e.clone().setY(e.y+n)),v(),o(Object.assign(Object.assign({},i),{points:r}))},d=s=>{var i;switch(s.code){case"Backspace":p();break;case"Escape":this.clearDrawingCanvas3D(),v(),null===(i=null==e?void 0:e.onCancel)||void 0===i||i.call(e)}},v=()=>{this.ssp.signals.mouseMove.remove(l),this.ssp.signals.click.remove(g),this.ssp.signals.rightClick.remove(p),this.ssp.signals.dblClick.remove(h),this.ssp.signals.keyUp.remove(d)};this.ssp.signals.mouseMove.add(l),this.ssp.signals.click.add(g),this.ssp.signals.rightClick.add(p),this.ssp.signals.dblClick.add(h),this.ssp.signals.keyUp.add(d)}))}drawingPolygon(i,n){const{offsetY:o=1e-4}=i;return new Promise((a=>{this.clearDrawingCanvas3D();const c=this.ssp.createCanvas3D({id:s,polygons:[Object.assign(Object.assign({points:[],yHeight:0},i),{id:e})],lines:[Object.assign(Object.assign({points:[],width:2},i),{id:t})]});this.ssp.addObject(c);const r=c.getPolygon(e),l=c.getLine(t),g=[],p=s=>{var i;const e=this.getFirstIntersect(s,[l,r]),n=e?e.point.clone():this.ssp.getPositionByOffset(s);if(!r)return;const a=[...g,n];a.length>2?c.removeLine(t):null==l||l.setOptions({points:a}),r.setOptions({yHeight:((null===(i=g[0])||void 0===i?void 0:i.y)||n.y)+o,points:a})},h=s=>{var t;const e=this.getFirstIntersect(s,[l,r]),n=e?e.point.clone():this.ssp.getPositionByOffset(s);g.push(n.clone().setY(n.y+o)),r&&r.setOptions(Object.assign(Object.assign({},i),{yHeight:((null===(t=g[0])||void 0===t?void 0:t.y)||0)+o,points:g}))},d=()=>{var s,t;g.pop(),r&&(r.setOptions(Object.assign(Object.assign({},i),{yHeight:((null===(s=g[0])||void 0===s?void 0:s.y)||0)+o,points:g})),null===(t=null==n?void 0:n.onCancelPrev)||void 0===t||t.call(n))},v=s=>{var t;const e=this.getFirstIntersect(s,[l,r]),n=e?e.point.clone():this.ssp.getPositionByOffset(s);g.push(n.clone().setY(n.y+o)),O(),a(Object.assign(Object.assign({},i),{yHeight:((null===(t=g[0])||void 0===t?void 0:t.y)||0)+o,points:g}))},y=s=>{var i;switch(s.code){case"Backspace":d();break;case"Escape":this.clearDrawingCanvas3D(),O(),null===(i=null==n?void 0:n.onCancel)||void 0===i||i.call(n)}},O=()=>{this.ssp.signals.mouseMove.remove(p),this.ssp.signals.click.remove(h),this.ssp.signals.rightClick.remove(d),this.ssp.signals.dblClick.remove(v),this.ssp.signals.keyUp.remove(y)};this.ssp.signals.mouseMove.add(p),this.ssp.signals.click.add(h),this.ssp.signals.rightClick.add(d),this.ssp.signals.dblClick.add(v),this.ssp.signals.keyUp.add(y)}))}drawingCircle(i,t){const{offsetY:e=1e-4}=i;return new Promise((o=>{this.clearDrawingCanvas3D();const a=this.ssp.createCanvas3D({id:s,circles:[Object.assign(Object.assign({},i),{id:n})]});this.ssp.addObject(a);const c=a.getCircle(n);let r,l=100;const g=s=>{if(!c||!r)return;const i=this.getFirstIntersect(s,c),t=i?i.point.clone():this.ssp.getPositionByOffset(s);l=t.distanceTo(r),c.setOptions({position:r,radius:l})},p=s=>{if(!c)return;const t=this.getFirstIntersect(s,c),n=t?t.point.clone():this.ssp.getPositionByOffset(s);r?(v(),l=n.distanceTo(this.ssp.utils.IVector3ToVector3(r)),c.setOptions({position:r,radius:l}),o(Object.assign(Object.assign({},i),{position:r,radius:l}))):r=n.clone().setY(n.y+e)},h=()=>{var s;this.clearDrawingCanvas3D(),v(),null===(s=null==t?void 0:t.onCancel)||void 0===s||s.call(t)},d=s=>{if("Escape"===s.code)h()},v=()=>{this.ssp.signals.mouseMove.remove(g),this.ssp.signals.click.remove(p),this.ssp.signals.rightClick.remove(h),this.ssp.signals.keyUp.remove(d)};this.ssp.signals.mouseMove.add(g),this.ssp.signals.click.add(p),this.ssp.signals.rightClick.add(h),this.ssp.signals.keyUp.add(d)}))}clearDrawingCanvas3D(){this.ssp.removeObjectById(s)}}export{o as default};
