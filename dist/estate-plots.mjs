// Reserved development terraces. West: hay; east: hospitality. The valley descent stays open.
export const ESTATE_PLOTS={
 restaurant:{x:17,z:14,w:8,d:6,y:1.2,title:'Alp-Restaurant',entry:{x:17,z:18.5}},
 restaurantPlus:{x:25,z:14,w:6,d:6,y:1.2,title:'Speisesaal',entry:{x:25,z:18.5}},
 spa:{x:39,z:10,w:7,d:6,y:3.3,title:'Panoramabad',entry:{x:39,z:14.5}},
 playground:{x:18,z:28,w:8,d:6,y:-7.25,title:'Spielplatz',entry:{x:18,z:23.5}},
 hotel:{x:31,z:31,w:10,d:8,y:-8.47,title:'Berghotel',entry:{x:31,z:25.5}},
 pasture:{x:44,z:28,w:9,d:14,y:-6.2,title:'Zusatzweide',entry:{x:38,z:28}},
 silo:{x:-36,z:-8,w:5,d:5,y:.5,title:'Heusilo',entry:{x:-32,z:-8}},
 tools:{x:-28.9,z:10.7,w:1.4,d:1.2,y:0,title:'Feldgeräte',entry:{x:-27.7,z:10.7}}
};
export const inEstatePlot=(x,z,pad=0)=>Object.values(ESTATE_PLOTS).some(p=>Math.abs(x-p.x)<p.w/2+pad&&Math.abs(z-p.z)<p.d/2+pad);
export function estateTerraceHeight(x,z,h){for(const [id,p]of Object.entries(ESTATE_PLOTS)){if(['tools','pasture'].includes(id))continue;const d=Math.max(Math.abs(x-p.x)-p.w/2,Math.abs(z-p.z)-p.d/2);if(d<2.2){const t=Math.max(0,d/2.2),blend=1-t*t*(3-2*t);h+=(p.y-h)*blend;}}return h;}
export const ESTATE_LANES=[
 [[-19,8],[-28.8,7],1], [[-24,-13],[-32,-8],1],
 [[12,24],[17,18.5],1.25], [[17,18.5],[25,18.5],1.3],
 [[25,18.5],[39,14.5],1.1], [[12,24],[18,23.5],1.1],
 [[18,23.5],[31,25.5],1.4], [[31,25.5],[38,28],1.1],
 [[-28.8,7],[-27.7,10.7],.8]
];
