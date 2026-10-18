from pathlib import Path
import subprocess,numpy as np
from scipy.signal import correlate,correlation_lags
root=Path(__file__).resolve().parents[1]
def decode(p,mono=True):
 args=['ffmpeg','-v','error','-i',str(root/p),'-ar','24000']
 if mono:args+=['-ac','1']
 return np.frombuffer(subprocess.check_output(args+['-f','f32le','-']),dtype='<f4')
a=decode('docs/materials/retained-originals/acoustic-folk-original.mp3');scores={}
for key,p in [('old24','docs/materials/retained-originals/folk-24kbps.ogg'),('new48','dist/assets/audio/folk-clean.ogg')]:
 b=decode(p);part=216000;c=correlate(b[24000:24000+part],a[24000:24000+part],method='fft');lags=correlation_lags(part,part);mask=np.abs(lags)<1000;lag=int(lags[mask][np.argmax(c[mask])]);aa=a[max(0,-lag):];bb=b[max(0,lag):];n=min(len(aa),len(bb));aa=aa[:n];bb=bb[:n];gain=np.dot(aa,bb)/np.dot(bb,bb);scores[key]=float(10*np.log10(np.dot(aa,aa)/np.dot(aa-gain*bb,aa-gain*bb)))
 assert abs(len(a)-len(b))<2400
for p in ['dist/assets/audio/folk-clean.ogg','dist/assets/audio/summer-walk.ogg']:
 b=decode(p,False);assert np.isfinite(b).all();assert np.max(np.abs(b))<.99
assert scores['new48']>scores['old24']+3,scores
before=decode('docs/materials/retained-originals/summer-walk-64kbps.mp3');after=decode('dist/assets/audio/summer-walk.ogg');assert abs(len(before)-len(after))<2400
print('PASS full-duration audio, finite decoded samples and peak reserve; level-aligned mono error SNR:',{k:round(v,2) for k,v in scores.items()},'. No listening/device approval.')
