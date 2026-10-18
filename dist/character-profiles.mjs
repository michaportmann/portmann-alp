// The six selectable people follow the supplied Portmann family reference sheet.
// Existing save IDs stay stable; family names supplied by Micha on 18.10.2026.
export const CHARACTER_CHOICES=[
 {id:'girl',name:'Noemi',scale:.73,female:true,jacket:'#953c52',inner:'#343a31',hair:'#84623e',pants:'#626645',hairStyle:'long',face:{width:.94,chin:.88,nose:.8,eye:1.04},reference:[0,0]},
 {id:'man',name:'Micha',scale:1,female:false,jacket:'#56643a',inner:'#d6cbb8',hair:'#77766b',pants:'#766248',hairStyle:'bald',glasses:true,pattern:'checks',face:{width:1.09,chin:1.12,nose:1.13,eye:.96},reference:[1,0]},
 {id:'boy',name:'Niklas',scale:.87,female:false,jacket:'#536b3d',inner:'#343735',hair:'#47352b',pants:'#63664b',hairStyle:'curly',glasses:true,hood:true,face:{width:.94,chin:.91,nose:.88,eye:1.03},reference:[2,0]},
 {id:'woman',name:'Nancy',scale:.94,female:true,jacket:'#9a4d3a',inner:'#a5604c',hair:'#873f29',pants:'#616344',hairStyle:'long',pattern:'flowers',face:{width:1.04,chin:.96,nose:.94,eye:1.03},reference:[0,1]},
 {id:'teen-girl',name:'Lenja',scale:.84,female:true,jacket:'#35485d',inner:'#e4dfcf',hair:'#806143',pants:'#606448',hairStyle:'long',pattern:'stripes',face:{width:.93,chin:.88,nose:.86,eye:1.03},reference:[1,1]},
 {id:'grandfather',name:'Werner',scale:.98,female:false,jacket:'#795a3d',inner:'#d4d0be',hair:'#c6c5bb',pants:'#79664f',hairStyle:'bald',pattern:'stripes',face:{width:1.06,chin:1.12,nose:1.1,eye:.94},reference:[2,1]}
];
export const CHARACTER_IDS=CHARACTER_CHOICES.map(c=>c.id);
