// Frontend demonstration only. These credentials and browser records are not secure authentication.
export const DEMO_ACCOUNT = Object.freeze({name:'Finora Demo',email:'demo@finora.com',password:'Finora@123'});
export const GOOGLE_DEMO_ACCOUNT = Object.freeze({name:'Google Demo',email:'google.demo@finora.com'});
export const AUTH_SESSION_KEY = 'finora-demo-session-v1';
export const AUTH_ACCOUNTS_KEY = 'finora-demo-accounts-v1';

const escape = value => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export function validateAuth(values,signup=false){
  const errors={};
  if(signup&&(!values.name?.trim()||values.name.trim().length>60))errors.name='Enter a name of 1–60 characters.';
  if(!emailPattern.test(values.email?.trim()||'')||(values.email?.trim().length||0)>254)errors.email='Enter a valid email address.';
  if(!values.password)errors.password='Enter your password.';
  else if(signup&&(values.password.length<8||values.password.length>128))errors.password='Use 8–128 characters for your password.';
  if(signup&&!values.confirm)errors.confirm='Confirm your password.';
  else if(signup&&values.confirm!==values.password)errors.confirm='The passwords do not match.';
  return errors;
}
const googleLogo=`<svg class="google-logo" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M21.6 12.23c0-.71-.06-1.39-.18-2.05H12v3.88h5.38a4.6 4.6 0 0 1-2 3.02v2.51h3.23c1.89-1.74 2.99-4.31 2.99-7.36Z"/><path fill="#34A853" d="M12 22c2.7 0 4.96-.9 6.61-2.41l-3.23-2.51c-.9.6-2.05.97-3.38.97-2.6 0-4.8-1.76-5.59-4.12H3.08v2.59A10 10 0 0 0 12 22Z"/><path fill="#FBBC05" d="M6.41 13.93a6 6 0 0 1 0-3.86V7.48H3.08a10 10 0 0 0 0 9.04l3.33-2.59Z"/><path fill="#EA4335" d="M12 5.95c1.47 0 2.79.51 3.83 1.51l2.87-2.87A9.6 9.6 0 0 0 12 2a10 10 0 0 0-8.92 5.48l3.33 2.59C7.2 7.71 9.4 5.95 12 5.95Z"/></svg>`;

