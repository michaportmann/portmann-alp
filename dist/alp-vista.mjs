// Oblique landscape view from the open western flank. The walking camera stays
// close to the player; this separate view reveals the height above the lake.
export function alpVista(angle=.25,zoom=1,aspect=4/3){
 const scale=zoom*Math.max(1,(4/3)/aspect),turn=angle-.25,c=Math.cos(turn),s=Math.sin(turn),focus={x:-7,y:15,z:-15};
 return{position:{x:focus.x+(-38*c+47*s)*scale,y:focus.y+23*scale,z:focus.z+(38*s+47*c)*scale},look:focus,fov:84};
}
