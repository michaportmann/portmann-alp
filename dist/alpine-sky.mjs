import * as T from './vendor/three.module.js';
// A quiet, distant daylight sky. This sphere never writes depth or casts shadows.
export function createAlpineSky(scene){
 const c=document.createElement('canvas');c.width=2048;c.height=1024;const ct=c.getContext('2d');
 const gradient=ct.createLinearGradient(0,0,0,700);gradient.addColorStop(0,'#6d95bb');gradient.addColorStop(.32,'#a7c2d5');gradient.addColorStop(.73,'#eadbc0');gradient.addColorStop(1,'#e9d8ba');ct.fillStyle=gradient;ct.fillRect(0,0,c.width,c.height);
 let seed=814;const rnd=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
 for(let cluster=0;cluster<13;cluster++){const x=80+rnd()*1870,y=230+rnd()*190;for(let j=0;j<8;j++){const xx=x+(rnd()-.5)*150,yy=y+(rnd()-.5)*30,r=15+rnd()*35,g=ct.createRadialGradient(xx,yy,0,xx,yy,r);g.addColorStop(0,'rgba(255,253,245,.23)');g.addColorStop(.55,'rgba(255,253,245,.13)');g.addColorStop(1,'rgba(255,253,245,0)');ct.fillStyle=g;ct.fillRect(xx-r,yy-r,2*r,2*r);}}
 const map=new T.CanvasTexture(c);map.colorSpace=T.SRGBColorSpace;map.wrapS=T.RepeatWrapping;
 const sky=new T.Mesh(new T.SphereGeometry(540,48,24),new T.MeshBasicMaterial({map,side:T.BackSide,depthWrite:false,fog:false,toneMapped:false}));sky.userData.kind='alpine-daylight-sky';sky.renderOrder=-1000;sky.frustumCulled=false;scene.add(sky);return sky;
}
