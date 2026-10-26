const original = name => `${import.meta.env.BASE_URL}images/originals/${encodeURIComponent(name)}`;
export const images = Object.fromEntries([
 ['opening','1.png'], ['siteAerial','2.jpg'], ['historyMap','2-2.png'], ['historyDetail','2-2(1).png'], ['historyReference','2-2 참고사진.png'],
 ['traceDetail','3.png'], ['archive3','3(1).jpg'], ['archive4','3(2).jpg'], ['restorationPlan','4.png'], ['measure','5.png'],
 ...['6-1','6-2','6-3'].flatMap(section => [1,2,3].map(n => [`${section}-${n}`,`${section}(${n}).png`])),
 ['before','7(1).jpg'], ['after','comparison-restoration-borderless.png'], ...[1,2,3,4,5].map(n => [`view${n}`,`8(${n}).png`]),
].map(([key,name]) => [key,original(name)]));


