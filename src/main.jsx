import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { images } from './assets';
import './style.css';
function Picture({asset,alt,className='',contain=false}){return <figure className={`picture ${contain?'contain':''} ${className}`}><img src={images[asset]} alt={alt} loading={asset==='opening'?'eager':'lazy'}/></figure>}
function Label({children}){return <p className="section-label">{children}</p>}
function Page({number,title,children,className='',id}){return <section id={id} className={`exhibit-page ${className}`} aria-label={`${number}장. ${title}`}><div className="page-inner">{children}</div><div className="page-footer"><span>경주 인왕동사지 복원 설계</span><span><b>{number}</b><i/>09</span></div></section>}
const studies = [
 {key:'6-1',title:'금당지 고증.',items:[['평면 형태','통일신라 시기 가람에서 가장 큰 규모의 금당지를 분석하고, 적심 깊이와 남은 유구를 바탕으로 남북 방향의 이중기단임과 정면 5칸, 측면 3칸의 평면으로 추정합니다.'],['구조 분석','철감선사탑과 누각무늬전 등의 사례를 참고하여 굽받침없는 주두와 소로, 배흘림 기둥, 교두형 첨차의 구조적 특징을 검토합니다.'],['입면 분석','사례를 통해 정면 5칸의 문 3개 구성과 창호 비례, 역삼각형 살창 및 안여닫이 방식을 비교하여 입면을 추정합니다.']]},
 {key:'6-2',title:'십자형 건물지 고증.',items:[['평면 형태','큰 적심 사이 소형 적심이 존재하며, 장방형 건물 내부에 정방형 중심 공간이 형성되는 배치를 분석합니다.'],['비교 사례와 지붕 구성','신라 왕경 도시 주택의 개방형 전퇴와 초이진라마사원 중문, 사천왕문의 십자형 구성을 참고해 지붕 구성을 검토합니다.'],['구조 분석','내부의 큰 적심을 고주로 설정하고, 협칸 도리는 중심 건물 보에, 전후면 차양칸은 창방을 통해 보조기둥에 연결합니다.']]},
 {key:'6-3',title:'동서 회랑지 고증.',items:[['유구 분석','서회랑지의 적심은 위치에 따라 크기와 형태에 차이를 보이며, 이를 바탕으로 구간별 구조적 특성과 공간 구성을 분석합니다.'],['동회랑지 초석','동회랑지에서는 원형주좌 초석 1기와 고막이가 있는 원형주좌 초석 1기가 확인됩니다. 특히 고막이의 존재를 근거로, 사역의 경계를 구분하는 벽체가 설치되었을 가능성을 검토합니다.'],['서연지와 서회랑지 관계','서연지와 서회랑지, 우물은 서로 연관된 축을 형성하며, 서회랑지의 반쪽 적심은 서연지를 향해 배치되어 있습니다. 서연지의 규모와 위치를 고려할 때 의례 공간으로 활용되었을 가능성이 있으며, 이에 따라 서회랑 남측 건물은 제사용 물품을 보관하는 창고였을 것으로 추정합니다.']]},
];
const chapters=[['intro','시작'],['site','터의 이야기'],['history','기록 속 인용사'],['traces','흔적을 따라'],['plan','배치의 해석'],['measure','용척 산정'],['6-1','금당지 고증'],['6-2','십자형 건물지 고증'],['6-3','동서 회랑지 고증'],['comparison','유구와 복원 사이'],['experience','공간을 거닐다'],['views','복원된 사찰의 풍경'],['ending','마무리']];
function App(){const[activePage,setActivePage]=useState("intro");const[autoPlay,setAutoPlay]=useState(false);const[comparison,setComparison]=useState(50);const[lightbox,setLightbox]=useState(null);const focusRef=useRef(null);const closeRef=useRef(null);
useEffect(()=>{const pages=[...document.querySelectorAll('.exhibit-page')];let frame;const reduced=matchMedia('(prefers-reduced-motion: reduce)');const update=()=>{frame=0;pages.forEach(page=>{const r=page.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight)return;const p=Math.max(-1,Math.min(1,r.top/innerHeight));page.style.setProperty('--travel',reduced.matches?0:p);});};const scroll=()=>{if(!frame)frame=requestAnimationFrame(update)};const observer=new IntersectionObserver(es=>es.forEach(e=>{e.target.classList.toggle('in-view',e.isIntersecting)}),{threshold:.15});pages.forEach(e=>observer.observe(e));window.addEventListener('scroll',scroll,{passive:true});window.addEventListener('resize',scroll);update();return()=>{cancelAnimationFrame(frame);observer.disconnect();window.removeEventListener('scroll',scroll);window.removeEventListener('resize',scroll)}},[]);
useEffect(()=>{if(!lightbox)return;document.body.style.overflow='hidden';closeRef.current?.focus();const key=e=>{if(e.key==='Escape')setLightbox(null);if(e.key==='Tab'){e.preventDefault();closeRef.current?.focus()}};window.addEventListener('keydown',key);return()=>{document.body.style.overflow='';window.removeEventListener('keydown',key);focusRef.current?.focus()}},[lightbox]);
const enlarge=(event,asset,alt)=>{focusRef.current=event.currentTarget;setLightbox({asset,alt})};


