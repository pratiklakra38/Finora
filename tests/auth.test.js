import test from 'node:test';
import assert from 'node:assert/strict';
import {validateAuth,DEMO_ACCOUNT,AUTH_SESSION_KEY,AUTH_ACCOUNTS_KEY} from '../js/auth.js';
import {STORAGE_KEY} from '../js/domain.js';
test('demo credentials and auth keys are separate from financial data',()=>{assert.equal(DEMO_ACCOUNT.email,'demo@finora.com');assert.equal(DEMO_ACCOUNT.password,'Finora@123');assert.notEqual(AUTH_SESSION_KEY,STORAGE_KEY);assert.notEqual(AUTH_ACCOUNTS_KEY,STORAGE_KEY);});
test('login requires a valid email and password',()=>{assert.deepEqual(Object.keys(validateAuth({email:'bad',password:''})),['email','password']);assert.deepEqual(validateAuth({email:' demo@finora.com ',password:'Finora@123'}),{});});
test('signup validates name, email, password length and confirmation',()=>{assert.deepEqual(Object.keys(validateAuth({name:' ',email:'bad',password:'short',confirm:'other'},true)),['name','email','password','confirm']);assert.deepEqual(validateAuth({name:'Aditi Demo',email:'aditi@example.test',password:'Campus@123',confirm:'Campus@123'},true),{});assert.ok(validateAuth({name:'x'.repeat(61),email:'a@example.test',password:'x'.repeat(129),confirm:'x'.repeat(129)},true).name);});
test('signup requires a confirmation when both password inputs are empty',()=>{assert.ok(validateAuth({name:'Aditi Demo',email:'aditi@example.test',password:'',confirm:''},true).confirm);});
