export const CATEGORIES = ['Food & groceries', 'Transport', 'Shopping', 'Entertainment', 'Housing', 'Health', 'Education', 'Other'];
export const INCOME_CATEGORIES = ['Salary', 'Allowance', 'Freelance', 'Other'];
export const PERIOD = '2026-10';
export const STORAGE_KEY = 'finora-demo-v1';
export const COLORS = ['#0f766e', '#375c86', '#a56c23', '#886ca6', '#64748b', '#408374', '#8a5a64', '#62716f'];
export function seedData() {
  const raw = [
    ['2026-10-01','Salary','income','Salary',45000,'Fictional October salary'],
    ['2026-10-01','Apartment rent','expense','Housing',10000,'Shared apartment'],
    ['2026-10-02','Weekly groceries','expense','Food & groceries',1850,'Vegetables and pantry basics'],
    ['2026-10-03','Metro recharge','expense','Transport',600,'Monthly travel card'],
    ['2026-10-04','Streaming subscription','expense','Entertainment',299,'Monthly plan'],
    ['2026-10-05','Freelance design project','income','Freelance',7500,'Fictional project payment'],
    ['2026-10-05','Lunch at The Green Table','expense','Food & groceries',480,'Lunch with friends'],
    ['2026-10-06','New running shoes','expense','Shopping',2400,'Replacement shoes'],
    ['2026-10-07','Course materials','expense','Education',650,'HCI study resources'],
    ['2026-10-08','Pharmacy essentials','expense','Health',420,'Monthly essentials'],
    ['2026-10-08','Cinema tickets','expense','Entertainment',700,'Weekend tickets'],
    ['2026-10-09','Weekly groceries','expense','Food & groceries',1260,'Fruit and household basics'],
    ['2026-10-10','Cab ride home','expense','Transport',320,'Late evening trip'],
    ['2026-10-10','Bookshop visit','expense','Shopping',850,'Two books'],
    ['2026-10-11','Coffee at Third Wave','expense','Food & groceries',220,'Morning coffee']
  ];
  const history = [
    ['2026-05-01','May salary','income','Salary',45000],['2026-05-28','May living expenses','expense','Housing',13200],['2026-05-29','May everyday spending','expense','Food & groceries',8250],
    ['2026-06-01','June salary','income','Salary',45000],['2026-06-28','June living expenses','expense','Housing',13200],['2026-06-29','June everyday spending','expense','Food & groceries',9600],
    ['2026-07-01','July salary','income','Salary',45000],['2026-07-28','July living expenses','expense','Housing',13200],['2026-07-29','July everyday spending','expense','Food & groceries',7650],
    ['2026-08-01','August salary','income','Salary',45000],['2026-08-28','August living expenses','expense','Housing',13200],['2026-08-29','August everyday spending','expense','Food & groceries',10100],
    ['2026-09-01','September salary','income','Salary',45000],['2026-09-28','September living expenses','expense','Housing',13200],['2026-09-29','September everyday spending','expense','Food & groceries',8650]
  ];
  return {
    version: 1, openingBalance: 1200000,
    transactions: [...history,...raw].map((t,i) => ({id:`demo-${i+1}`,date:t[0],description:t[1],type:t[2],category:t[3],amount:t[4]*100,notes:t[5]||'Fictional monthly summary record'})),
    budgets: Object.fromEntries(CATEGORIES.map((c,i) => [c,[6500,2000,4000,1200,10000,1500,1500,1000][i]*100])),
    goals: [{id:'goal-1',name:'Emergency fund',target:10000000,saved:3500000,date:'2027-03-31'}, {id:'goal-2',name:'A new laptop',target:6500000,saved:2200000,date:'2027-01-31'}, {id:'goal-3',name:'Weekend getaway',target:1500000,saved:600000,date:'2026-12-31'}],
    settings:{name:'Aarav Sharma',occupation:'Young professional',currency:'INR',theme:'light',budgetAlerts:true,goalAlerts:true}
  };
}
export function money(paise) {return new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:paise%100?2:0}).format(paise/100);}
export function shortMoney(paise) {return new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',notation:'compact',maximumFractionDigits:1}).format(paise/100);}
export function dateLabel(value) {return new Intl.DateTimeFormat('en-IN',{day:'numeric',month:'short',year:'numeric'}).format(new Date(`${value}T12:00:00`));}
export function periodLabel(period) {return new Intl.DateTimeFormat('en-IN',{month:'long',year:'numeric'}).format(new Date(`${period}-01T12:00:00`));}
export function validDate(v) {if(!/^\d{4}-\d{2}-\d{2}$/.test(v))return false; const d=new Date(`${v}T12:00:00Z`);return !Number.isNaN(d.getTime()) && d.toISOString().slice(0,10)===v;}
export function parseAmount(value) {if(!/^\d+(\.\d{1,2})?$/.test(String(value)))return null; const [a,b='']=String(value).split('.');const v=Number(a)*100+Number(b.padEnd(2,'0'));return Number.isSafeInteger(v)&&v>0&&v<=10000000000?v:null;}
export function totals(transactions) {let income=0,expenses=0;for(const t of transactions){if(t.type==='income')income+=t.amount;else expenses+=t.amount;}return {income,expenses,net:income-expenses};}
export function monthTransactions(state,period){return state.transactions.filter(t=>t.date.slice(0,7)===period);}
export function balance(state){return state.openingBalance+totals(state.transactions).net;}
export function budgetRows(state,period){const tx=monthTransactions(state,period);return CATEGORIES.map((category,i)=>{const spent=tx.filter(t=>t.type==='expense'&&t.category===category).reduce((n,t)=>n+t.amount,0);const budget=state.budgets[category]||0;return {category,color:COLORS[i],spent,budget,remaining:budget-spent,percent:budget?spent/budget*100:0,over:spent>budget,status:budget===0?'No budget set':spent>budget?'Over budget':spent===budget?'Fully used':spent/budget>=.8?'Near limit':'Within budget'};});}
export function goalPercent(g){return Math.min(100,g.saved/g.target*100);}
export function validateTransaction(values){const errors={};const description=values.description.trim();const amount=parseAmount(values.amount);if(!description)errors.description='Enter a description.';if(description.length>100)errors.description='Use 100 characters or fewer.';if(amount===null)errors.amount='Enter an amount above ₹0, up to ₹10 crore, with at most two decimals.';if(!['income','expense'].includes(values.type))errors.type='Choose income or expense.';if(!(values.type==='income'?INCOME_CATEGORIES:CATEGORIES).includes(values.category))errors.category='Choose a category.';if(!validDate(values.date))errors.date='Enter a valid date.';if(values.notes.length>500)errors.notes='Use 500 characters or fewer.';return {errors,record:{description,amount,type:values.type,category:values.category,date:values.date,notes:values.notes.trim()}};}
export function validateState(s){return s&&s.version===1&&Number.isSafeInteger(s.openingBalance)&&Array.isArray(s.transactions)&&s.transactions.every(t=>t&&typeof t.id==='string'&&typeof t.description==='string'&&t.description.trim()&&Number.isSafeInteger(t.amount)&&t.amount>0&&validDate(t.date)&&['expense','income'].includes(t.type)&&(t.type==='income'?INCOME_CATEGORIES:CATEGORIES).includes(t.category)&&typeof t.notes==='string')&&new Set(s.transactions.map(t=>t.id)).size===s.transactions.length&&s.budgets&&CATEGORIES.every(c=>Number.isSafeInteger(s.budgets[c])&&s.budgets[c]>=0)&&Array.isArray(s.goals)&&s.goals.every(g=>g&&typeof g.id==='string'&&typeof g.name==='string'&&g.name.trim()&&Number.isSafeInteger(g.target)&&g.target>0&&Number.isSafeInteger(g.saved)&&g.saved>=0&&g.saved<=g.target&&validDate(g.date))&&new Set(s.goals.map(g=>g.id)).size===s.goals.length&&s.settings&&typeof s.settings.name==='string'&&typeof s.settings.occupation==='string'&&['light','dark','system'].includes(s.settings.theme)&&typeof s.settings.budgetAlerts==='boolean'&&typeof s.settings.goalAlerts==='boolean';}
