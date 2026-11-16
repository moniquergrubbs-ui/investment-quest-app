export const INTERVALS=[1,3,7,14,30];
export function updateReview(old,correct,now=Date.now()){const stage=correct?Math.min((old?.stage??-1)+1,INTERVALS.length-1):0;return {stage,due:now+(correct?INTERVALS[stage]:1)*86400000,lastCorrect:correct,attempts:(old?.attempts||0)+1};}
export function shuffle(array,random=Math.random){const a=[...array];for(let i=a.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
export function makeSession(questions,reviews,{moduleId='all',mode='mixed',count=10,now=Date.now()}={}){let pool=questions.filter(q=>moduleId==='all'||q.moduleId===moduleId);if(mode==='due')pool=pool.filter(q=>reviews[q.id]&&reviews[q.id].due<=now);if(mode==='missed')pool=pool.filter(q=>reviews[q.id]&&!reviews[q.id].lastCorrect);return shuffle(pool).slice(0,count);}
export function blankState(){return {version:1,xp:0,lessons:[],funds:[],bookmarks:[],reviews:{},history:[],activeDays:[]};}
export function validState(s){return !!s&&s.version===1&&Number.isFinite(s.xp)&&s.xp>=0&&['lessons','funds','bookmarks','history','activeDays'].every(k=>Array.isArray(s[k]))&&!!s.reviews&&typeof s.reviews==='object'&&!Array.isArray(s.reviews);}
