import {generatedMap} from './generated-materials.mjs';
import {createWeatherWorld} from './weather-world.mjs';
import relief from './assets/nature/swiss-relief.mjs';
import {height as swissHeight} from './logic.mjs';
import {createNatureKit} from './nature.mjs';
import * as T from './vendor/three.module.js';
import {SKI_GATES,SKI_LEVELS} from './ski.mjs';
export const snowHeight=(x,d)=>-d*.22+Math.max(0,Math.abs(x)-10)**2*.025+.08*Math.sin(d*.11)*Math.cos(x*.2);
export function createSkiWorld(level,person){
 const scene=new T.Scene();scene.background=new T.Color('#b9d1dc');scene.fog=new T.Fog('#b9d1dc',80,260);const sun=new T.DirectionalLight('#fff4d7',2.4);sun.position.set(-20,40,20);scene.add(sun,new T.HemisphereLight('#fff6e5','#7795ab',2));
 const mats=new Map(),mat=c=>{if(!mats.has(c))mats.set(c,new T.MeshStandardMaterial({color:c,roughness:.85}));return mats.get(c);};
 function mesh(g,c,x,y,z,p=scene){const o=new T.Mesh(g,mat(c));o.position.set(x,y,z);o.receiveShadow=true;p.add(o);return o;}
 function box(w,h,d,c,x,y,z,p=scene){return mesh(new T.BoxGeometry(w,h,d),c,x,y,z,p);}
 const terrain=new T.PlaneGeometry(110,310,70,180);terrain.rotateX(-Math.PI/2);terrain.translate(0,0,-100);const p=terrain.attributes.position,colors=[];for(let i=0;i<p.count;i++){const x=p.getX(i),d=-p.getZ(i);p.setY(i,snowHeight(x,d));terrain.attributes.uv.setXY(i,x/6,d/6);const c=new T.Color(i%4?'#e6edf0':'#d6e4eb');c.multiplyScalar(.97+Math.sin(x*.4+d*.2)*.025);colors.push(c.r,c.g,c.b);}terrain.setAttribute('color',new T.Float32BufferAttribute(colors,3));terrain.computeVertexNormals();const ground=new T.Mesh(terrain,new T.MeshStandardMaterial({vertexColors:true,roughness:.92,map:generatedMap('ride-snow')}));scene.add(ground);
 const gateMeshes=[];for(const [i,g]of SKI_GATES.entries()){const group=new T.Group();group.position.set(g.x,0,-g.distance);scene.add(group);const width=SKI_LEVELS[level].width;for(const side of[-1,1]){const x=side*width,y=snowHeight(g.x+x,g.distance);mesh(new T.CylinderGeometry(.045,.045,2,8),'#3a4e59',x,y+1,0,group);const banner=box(.6,.42,.035,i%2?'#477f9a':'#b75950',x-side*.3,y+1.7,0,group);banner.userData.banner=true;}gateMeshes.push(group);}
 const nature=createNatureKit(scene,[],()=>.47,{height:(x,z)=>snowHeight(x,-z),flowerCount:0,grassCount:0});for(let i=0;i<40;i++){const d=-10+i*5.5,x=(i%2?1:-1)*(15+Math.sin(i*3.2)*2);nature.tree(x,-d,.7+(i%3)*.12);}nature.finishTrees();
 // Retain the project's measured central-Swiss relief as the distant mountain frame.
 const n=relief.size,dem=new T.PlaneGeometry(1,1,n-1,n-1);dem.rotateX(-Math.PI/2);const dp=dem.attributes.position,dc=[],lat=relief.center[0]*Math.PI/180,cx=(relief.center[1]+180)/360*512*256,cy=(1-Math.asinh(Math.tan(lat))/Math.PI)/2*512*256,metres=Math.cos(lat)*40075016.686/(512*256)*.006;
 for(let j=0;j<n;j++)for(let i=0;i<n;i++){const k=j*n+i,x=(267*256+i*4-cx)*metres,z=(179*256+j*4-cy)*metres;dp.setXYZ(k,x,swissHeight(x,z)-15,z-90);const c=new T.Color(relief.elevation[k]>1800?'#d6e2e5':'#9faeb3');dc.push(c.r,c.g,c.b);}
 const originalIndices=[...dem.index.array],indices=[];for(let i=0;i<originalIndices.length;i+=3){const triangle=originalIndices.slice(i,i+3);if(triangle.every(k=>Math.abs(dp.getX(k))>58||dp.getZ(k)<-220||dp.getZ(k)>55))indices.push(...triangle);}dem.setIndex(indices);dem.setAttribute('color',new T.Float32BufferAttribute(dc,3));dem.computeVertexNormals();const mountains=new T.Mesh(dem,new T.MeshStandardMaterial({vertexColors:true,roughness:1}));mountains.userData.kind='swiss-dem';scene.add(mountains);
 for(const x of[-7,7])mesh(new T.CylinderGeometry(.10,.10,3.2,10),'#897960',x,snowHeight(x,190)+1.6,-190);box(14,.8,.1,'#416779',0,snowHeight(0,190)+2.7,-190);
 const skier=person.clone(true);scene.add(skier);skier.visible=false;const skis=new T.Group();scene.add(skis);for(const x of[-.2,.2]){const ski=box(.18,.06,2.3,'#b05d44',x,.05,0,skis);const tip=mesh(new T.SphereGeometry(.1,10,8),'#b05d44',x,.13,-1.07,skis);tip.scale.set(.9,.4,1.5);}
 // New gear is independent of the borrowed character's shared GPU resources.
 const helmet=mesh(new T.SphereGeometry(.24,16,12),'#a06d3e',0,1.77,0);helmet.scale.set(1,.72,1);helmet.visible=false;
 const backdrop=new T.Mesh(new T.PlaneGeometry(380,145),new T.MeshBasicMaterial({map:generatedMap('winter-panorama'),color:'#ffffff',fog:false}));backdrop.position.set(0,0,-330);backdrop.material.userData.nightBackdrop=true;scene.add(backdrop);const weather=createWeatherWorld(scene,{compact:typeof innerWidth!=='undefined'&&innerWidth<700,region:'ski'});
 return{scene,skier,gateMeshes,
 sync(c,environment=null,dt=0){if(environment)weather.step(dt,environment,new T.Vector3(c.x,snowHeight(c.x,c.distance),-c.distance),false);const y=snowHeight(c.x,c.distance);skier.position.set(c.x,y+.12,-c.distance);skier.rotation.set(-.12,Math.PI,-c.vx*.035);skis.position.set(c.x,y+.09,-c.distance);skis.rotation.set(-Math.atan(.22),-c.vx*.035,0);helmet.position.set(c.x,y+1.91,-c.distance);for(let i=0;i<gateMeshes.length;i++)gateMeshes[i].visible=i>=c.results.length;},
 dispose(){scene.remove(skier);const gs=new Set(),ms=new Set();scene.traverse(o=>{if(o.geometry)gs.add(o.geometry);if(o.material)ms.add(o.material);});gs.forEach(g=>g.dispose());const textures=new Set();ms.forEach(m=>{for(const v of Object.values(m))if(v?.isTexture)textures.add(v);m.dispose();});textures.forEach(t=>t.dispose());scene.clear();}
 };
}
