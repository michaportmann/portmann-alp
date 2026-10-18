import * as T from './vendor/three.module.js';
// Exactly follows the physics boundary. Decorative rails do not steal walkable ground.
export function createBoundaryFence(scene,bounds,height){
 const [x0,x1,z0,z1]=bounds,posts=[],rails=[],pose=new T.Object3D();
 for(const[a,b]of [[[x0,z0],[x1,z0]],[[x1,z0],[x1,z1]],[[x1,z1],[x0,z1]],[[x0,z1],[x0,z0]]]){const count=Math.ceil(Math.hypot(b[0]-a[0],b[1]-a[1])/2.6);let last;
  for(let i=0;i<=count;i++){const x=a[0]+(b[0]-a[0])*i/count,z=a[1]+(b[1]-a[1])*i/count,y=height(x,z);pose.position.set(x,y+.61,z);pose.rotation.set(0,0,0);pose.scale.set(.13,1.22,.13);pose.updateMatrix();posts.push(pose.matrix.clone());if(last)for(const h of [.46,.94]){const a=new T.Vector3(last.x,last.y+h,last.z),b=new T.Vector3(x,y+h,z),d=b.clone().sub(a);pose.position.copy(a.add(b).multiplyScalar(.5));pose.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),d.clone().normalize());pose.scale.set(.055,d.length(),.055);pose.updateMatrix();rails.push(pose.matrix.clone());}last={x,y,z};}
 }
 const root=new T.Group();root.userData.kind='visible-walkable-map-boundary';root.userData.bounds=[...bounds];scene.add(root);
 for(const [matrices,geometry,color]of [[posts,new T.BoxGeometry(1,1,1),'#866b4a'],[rails,new T.CylinderGeometry(1,1,1,6),'#ac9770']]){const mesh=new T.InstancedMesh(geometry,new T.MeshStandardMaterial({color,roughness:1}),matrices.length);matrices.forEach((m,i)=>mesh.setMatrixAt(i,m));mesh.castShadow=mesh.receiveShadow=true;root.add(mesh);}return root;
}
