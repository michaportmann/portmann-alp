"""Build a bundled, offline relief of central Switzerland from Mapzen Terrarium tiles."""
import json,math
from pathlib import Path
from PIL import Image
out=Path(__file__).resolve().parents[1]/'dist/assets/nature'
canvas=Image.new('RGB',(512,512))
for x in (267,268):
 for y in (179,180):canvas.paste(Image.open(f'/tmp/pfc-dem-{x}-{y}.png').convert('RGB'),((x-267)*256,(y-179)*256))
N=129;elevation=[]
for j in range(N):
 for i in range(N):
  r,g,b=canvas.getpixel((min(511,i*4),min(511,j*4)));elevation.append(round(r*256+g+b/256-32768))
data={'size':N,'pixelStep':4,'originTile':[267,179],'zoom':9,'center':[46.96,8.49],'elevation':elevation,'source':'Mapzen Terrain Tiles / Tilezen, AWS Open Data; underlying SRTM and EU-DEM. Accessed 2026-10-15.','verticalExaggeration':3}
(out/'swiss-relief.mjs').write_text('export default '+json.dumps(data,separators=(',',':'))+';\n')
print('Bundled central-Swiss relief:',N*N,'samples;',min(elevation),'to',max(elevation),'metres')
