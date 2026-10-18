import {inEstatePlot} from './estate-plots.mjs';
import * as T from './vendor/three.module.js';
import {leafBlade} from './botanical-mesh.mjs';
import {generatedMap,cutoutLeaf} from './generated-materials.mjs';
export const ORCHARD_SITES=[[-27,0],[-27,8],[-31,20],[-1,20],[-26,-4],[-32,16],[-28,21],[-21,23],[-12,23],[1,13],[3,21]];
export const GROVE_SITES=[[-33,-14],[-30,-15],[-35,-18],[-37,-23],[-5,-26],[-2,-28],[1,-27],[9,-27],[12,-29],[15,-28]];
export const FRUIT_SPECIES=['Apfel','Zwetschge','Kirsche'];
export function createAutumnOrchard(scene,height,colliders,animated,options={}){
 const group=new T.Group();group.userData.kind='autumn-fruit-orchard';scene.add(group);const sites=options.grove?GROVE_SITES:ORCHARD_SITES;group.userData.species=options.grove?['Bergahorn','Buche','Birke','Hainbuche']:FRUIT_SPECIES;let seed=options.grove?771:4611;const rnd=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
 const wood=new T.MeshStandardMaterial({color:'#75604a',roughness:1}),foliage=new T.MeshStandardMaterial({color:'#ffffff',roughness:.95,side:T.DoubleSide}),leafMatrices=[],leafColours=[],leafKinds=[],fruits=[],fruitColours=[];
 const branchMatrices=[];function branch(a,b,r1,r2){const u=new T.Vector3(...a),v=new T.Vector3(...b),d=v.clone().sub(u),pose=new T.Object3D();pose.position.copy(u.add(v).multiplyScalar(.5));pose.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),d.clone().normalize());pose.scale.set(r1,d.length(),r1);pose.updateMatrix();branchMatrices.push(pose.matrix.clone());}
 const pose=new T.Object3D();
 for(let tree=0;tree<sites.length;tree++){
  const [x,z]=sites[tree];if(inEstatePlot(x,z,1))continue;const y=height(x,z),twist=tree*1.7;const species=tree%3;const crownScale=options.grove?1.3:species===1?.8:species===2?1.15:1;group.userData.kind=options.grove?'autumn-uphill-grove':'autumn-fruit-orchard';branch([x,y-.08,z],[x+.08,y+1.7,z-.04],.16,.09);branch([x+.08,y+1.7,z-.04],[x-.06,y+3.0,z+.09],.09,.032);colliders.push({type:'circle',x,z,r:.2});
  for(let limb=0;limb<6;limb++){const a=limb/6*Math.PI*2+twist,start=[x+.04,y+1.35+limb*.18,z],middle=[x+Math.cos(a)*.75,y+2.05+limb*.15,z+Math.sin(a)*.75],tip=[x+Math.cos(a)*1.45*crownScale,y+2.75+limb*.13,z+Math.sin(a)*1.45*crownScale];branch(start,middle,.075,.044);branch(middle,tip,.044,.017);
   for(const side of[-1,1]){const angle=a+side*.54,end=[tip[0]+Math.cos(angle)*.5,tip[1]+.28+rnd()*.2,tip[2]+Math.sin(angle)*.5];branch(middle,end,.025,.008);
    for(let j=0;j<42;j++){const t=.25+rnd()*.8,xx=middle[0]+(end[0]-middle[0])*t+(rnd()-.5)*.7,yy=middle[1]+(end[1]-middle[1])*t+(rnd()-.5)*.6,zz=middle[2]+(end[2]-middle[2])*t+(rnd()-.5)*.7;pose.position.set(xx,yy,zz);pose.rotation.set(rnd()*2-.6,rnd()*6.28,rnd()*1.8);pose.scale.setScalar(.7+rnd()*.8);pose.updateMatrix();leafMatrices.push(pose.matrix.clone());leafKinds.push(options.grove?tree%4:species);leafColours.push((options.grove?['#d6a84a','#c77435','#e2b95c','#ae663b','#ba8d43']:species===1?['#8b904e','#a59046','#c29c49']:species===2?['#bc6739','#c99042','#b6a050']:['#82904d','#b6a14b','#c28d3e','#70854a'])[Math.floor(rnd()*5)]);}
    if(!options.grove&&limb%2===0){pose.position.set(end[0]-.1,end[1]-.28,end[2]);pose.rotation.set(.1,rnd()*6.28,0);pose.scale.set(species===2?.045:.085,species===1?.12:species===2?.045:.083,species===1?.06:species===2?.045:.08);pose.updateMatrix();fruits.push(pose.matrix.clone());fruitColours.push(species===1?'#655180':species===2?'#923d34':tree%2?'#d5b25b':'#b55137');}
   }
  }
 }
 const limbs=new T.InstancedMesh(new T.CylinderGeometry(.35,1,1,9,2),wood,branchMatrices.length);branchMatrices.forEach((m,i)=>limbs.setMatrixAt(i,m));limbs.castShadow=limbs.receiveShadow=true;group.add(limbs);
 const clock={value:0};const breeze=shader=>{shader.uniforms.orchardTime=clock;shader.vertexShader='uniform float orchardTime;\n'+shader.vertexShader;shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\n#ifdef USE_INSTANCING\ntransformed.x+=sin(orchardTime*1.8+instanceMatrix[3][0]*.7+instanceMatrix[3][2])*.018*position.z;\n#endif');};
 for(let kind=0;kind<(options.grove?4:3);kind++){const map=generatedMap(options.grove?'autumn-leaves':'orchard-leaves',kind),material=foliage.clone();if(map){material.map=map;material.alphaTest=.45;material.alphaToCoverage=true;}material.onBeforeCompile=breeze;material.customProgramCacheKey=()=> 'autumn-cutout-leaf-breeze-v2';const indices=leafKinds.map((k,i)=>k===kind?i:-1).filter(i=>i>=0),leaves=new T.InstancedMesh(map?cutoutLeaf(options.grove?.38:.31,options.grove?.32:.2):leafBlade(options.grove?.33:.26,options.grove?.16:.1),material,indices.length);indices.forEach((i,j)=>{leaves.setMatrixAt(j,leafMatrices[i]);leaves.setColorAt(j,new T.Color(map?'#ffffff':leafColours[i]));});leaves.castShadow=leaves.receiveShadow=true;leaves.userData.kind='individual-autumn-fruit-leaves';leaves.userData.botanicalTile=kind;group.add(leaves);}
 animated.push(t=>clock.value=t);
 const appleGeo=new T.SphereGeometry(1,12,8),p=appleGeo.attributes.position;for(let i=0;i<p.count;i++){const y=p.getY(i);p.setY(i,y-(y>.6?.12*Math.pow(y,3):0));}appleGeo.computeVertexNormals();const apples=new T.InstancedMesh(appleGeo,new T.MeshStandardMaterial({color:'#ffffff',roughness:.48}),fruits.length);fruits.forEach((m,i)=>{apples.setMatrixAt(i,m);apples.setColorAt(i,new T.Color(fruitColours[i]));});apples.castShadow=true;apples.userData.kind='orchard-apples';apples.userData.species=FRUIT_SPECIES;group.add(apples);

 group.userData.sites=sites.map(([x,z])=>({x,z}));group.userData.trees=sites.length;return group;
}
