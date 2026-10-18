import {SWISS_PEAKS,peakProfile} from './swiss-peaks.mjs';
// Coherent woods occupy the two valley shoulders, never the high rock faces.
export function canGrowAlpineTree(x,z,height){const y=height(x,z),slope=Math.hypot(height(x+.5,z)-height(x-.5,z),height(x,z+.5)-height(x,z-.5));return y> -14&&y<29&&slope<.72&&!SWISS_PEAKS.some(p=>Math.abs(z-p.cz)<p.depth*.24&&peakProfile(p,x)>18);}
export function alpineForestHabitat(x,z,height){
 const y=height(x,z),slope=Math.hypot(height(x+.5,z)-height(x-.5,z),height(x,z+.5)-height(x,z-.5));

 const west=((x+90)/54)**2+((z+63)/48)**2;
 const east=((x-58)/52)**2+((z+79)/48)**2;
 const patch=.11*Math.sin(x*.13+z*.08)+.08*Math.sin(z*.19-x*.04);
 return canGrowAlpineTree(x,z,height)&&y> -4&&Math.min(west,east)<1+patch;
}
