// 디자인 검토용 예시: 국립문화유산연구원 황룡사 스토리모드 자료.
// 실제 인왕동 사지 설계 자료를 받으면 각 경로를 교체합니다.
const sample = name => `./images/examples/${name}.jpg`;
export const images = {
  opening: sample('img_intro'),
  siteBackground: sample('S1_Archive'),
  siteAerial: sample('S1_Archive'),
  siteMap: sample('S5V2_D'),
  siteArchive: sample('S5V2_D'),
  traceBackground: sample('S6V3_D'),
  traceDetail: sample('S13V7_D'),
  tracePlan: sample('S14V7_D'),
  archiveBackground: sample('S15V7_D1'),
  archive1: sample('img_video7_ref1@2x'),
  archive2: sample('img_video7_ref2@2x'),
  archive3: sample('img_video7_ref3@2x'),
  archive4: sample('img_video7_ref4@2x'),
  archive5: sample('img_video7_ref5@2x'),
  transition: sample('img_outro'),
  transition2: sample('S22_M'),
  phase1: sample('S18_M'), phase2: sample('S19_M'),
  phase3: sample('S20_M'), phase4: sample('S21_M'), phase5: sample('S22_M'),
  phaseDetail1: sample('S18_D'), phaseDetail2: sample('S19_D'),
  phaseDetail3: sample('S20_D'), phaseDetail4: sample('S21_D'), phaseDetail5: sample('S22_D'),
  restorationBackground: sample('img_intro'),
  restorationDetail: sample('S15V7_D2'),
  restorationPlan: sample('S22_D'),
  before: sample('S1_Archive'), after: sample('S22_M'),
  ending: sample('img_outro'),
};
export const sampleSource = 'https://aha.nrich.go.kr/HNSContents/StoryMode/index.html';