export function createDemoAuth({onAuthenticated}){
  function session(){try{const value=JSON.parse(sessionStorage.getItem(AUTH_SESSION_KEY));return value&&typeof value.name==='string'&&value.name.trim()&&emailPattern.test(value.email)&&['credentials','google-demo'].includes(value.provider)?value:null;}catch{return null;}}
  function accounts(){try{const value=JSON.parse(localStorage.getItem(AUTH_ACCOUNTS_KEY)||'[]');return Array.isArray(value)?value.filter(a=>a&&typeof a.name==='string'&&typeof a.email==='string'&&typeof a.password==='string'):[];}catch{return [];}}
  function field(id,label,type,placeholder,autocomplete){return `<div class="auth-field"><label for="auth-${id}">${label}</label><input id="auth-${id}" name="${id}" type="${type}" placeholder="${placeholder}" autocomplete="${autocomplete}" maxlength="${id==='name'?60:id==='email'?254:128}" required aria-describedby="auth-${id}-error"><p class="field-error" id="auth-${id}-error"></p></div>`;}
  function render({focus=false,notice=''}={}){
    const signup=location.hash==='#signup';
    if(!['#login','#signup'].includes(location.hash))history.replaceState(null,'','#login');
    document.documentElement.dataset.theme='light';
    document.title=`${signup?'Signup':'Login'} · Finora`;
    document.querySelector('#app').innerHTML=`<div class="auth-shell"><header class="auth-header"><a class="brand" href="#login" aria-label="Finora login"><img src="assets/finora.svg" alt="" width="36" height="36"><span>finora<span class="brand-dot">.</span></span></a><span class="auth-demo-label">Personal finance</span></header><main class="auth-content" id="main" tabindex="-1"><section class="auth-copy" aria-label="About Finora"><p class="eyebrow">YOUR MONEY, IN VIEW</p><h2>Your money.<br>A clearer picture.</h2><p class="auth-intro">Track everyday spending, plan monthly budgets and make room for your goals.</p><div class="auth-context"><span class="auth-context-rule" aria-hidden="true"></span><p>One familiar workspace for<br><strong>transactions, budgets and savings.</strong></p></div><p class="auth-copy-note">A little more clarity for everyday decisions.</p></section><section class="auth-card" aria-labelledby="auth-heading"><h1 id="auth-heading" tabindex="-1">${signup?'Create your account':'Welcome back'}</h1><p class="auth-description">${signup?'Your personal finance workspace starts here.':'Sign in to your Finora workspace.'}</p><p class="auth-notice" role="status" ${notice?'':'hidden'}>${escape(notice)}</p><div class="auth-errors" id="auth-errors" role="alert" tabindex="-1" hidden></div><form id="${signup?'signup':'login'}-form" class="auth-form" novalidate>${signup?field('name','Name','text','Your name','name'):''}${field('email','Email','email','you@example.com','username')}${field('password','Password','password',signup?'At least 8 characters':'Enter your password',signup?'new-password':'current-password')}${signup?field('confirm','Confirm password','password','Re-enter your password','new-password'):''}<button class="button primary auth-submit" type="submit">${signup?'Sign up':'Login'}</button></form>${signup?'<p class="auth-registration-note">Registration stays in this browser. Use a made-up password.</p>':`<div class="auth-divider"><span>or continue with</span></div><button class="button secondary auth-google" type="button" data-auth-action="google">${googleLogo}<span>Continue with Google</span></button><p class="auth-google-note">Simulated sign-in · no Google account connection</p><div class="auth-demo-credentials"><strong>Sign-in credentials</strong><p>Email: <span>demo@finora.com</span><br>Password: <span>Finora@123</span></p></div>`}<p class="auth-switch">${signup?'Already have an account? <a href="#login">Log in</a>':'New to Finora? <a href="#signup">Sign up</a>'}</p></section></main><footer class="auth-footer"><span>Finora · Personal finance</span><p>Sign-in is simulated, not secure authentication. Data stays in this browser; no bank connection.</p></footer></div>`;
    if(focus)document.querySelector('#auth-heading').focus({preventScroll:true});
  }
  function showErrors(errors,message='Please check the highlighted fields.'){
    document.querySelectorAll('.auth-field input').forEach(input=>{const error=errors[input.name];input.toggleAttribute('aria-invalid',!!error);if(error)input.setAttribute('aria-invalid','true');document.querySelector(`#auth-${input.name}-error`).textContent=error||'';});
    const summary=document.querySelector('#auth-errors');summary.textContent=message;summary.hidden=false;summary.focus();
  }
  function signIn(account,provider){
    try{sessionStorage.setItem(AUTH_SESSION_KEY,JSON.stringify({name:account.name,email:account.email,provider}));}
    catch{showErrors({},'Browser storage is unavailable. Allow storage to start this demo session.');return;}
    onAuthenticated();
  }
  document.addEventListener('submit',event=>{
    if(!['login-form','signup-form'].includes(event.target.id))return;
    event.preventDefault();const signup=event.target.id==='signup-form',values=Object.fromEntries(new FormData(event.target)),errors=validateAuth(values,signup);
    if(Object.keys(errors).length){showErrors(errors);return;}
    const email=values.email.trim().toLowerCase();
    if(signup){
      const saved=accounts();
      if([DEMO_ACCOUNT.email,GOOGLE_DEMO_ACCOUNT.email,...saved.map(a=>a.email)].includes(email)){showErrors({email:'This email is already in use. Try another or log in.'});return;}
      const account={name:values.name.trim(),email,password:values.password};
      try{localStorage.setItem(AUTH_ACCOUNTS_KEY,JSON.stringify([...saved,account]));}
      catch{showErrors({},'Browser storage is unavailable. Allow storage to save a demo registration.');return;}
      signIn(account,'credentials');
    }else{
      const account=[DEMO_ACCOUNT,...accounts()].find(a=>a.email===email&&a.password===values.password);
      if(!account){showErrors({},'Email or password does not match an account.');return;}
      signIn(account,'credentials');
    }
  });
  document.addEventListener('click',event=>{if(!session()&&event.target.closest('[data-auth-action="google"]'))signIn(GOOGLE_DEMO_ACCOUNT,'google-demo');});
  return {session,isAuthenticated:()=>!!session(),render,logout(){try{sessionStorage.removeItem(AUTH_SESSION_KEY);}catch{return false;}history.replaceState(null,'','#login');render({focus:true,notice:'You are logged out. Your financial records are still on this device.'});return true;}};
}