useEffect(()=>{
 if(!autoPlay||lightbox)return;
 let timer;
 const schedule=()=>{clearTimeout(timer);if(document.hidden)return;timer=setTimeout(()=>{
  const pages=[...document.querySelectorAll('.exhibit-page')];
  const center=window.innerHeight/2;
  const current=pages.findIndex(page=>{const r=page.getBoundingClientRect();return r.top<=center&&r.bottom>center});
  if(current<0)return;
  const page=pages[current];const bounds=page.getBoundingClientRect();
  if(bounds.bottom>window.innerHeight+24){window.scrollBy({top:Math.min(window.innerHeight*.7,bounds.bottom-window.innerHeight),behavior:'smooth'});schedule();}
  else if(current<pages.length-1){pages[current+1].scrollIntoView({behavior:'smooth',block:'start'});schedule();}
  else{setAutoPlay(false);}
 },20000)};
 const events=['wheel','touchstart','pointerdown','keydown','scroll'];
 events.forEach(name=>window.addEventListener(name,schedule,{passive:true}));
 document.addEventListener('visibilitychange',schedule);schedule();
 return()=>{clearTimeout(timer);events.forEach(name=>window.removeEventListener(name,schedule));document.removeEventListener('visibilitychange',schedule)};
},[autoPlay,lightbox]);
useEffect(()=>{
 const pages=[...document.querySelectorAll('.exhibit-page')];let frame;
 const update=()=>{frame=0;const center=window.innerHeight/2;const current=pages.find(page=>{const bounds=page.getBoundingClientRect();return bounds.top<=center&&bounds.bottom>center});if(current)setActivePage(current.id)};
 const onScroll=()=>{if(!frame)frame=requestAnimationFrame(update)};
 window.addEventListener('scroll',onScroll,{passive:true});window.addEventListener('resize',onScroll);update();
 return()=>{cancelAnimationFrame(frame);window.removeEventListener('scroll',onScroll);window.removeEventListener('resize',onScroll)};
},[]);
const imageButton=(asset,alt,className='')=><button className={`document-image ${className}`} onClick={e=>enlarge(e,asset,alt)} aria-label={`${alt} 확대`}><Picture asset={asset} alt={alt} contain/><span className="expand">↗</span></button>;
return <><main>
<Page number="01" title="사라진 김인문의 사찰을 찾아갑니다" id="intro" className="cover-page"><div className="cover-top"><span>慶州 仁旺洞 寺址</span><span>GRADUATION DESIGN · RESTORATION</span></div><div className="cover-layout"><div className="cover-copy enter"><Label>경주 인왕동사지 복원 설계</Label><h1>사라진 김인문의<br/><em>사찰을 찾아갑니다</em></h1><p className="cover-subtitle">경주 인왕동사지 복원 설계</p><p className="intro-description">남겨진 유구에서 옛 건축의 흔적을 읽고,<br/>사라진 인용사의 모습을 다시 그려냅니다.</p><a className="start-link" href="#site" onClick={()=>setAutoPlay(true)}>이야기 시작하기 <span>↓</span></a></div><div className="cover-image enter delay"><Picture asset="opening" alt="경주 인왕동사지 복원 조감도"/><span className="image-vertical">과거의 흔적, 다시 만나는 풍경</span></div></div></Page>
<Page number="02" title="터의 이야기" id="site" className="site-page"><div className="site-visual enter">{imageButton('siteAerial','경주 인왕동사지와 주변 경관')}<div className="coordinate-label"><span>GYEONGJU</span><strong>터를 읽습니다</strong><i>02 — SITE & CONTEXT</i></div></div><div className="site-copy enter delay"><Label>02 / 터의 이야기</Label><h2>경주의 풍경 속,<br/>하나의 <em>터.</em></h2><p>인왕동사지는 통일신라시대 사찰인 인용사의 터로 추정되는 유적입니다. 경주 남천 북쪽 끝자락에 위치하며, 남천을 사이에 두고 월성과 마주하고 있습니다. 주변에는 월정교와 춘향교지 등 신라 왕경의 주요 유적이 자리합니다.</p><p>본 설계는 발굴 유구와 관련 문헌, 동시대 건축 사례를 바탕으로 사라진 사찰의 건축적 형태와 공간 구성을 고찰하고, 당시 인용사의 모습을 복원하는 데 목적이 있습니다.</p><dl className="site-facts"><div><dt>대상</dt><dd>경주 인왕동사지</dd></div><div><dt>위치</dt><dd>경상북도 경주시 인왕동 341-3</dd></div><div><dt>분류</dt><dd>유적건조물 / 종교신앙 / 불교 / 사찰</dd></div></dl></div></Page>
<Page number="02" title="기록 속 인용사" id="history" className="history-page"><div className="history-editorial"><div className="history-intro enter"><Label>02 / 터의 이야기</Label><h2>기록 속 인용사,<br/>시간을 넘어 <em>이어집니다.</em></h2><blockquote>···仁間이 옥에 갇혀 있을때 國人이 그를 위해 절을 지어 ‘仁答寺’라고 하고 觀音道場을 개설하였다. 인문이 돌아오다가 해상에서 죽으니 그 도량을 고쳐 彌陀道場으로 삼았는데 지금까지 전한다.<cite>『삼국유사』 권2, 기이2, 문호왕·법민조</cite></blockquote><div className="history-location">{imageButton('historyMap','기록 속 인용사의 창건과 변화를 담은 콜라주')}</div></div><div className="history-narrative enter delay"><div className="history-collage">{imageButton('historyDetail','1916 경주 측량 지도와 인왕사지 위치 기록')}<p>최초 위치 기록에는 인왕사지(仁旺寺址)로 표기되어 있으며, 폐탑(廢塔)의 위치는 두 개의 점으로 표현되어 있습니다.</p></div><ol className="timeline">{[['7세기 초','창건',"김인문이 옥에 갇혀 있을 때 국인들이 그를 위해 사찰을 창건하고 '인용사'라 하였으며, 관음도량을 개설했습니다.",'삼국유사'],['7세기 말','변화','김인문이 돌아오다가 해상에서 죽자, 도량을 고쳐 미타도량으로 삼았습니다.','삼국유사'],['8~9세기','운영','출토된 기와와 전돌 등의 양식과 제작기법으로 보아 8세기 말에서 9세기로 건립 연대가 추정됩니다.'],['1916','지도','경주 측량 지도에 인왕사지로 표기되며, 폐탑의 위치가 두 개의 점으로 나타납니다.']].map(([date,title,copy,source])=><li key={date}><span className="timeline-date">{date}</span><h3>{title}</h3><p>{copy}</p>{source&&<small>— {source}</small>}</li>)}</ol></div></div></Page>
<Page number="03" title="흔적을 따라" id="traces" className="traces-page"><div className="traces-heading enter"><Label>03 / 흔적을 따라</Label><h2>작은 흔적이,<br/>공간의 <em>단서</em>가 됩니다.</h2></div><div className="trace-gallery enter">{imageButton('traceDetail','인왕동사지 발굴 유구 도면','trace-main')}{imageButton('archive3','인왕동사지 유구 사진')}{imageButton('archive4','인왕동사지 유구 상세 사진')}</div><p className="gallery-note">사진과 도면을 누르면 크게 볼 수 있습니다.</p></Page>
<Page number="04" title="배치의 해석" id="plan" className="plan-page"><div className="plan-heading enter"><Label>04 / 배치의 해석</Label><h2>기록 위에,<br/>공간의 질서를 세웁니다.</h2><p>중심축을 따라 금당지·쌍탑·십자형건물지·서연지의 배치 관계를 살펴보고, 약 3° 틀어진 서회랑의 축과 두 차례의 서측 영역 확장을 통해 가람의 공간적 변화 과정을 해석합니다.</p></div>{imageButton('restorationPlan','인왕동사지 배치 해석 도면','plan-image enter delay')}</Page>
<Page number="05" title="용척 산정" id="measure" className="plan-page"><div className="plan-heading enter"><Label>05 / 용척 산정</Label><h2>유구의 간격에서,<br/><em>건축의 척도</em>를 읽습니다.</h2><p>발굴 도면을 바탕으로 주칸 거리와 적심 배치를 분석합니다.</p><p>발굴 도면의 주칸 거리를 고려척과 당척으로 환산하여 적합한 용척을 검토합니다.</p></div>{imageButton('measure','주칸 거리와 적심 배치에 따른 용척 산정','plan-image enter delay')}</Page>
{studies.map(study=><Page key={study.key} number="06" title={study.title} id={study.key} className="restoration-page"><div className="restoration-top enter"><div><Label>06 / 다시 세우는 과정</Label><h2>{study.title}</h2></div></div><div className="process-grid">{study.items.map(([title,copy],i)=><div className={`process-item enter delay-${i}`} key={title}>{imageButton(`${study.key}-${i+1}`,`${study.title} ${title}`)}<div className="process-title"><span>{String(i+1).padStart(2,'0')}</span><h3>{title}</h3></div><p>{copy}</p></div>)}</div></Page>)}
<Page number="07" title="유구와 복원 사이" id="comparison" className="comparison-page"><div className="comparison-title enter"><Label>07 / 유구와 복원 사이</Label><h2>두 모습을 <em>겹쳐봅니다.</em></h2><p>선을 움직이면 유구와 복원안을 비교할 수 있습니다.</p></div><div className="comparison-frame enter delay"><Picture asset="before" alt="인왕동사지 유구"/><div className="comparison-after" style={{clipPath:`inset(0 ${100-comparison}% 0 0)`}}><Picture asset="after" alt="인왕동사지 복원안"/></div><span className="compare-label left">복원안</span><span className="compare-label right">유구</span><div className="compare-line" style={{left:`${comparison}%`}}><span>‹　›</span></div><input type="range" min="0" max="100" value={comparison} onChange={e=>setComparison(Number(e.target.value))} aria-label="유구와 복원안 비교 위치"/></div></Page>
<Page number="08" title="공간을 거닐다" id="experience" className="experience-page"><Picture asset="view1" alt="복원된 인왕동사지의 풍경" className="experience-background"/><div className="experience-card enter"><Label>08 / 공간을 거닐다</Label><h2>복원을 넘어,<br/>다시 <em>머무는</em> 공간으로,</h2><p>회랑을 따라 십자형 건물을 지나,<br/>금당이 자리한 사찰의 중심 공간으로 이어집니다.</p><p>이곳에 잠시 머물며 복원된 건축의 모습을 하나씩 마주하고,<br/>흔적 속에 남아 있던 옛 사찰의 풍경을 그려봅니다.</p></div></Page>
<Page number="08" title="복원된 사찰의 풍경" id="views" className="views-page"><div className="enter"><Label>08 / 공간을 거닐다</Label><h2>흔적 속에 남아 있던,<br/><em>옛 사찰의 풍경.</em></h2></div><div className="views-grid enter">{[2,3,4,5].map(n=><React.Fragment key={n}>{imageButton(`view${n}`,`인왕동사지 복원 투시도 ${n}`)}</React.Fragment>)}</div></Page>
<Page number="09" title="남겨진 흔적을 따라" id="ending" className="ending-page"><div className="ending-content enter"><span className="seal"><span>仁旺</span><span>寺址</span></span><Label>경주 인왕동사지 복원 설계</Label><h2>남겨진 흔적을 따라,<br/><em>사라진 건축</em>을 다시 그립니다.</h2><p>흔적을 보존하고, 기록을 해석하며, 공간을 다시 잇습니다.<br/>이것이 인왕동사지에서 시작하는 복원의 이야기입니다.</p><a className="restart-link" href="#intro" onClick={()=>setAutoPlay(false)}>처음부터 다시 보기 <span>↺</span></a></div><div className="author-credit"><p>전통건축학과 · 복원설계(졸업)</p><p><span>20231018</span><strong>한지현</strong></p></div></Page>
</main><nav className="chapter-dots" aria-label="전시 목차" hidden={Boolean(lightbox)||activePage==="intro"}>{chapters.map(([id,title],index)=><a key={id} href={`#${id}`} className={activePage===id?"active":""} aria-label={`${index+1}. ${title}`} aria-current={activePage===id?"location":undefined} onClick={()=>{if(id==="intro")setAutoPlay(false)}}><span className="dot-title">{title}</span><span className="dot" aria-hidden="true"/></a>)}</nav>{lightbox&&<div className="lightbox" role="dialog" aria-modal="true" aria-label={lightbox.alt} onClick={()=>setLightbox(null)}><button ref={closeRef} className="lightbox-close" onClick={()=>setLightbox(null)} aria-label="이미지 닫기">×</button><div onClick={e=>e.stopPropagation()}><Picture asset={lightbox.asset} alt={lightbox.alt} contain/></div></div>}</>}
createRoot(document.getElementById('root')).render(<App/>);












