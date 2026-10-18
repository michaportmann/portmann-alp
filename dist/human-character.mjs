import {createHikingMotion} from './character-motion.mjs';
import * as T from './vendor/three.module.js';
import {CHARACTER_CHOICES} from './character-profiles.mjs';
export {CHARACTER_CHOICES};
export function createHumanCharacter(initial='man',customProfile=null){
 const g=new T.Group(),legs=[],arms=[],knees=[],elbows=[],ankles=[];g.userData.kind='organic-person';let model=null,upperBody=null,headPose=null,appearance='',bodyHeight=1.82,modelScale=1,previousRoot=null,lastPose=null;const motion=createHikingMotion();
 function setAppearance(id){
  if(!CHARACTER_CHOICES.some(c=>c.id===id))id='man';if(id===appearance)return;
  if(model){g.remove(model);const geometries=new Set(),materials=new Set();model.traverse(o=>{if(o.isMesh){geometries.add(o.geometry);materials.add(o.material);}});geometries.forEach(x=>x.dispose());materials.forEach(x=>x.dispose());}
  appearance=id;model=new T.Group();g.add(model);legs.splice(0);arms.splice(0);knees.splice(0);elbows.splice(0);ankles.splice(0);motion.reset();previousRoot=null;
  const profile={...CHARACTER_CHOICES.find(c=>c.id===id),...(customProfile||{})},child=id==='girl',female=profile.female,scale=profile.scale;modelScale=scale;bodyHeight=(child?2.07:2.02)*scale;
  const mat=(color,extra={})=>new T.MeshStandardMaterial({color,roughness:.85,...extra}),skin=mat(profile.skin||'#d4aa88'),skinShade=mat('#bd9172'),hair=mat(profile.hair),shirt=mat(profile.jacket),pants=mat(profile.pants),boots=mat('#594c3f'),sole=mat('#343a36'),white=mat('#e8e4d8'),iris=mat('#61716a'),pupil=mat('#252e2c'),lip=mat('#a97d6c');
  function mesh(geo,m,p=model){const o=new T.Mesh(geo,m);o.castShadow=true;o.receiveShadow=true;p.add(o);return o;}
  function oval(m,x,y,z,sx,sy,sz,p=model){const o=mesh(new T.SphereGeometry(1,24,18),m,p);o.position.set(x,y,z);o.scale.set(sx,sy,sz);return o;}
  function limb(m,x,y,z,r1,r2,length,p){const o=mesh(new T.CylinderGeometry(r1,r2,length,16,3),m,p);o.position.set(x,y,z);return o;}
  function curve(points,r,m,p=model){return mesh(new T.TubeGeometry(new T.CatmullRomCurve3(points.map(v=>new T.Vector3(...v))),16,r,7,false),m,p);}
  function shaped(points,m,p=model){return mesh(new T.LatheGeometry(points.map(v=>new T.Vector2(...v)),32),m,p);}
  // Continuous torso and pelvis with an anatomical waist and shoulder line.
  const torso=shaped([[.13,0],[.17,.04],[female?.145:.175,.18],[female?.16:.19,.32],[female?.175:.205,.44],[.17,.49],[.085,.52]],shirt);torso.position.y=.89;torso.scale.z=.63;
  oval(pants,0,.89,0,female?.18:.17,.13,.12);limb(skin,0,1.43,0,.055,.066,.11,model);
  for(const side of[-1,1]){
   const leg=new T.Group();leg.position.set(side*.092,.88,0);model.add(leg);legs.push(leg);
   limb(pants,0,-.18,0,.083,.065,.36,leg);oval(pants,0,-.38,.013,.064,.068,.065,leg);limb(pants,0,-.55,.008,.063,.047,.31,leg);
   oval(boots,0,-.75,.055,.063,.09,.115,leg);oval(sole,0,-.817,.065,.067,.025,.125,leg);
   const arm=new T.Group();arm.position.set(side*(female?.18:.208),1.335,0);arm.rotation.z=side*.055;model.add(arm);arms.push(arm);
   oval(shirt,side*.012,-.025,0,.075,.09,.077,arm);limb(shirt,side*.023,-.145,0,.067,.052,.24,arm);oval(shirt,side*.023,-.275,.01,.052,.055,.053,arm);limb(shirt,side*.025,-.38,.015,.048,.036,.19,arm);
   oval(skin,side*.025,-.515,.02,.041,.066,.026,arm);for(let i=0;i<4;i++){const finger=limb(skin,side*.025+(i-1.5)*.017,-.579+Math.abs(i-1.5)*.004,.025,.009,.007,.052,arm);finger.rotation.z=(i-1.5)*.05;}const thumb=oval(skin,side*.062,-.52,.042,.016,.038,.015,arm);thumb.rotation.z=side*.4;
  }
  for(const leg of legs){const joint=new T.Group();joint.position.y=-.38;joint.userData.kind='knee-joint';for(const o of [...leg.children])if(o.position.y<-.39){leg.remove(o);o.position.y+=.38;joint.add(o);}leg.add(joint);knees.push(joint);}
  for(const knee of knees){const ankle=new T.Group();ankle.position.set(0,-.37,.008);ankle.userData.kind='ankle-joint';for(const o of [...knee.children])if(o.position.y<-.27){knee.remove(o);o.position.sub(ankle.position);ankle.add(o);}knee.add(ankle);ankles.push(ankle);}
  for(const arm of arms){const joint=new T.Group();joint.position.y=-.275;joint.userData.kind='elbow-joint';for(const o of [...arm.children])if(o.position.y<-.29){arm.remove(o);o.position.y+=.275;joint.add(o);}arm.add(joint);elbows.push(joint);}
  // Chin, jaw, cheekbones and brow have their own continuous profile.
  const head=new T.Group();headPose=head;head.position.y=1.48;head.scale.x=profile.face.width;model.add(head);const face=shaped([[.035,0],[.069,.018],[.09,.055],[.098,.11],[.104,.18],[.095,.25],[.068,.295],[.015,.31]],skin,head);face.scale.z=.88;face.userData.kind='individual-reference-face';const fp=face.geometry.attributes.position;for(let i=0;i<fp.count;i++)if(fp.getY(i)<.1)fp.setX(i,fp.getX(i)*profile.face.chin);face.geometry.computeVertexNormals();
  for(const side of[-1,1]){oval(skin,side*.103,.14,0,.021,.041,.018,head);oval(skinShade,side*.111,.14,.012,.009,.025,.008,head);oval(skin,side*.052,.111,.071,.044,.036,.025,head);oval(white,side*.041,.183,.082,.024*profile.face.eye,.011,.01,head);oval(iris,side*.041,.183,.092,.009,.009,.003,head);oval(pupil,side*.041,.183,.095,.0045,.005,.002,head);oval(white,side*.038,.187,.097,.002,.002,.001,head);curve([[side*.018,.206,.086],[side*.041,.212,.088],[side*.065,.205,.079]],.004,hair,head);}
  oval(skin,0,.153,.092,.015*profile.face.nose,.032,.021*profile.face.nose,head);oval(skin,0,.132,.109,.02,.012,.014,head);curve([[-.027,.081,.081],[0,.077,.09],[.027,.081,.081]],.0035,lip,head);
  if(profile.beard){oval(hair,0,.037,.071,.065,.035,.019,head);for(const side of[-1,1])oval(hair,side*.035,.107,.091,.028,.008,.009,head);}
  if(profile.hairStyle!=='bald'){
   const cap=mesh(new T.SphereGeometry(1,32,20,0,Math.PI*2,0,1.72),hair,head);cap.position.set(0,.215,-.007);cap.scale.set(.105,.105,.094);
  }else for(const side of[-1,1])curve([[side*.095,.24,-.02],[side*.102,.19,-.035],[side*.089,.14,-.06]],.014,hair,head);
  if(profile.hairStyle==='long'){for(const side of[-1,1])curve([[side*.083,.24,-.015],[side*.113,.15,-.025],[side*.12,.02,-.035],[side*.085,-.09,-.06]],.027,hair,head);oval(hair,0,.1,-.102,.083,.17,.036,head);}
  if(profile.hairStyle==='long')for(let i=0;i<14;i++){const side=i<7?-1:1,u=(i%7)/6;curve([[side*(.065+u*.035),.27,-.025],[side*(.095+u*.025),.13,-.05-u*.04],[side*(.09+u*.04),-.075+u*.04,-.08]],.006,mat(new T.Color(profile.hair).multiplyScalar(.82+u*.32)),head);}
  if(profile.hairStyle==='curly'){for(let i=0;i<12;i++){const a=i/12*Math.PI*2;oval(hair,Math.cos(a)*.094,.244+Math.sin(i*2.3)*.018,Math.sin(a)*.083,.025,.03,.025,head);}}
  if(profile.glasses){const frames=mat('#433b30');const glasses=new T.Group();glasses.userData.kind='spectacles';head.add(glasses);for(const side of[-1,1]){const rim=mesh(new T.TorusGeometry(.028,.0032,6,24),frames,glasses);rim.position.set(side*.042,.183,.101);rim.scale.y=.82;curve([[side*.071,.186,.099],[side*.11,.19,.045],[side*.108,.18,-.022]],.0028,frames,glasses);}curve([[-.014,.185,.101],[0,.193,.106],[.014,.185,.101]],.0028,frames,glasses);}
  // A curved shirt inset sits in the opening between the jacket lapels.
  const inner=mat(profile.inner),inset=new T.Group();inset.userData.kind='reference-shirt';model.add(inset);
  const panel=new T.Shape();panel.moveTo(-.055,1.36);panel.lineTo(.055,1.36);panel.lineTo(.062,.96);panel.lineTo(-.062,.96);panel.closePath();const front=mesh(new T.ShapeGeometry(panel),inner,inset);front.position.z=.135;
  const pattern=mat(profile.pattern==='flowers'?'#d7bb8c':'#666454');
  if(profile.pattern==='stripes'||profile.pattern==='checks')for(let y=.995;y<1.36;y+=.037){const stripe=mesh(new T.PlaneGeometry(.116,.008),pattern,inset);stripe.position.set(0,y,.137);}
  if(profile.pattern==='checks')for(const x of[-.04,0,.04]){const stripe=mesh(new T.PlaneGeometry(.008,.38),pattern,inset);stripe.position.set(x,1.16,.138);}
  if(profile.pattern==='flowers')for(let i=0;i<12;i++)oval(pattern,(i%3-1)*.035,1.01+Math.floor(i/3)*.085,.139,.006,.007,.001,inset);
  if(profile.hood){const hood=mesh(new T.TorusGeometry(.084,.027,8,24,Math.PI),inner);hood.rotation.x=Math.PI/2;hood.position.set(0,1.43,-.014);hood.userData.kind='hood';}
  // A softly bent wool cap, with a rolled rim instead of a rigid cone.
  const wool=mat(profile.hatColor||'#a14f43'),woolRim=mat(profile.hatColor||'#833f37'),hat=new T.Group();hat.userData.kind='drooping-wool-cap';hat.visible=profile.hat!==false;head.add(hat);
  const centers=[[0,.263,-.006,.111],[.006,.333,-.01,.092],[.03,.406,-.014,.064],[.085,.468,-.025,.033],[.15,.463,-.038,.005]],hatPos=[],hatIx=[],hatUv=[];
  for(let row=0;row<centers.length;row++){const[x,y,z,r]=centers[row];for(let j=0;j<=24;j++){const a=j/24*Math.PI*2;hatPos.push(x+Math.cos(a)*r,y,z+Math.sin(a)*r*.9);hatUv.push(j/24,row/(centers.length-1));}}
  for(let row=0;row<centers.length-1;row++)for(let j=0;j<24;j++){const a=row*25+j,b=a+1,c=a+25,d=c+1;hatIx.push(a,c,b,b,c,d);}const hatGeo=new T.BufferGeometry();hatGeo.setAttribute('position',new T.Float32BufferAttribute(hatPos,3));hatGeo.setAttribute('uv',new T.Float32BufferAttribute(hatUv,2));hatGeo.setIndex(hatIx);hatGeo.computeVertexNormals();mesh(hatGeo,wool,hat);
  const rim=mesh(new T.TorusGeometry(.105,.016,8,32),woolRim,hat);rim.rotation.x=Math.PI/2;rim.scale.y=.9;rim.position.set(0,.271,-.006);oval(wool,.151,.462,-.038,.014,.014,.014,hat);
  if(child)head.scale.multiplyScalar(1.1);
  // Canvas hiking pack, leather straps and a Swiss flag patch face backwards.
  const pack=new T.Group();pack.userData.kind='swiss-hiking-backpack';pack.visible=profile.backpack!==false;model.add(pack);const canvas=mat('#486e5b'),strap=mat('#765f46'),patch=mat('#b94e42');
  oval(canvas,0,1.15,-.19,.171,.255,.119,pack);oval(canvas,0,1.371,-.19,.177,.073,.127,pack);for(const side of[-1,1]){oval(canvas,side*.16,1.1,-.19,.049,.122,.075,pack);if(profile.backpack!==false)curve([[side*.12,1.39,-.17],[side*.17,1.415,0],[side*.14,1.33,.13],[side*.125,1.03,.13]],.012,strap);}
  if(profile.backpack!==false)curve([[-.135,1.2,.142],[0,1.19,.153],[.135,1.2,.142]],.008,strap);
  const badge=mesh(new T.PlaneGeometry(.109,.12),patch,pack);badge.rotation.y=Math.PI;badge.position.set(0,1.17,-.311);for(const[w,h]of[[.022,.071],[.071,.022]]){const cross=mesh(new T.PlaneGeometry(w,h),white,pack);cross.rotation.y=Math.PI;cross.position.set(0,1.17,-.314);}
  for(let k=0;k<2;k++){legs[k].userData.kind='hiking-boots';const foot=ankles[k],cuff=mesh(new T.TorusGeometry(.052,.011,7,20),boots,foot);cuff.rotation.x=Math.PI/2;cuff.position.set(0,.063,.017);for(let i=0;i<3;i++)curve([[-.034,.045,.058+i*.026],[0,.054,.071+i*.026],[.034,.045,.058+i*.026]],.003,strap,foot);}
  for(const leg of legs){oval(mat('#454b39'),0,-.36,.062,.054,.075,.009,leg);}for(const side of[-1,1])curve([[side*.09,1.15,.108],[side*.135,1.13,.105],[side*.14,1.03,.105]],.0035,mat('#3f4838'));
  model.userData.equipment=['swiss-hiking-backpack','hiking-boots','drooping-wool-cap'];

  // Collar, shirt seam and boot cuffs keep the clothing legible at walking distance.
  for(const side of[-1,1])curve([[side*.06,1.42,.055],[side*.105,1.36,.11],[side*.035,1.38,.12]],.009,white);
  curve([[0,1.36,.125],[0,1.16,.128],[0,.98,.112]],.0025,skinShade);
  for(const y of[1.31,1.21,1.11])oval(sole,0,y,.132,.006,.006,.003);
  upperBody=new T.Group();upperBody.position.y=.89;upperBody.userData.kind='upper-body-pivot';for(const o of [...model.children])if(!legs.includes(o)){model.remove(o);o.position.y-=.89;upperBody.add(o);}model.add(upperBody);
  model.scale.setScalar(scale);model.userData.kind='human-anatomical-model';model.userData.appearance=id;model.userData.profile={jacket:profile.jacket,hair:profile.hair,glasses:!!profile.glasses};g.userData.appearance=id;
 }
 function animate({moving=false,running=false,time=0,slope=0,climbing=false,interacting=false,dt=1/60}={}){
  const distance=previousRoot?Math.hypot(g.position.x-previousRoot.x,g.position.z-previousRoot.z):0;previousRoot={x:g.position.x,z:g.position.z};
  if(climbing){motion.reset();model.position.y=0;upperBody.rotation.set(0,0,0);for(let i=0;i<2;i++){knees[i].rotation.x=.65;elbows[i].rotation.x=-.8;ankles[i].rotation.x=0;}return;}
  const pose=motion.step({moving,running,distance,dt,scale:modelScale,slope,time});lastPose=pose;
  const smooth=1-Math.exp(-Math.min(.05,Math.max(0,dt))*18);
  for(let i=0;i<2;i++){const p=pose.legs[i];legs[i].rotation.x+=(p.hip-legs[i].rotation.x)*smooth;legs[i].rotation.y=legs[i].rotation.z=0;knees[i].rotation.x+=(p.knee-knees[i].rotation.x)*smooth;ankles[i].rotation.x+=(p.ankle+p.footPitch-ankles[i].rotation.x)*smooth;
   const arm=!moving&&interacting&&pose.weight<.1?-.2:p.arm;arms[i].rotation.x+=(arm-arms[i].rotation.x)*smooth;arms[i].rotation.z=(i?1:-1)*.045;elbows[i].rotation.x+=(p.elbow-elbows[i].rotation.x)*smooth;}
  model.position.y+=(pose.bodyY+pose.breath-model.position.y)*smooth;model.rotation.set(0,0,0);upperBody.rotation.set(pose.torsoPitch,pose.torsoYaw,pose.torsoRoll);headPose.rotation.y=-pose.torsoYaw*.45;
 }

 setAppearance(initial);return{g,legs,arms,knees,elbows,ankles,animate,get motion(){return lastPose;},choices:CHARACTER_CHOICES,setAppearance,get appearance(){return appearance;},get height(){return bodyHeight;}};
}
