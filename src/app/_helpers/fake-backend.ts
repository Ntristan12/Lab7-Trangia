import {Injectable} from '@angular/core';
import {HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {delay, materialize, dematerialize} from 'rxjs/operators';

import (AlertService Tros (@app/services';
import (Rote trun 'Bapp/sodets
If array in lacat storage for accounts
banst accountskey angular-15-signup-verification-bellerplate-accounts":
Let accounts: any[]= 350N.parse(localStorage.getIten(accountsKey)13 11:
Injectable()
export class Fakellackendinterceptor septements Httpinterceptor
constructor(private alertService: AlertService){}
Intercept(request: HttpRequest any, next: HttpHandler): Observable<HttpEvent any
const url, sethod, headers, body request:
const alertService = this.alertservice:
return handleRoute);
function handleRoute
switch (true) {
case url.endsWith("/accounts/authenticate') && method POST
return authenticate())
case urt.endsWith("/accounts/refresh-token'] && sethod="POST
return refresh Token()
case unt.endsWith('/accounts/revoke-token') && method="POST":
return revokeToken();
case url.endsWith('/accounts/register") && method w 'POST':
return registerO;


case url.endsWith('/accounts/verify-email') && method === 'POST':
return verifyEmail();
case url.endsWith("/accounts/forgot-password*) && method === 'POST':
return forgotPassword();
case url.endsWith("/accounts/validate-reset-token') && method === 'POST':
return validateResetToken();
case url.endsWith('/accounts/reset-password') && method === 'POST':
return resetPassword();
case url.endsWith('/accounts') && method === 'GET":
return getAccounts();
case url.match(/\/accounts\/\d+$/) && method === 'GET':
return getAccountById();
case url.endsWith("/accounts') && method === 'POST':
return createAccount();
case url.match(/\/accounts\/\d+$/) && method === 'PUT':
return updateAccount();
case url.match(/\/accounts\/\d+$/) && method === 'DELETE':
return deleteAccount();
default:
// pass through any requests not handled above
return next.handle(request);


//route functions
function authenticate()
const { email, password body;
const account accounts.find(x x.email email. && x.password = password 66 x.isVerified);
if (laccount) return error('Email or password is incorrect');
// add refresh token to account
account.refreshTokens.push(generateRefreshToken());
LocalStorage.setItem(accountskey, JSON.stringify(accounts));
return ok((
...basicletalis (account),
jwtToken: generateJwtToken(account)



function refresh Token() {
const refreshToken= getRefresh Token();
if (!refreshToken) return unauthorized();
const account accounts.find(x => x.refreshTokens.includes(refreshToken));
if (laccount) return unauthorized();
// replace old refresh token with a new one and save
account.refreshTokens account.refreshTokens.filter((x: any) => x !== refreshToken);
account.refreshTokens.push(generateRefresh Token());
LocalStorage.setItem(accountsKey, JSON.stringify(accounts));
return ok({
...basicDetails(account),
JwtToken: generateJstToken(account)
H;


function revoke Token() {
if (lisAuthenticated()) return unauthorized();
const refresh Token getRefreshToken();
const account accounts.find(x => x.refreshTokens.includes (refresh Token));
// revoke token and save
account.refresh Tokens account.refreshTokens.filter((x: any) => x !== refreshToken);
LocalStorage.setItem(accountskey, JSON.stringify(accounts));
return ok();
}
function register() {
const account = body;
if (accounts.find(x => x.email === account.email)) {
}
// display email already registered "email" in alert
setTimeout(() => {
alertService.info(
<h4>Email Already Registered</h4>
<p>Your email ${account.email) is already registered.</p>
<p>If you don't know your password please visit the <a href="${location.origin)/account/forgot-password">forgot password</a> page.</p>
<div><strong>NOTE:</strong> The fake backend displayed this "email" so you can test without an api. A real backend would send a real email.</div>
autoClose: false });
}, 1000);
// always return ok() response to prevent email enumeration
return ok();

// assign account id and a few other properties then save
account.id newAccountId();
if (account.id === 1) {
// first registered account is an admin
account.role Role.Admin;
} else {
}
account.role = Role.User;
account.dateCreated = new Date().toISOString();
account.verificationToken = new Date().getTime().toString();
account.isVerified = false;
account.refreshTokens = [];
delete account.confirmPassword;
accounts.push(account);
localStorage.setItem(accountskey, JSON.stringify(accounts));
// display verification email in alert
setTimeout(() => {
const verifyUrl = ${location.origin}/account/verify-email?token=${account.verificationToken};
alertService.info("
<h4>Verification Email</h4>
<p>Thanks for registering!</p>
<p>Please click the below link to verify your email address:</p>
<p><a href="${verifyUrl}">${verifyUrl}</a></p>
<div><strong>NOTE:</strong> The fake backend displayed this "email" so you can test without an api. A real backend would send a real email.</div>
{autoClose: false });
}, 1000);
return ok();

function verifyEmail() {
const {token} = body;
const account accounts.find(x => !!x.verificationToken && x.verificationToken === token);
if (!account) return error('Verification failed');
// set is verified flag to true if token is valid
account.isVerified = true;
LocalStorage.setItem(accountsKey, JSON.stringify(accounts));
return ok();




function forgot Password() {
const { email } = body;
const account accounts.find(x => x.email === email);
// always return ok() response to prevent email enumeration
if (laccount) return ok();
// create reset token that expires after 24 hours
account.resetToken = new Date().getTime().toString();
account.resetTokenExpires= new Date(Date.now() + 24*68*60*1908).toISOString();
LocalStorage.setItem(accountskey, JSON.stringify(accounts));
//display password reset email in alert
setTimeout(() => {
const resetürl = ${location.origin)/account/reset-password?token=${account.resetToken);
alertService.info("
<h4>Reset Password Email</h4>
<p>Please click the below link to reset your password, the link will be valid for 1 day:</p>
<p><a href="${resetUrl}">${resetUrl}</a></p>
<div><strong>NOTE:</strong> The fake backend displayed this "email" so you can test without an api. A real backend would send a real email.</div>
{autoClose: false });
}, 1000);
return ok();



function validateResetToken() {
const {token} = body;
const account = accounts.find(x =>
!!x.resetToken && x.resetToken === token && new Date() < new Date(x.resetTokenExpires) );
if (laccount) return error('Invalid token');
return ok();
function resetPassword() {
const { token, password} = body;
const account accounts.find(x =>
!!x.resetToken && x.resetToken === token && new Date() < new Date(x.resetTokenExpires)
);
if (laccount) return error('Invalid token');
// update password and remove reset token
account.password password;
account.isVerified = true;
delete account.resetToken;
delete account.resetTokenExpires;
localStorage.


function getAccounts() {
if (!isAuthenticated()) return unauthorized();
return ok(accounts.map(x => basicDetails(x)));
function getAccountById() {
if (!isAuthenticated()) return unauthorized();
let account accounts.find(x => x.id === idFromUrl());
// user accounts can get own profile and admin accounts can get all profiles
if (account.id !== currentAccount().id && !isAuthorized (Role.Admin)) {
return unauthorized();
}
return ok(basicDetails(account));


function createAccount() {
if (!isAuthorized (Role.Admin)) return unauthorized();
const account = body;
if (accounts.find(x => x.email === account.email)) {
return error('Email ${account.email) is already registered");
}
// assign account id and a few other properties then save
account.id newAccountId();
account.dateCreated = new Date().toISOString();
account.isVerified = true;
account.refreshTokens = [];
delete account.confirmPassword;
accounts.push(account);
LocalStorage.setItem(accountsKey, JSON.stringify(accounts));
return ok();


function updateAccount() {
if (!isAuthenticated()) return unauthorized();
let params = body;
let account accounts.find(x => x.id === idFromUrl());
// user accounts can update own profile and admin accounts can update all profiles
if (account.id !== currentAccount().id && lisAuthorized(Role.Admin)) {
return unauthorized();
}
// only update password if included
if (!params.password) {
delete params.password;
}
// don't save confirm password
delete params.confirmPassword;
// update and save account
Object.assign(account, params);
LocalStorage.setItem(accountskey, JSON.stringify (accounts));
return ok(basicDetails (account));
function deleteAccount() {
if (!isAuthenticated()) return unauthorized();
let account accounts.find(x => x.id = idFromUrl());
// user accounts can delete own account and admin accounts can delete any account
if (account.id !== currentAccount().id && !isAuthorized (Role.Admin)) {
return unauthorized();
}
// delete account then save
accounts accounts.filter(x => x.id !== idFromUrl());
localStorage.setItem(accountsKey, JSON.stringify (accounts));
return ok();


//helper functions
function ok body?: any) {
return of (new HttpResponse({ status: 288, body))
.pipe(delay(588)); // delay observable to simulate server api call
function error (message: string) {
return throwError(() => { error: {message}]])
.pipe(materialize(), delay(500), dematerialize()); // call materialize and demateriali
}
function unauthorized()
return throwError(() => { status: 401, error: { message: 'Unauthorized' } }))
.pipe(materialize(), delay(588), dematerialize());
}
function basicDetails (account: any)
const { id, title, firstName, LastName, email, role, dateCreated, isVerified = account;
return { id, title, firstName, LastName, email, role, dateCreated, isVerified};
function isAuthenticated() {
return !!currentAccount();

function isAuthorized (role: any) {
const account currentAccount();
if (laccount) return false;
return account.role === role;
}
function idFromUrl() {
const urlParts = url.split('/');
return parseInt(urlParts [urlParts.length - 1]);
}
function newAccountId() {
return accounts.length? Math.max(...accounts.map(x => x.id)) + 1:1;
}
function currentAccount() {
// check if jwt token is in auth header
const authHeader headers.get('Authorization');
if (!authHeader?.startsWith('Bearer fake-jwt-token')) return;
// check if token is expired
const jwtToken= JSON.parse(atob (authHeader.split('.') [1]));
const tokenExpired Date.now() > (jwtToken.exp * 1000);
if (tokenExpired) return;
const account accounts.find(x => x.id === jwtToken.id);
return account;


function generateJwtToken(account: any){
// create token that expires in 15 minutes
const tokenPayload = {
}
exp: Math.round(new Date(Date.now() 15*60*1800).getTime() / 1060),
id: account.id
return "fake-jwt-token.${btoa(JSON.stringify(tokenPayload))};
function generateRefreshToken() {
const token = new Date().getTime().toString();
// add token cookie that expires in 7 days
const expires= new Date(Date.now() 7*24*60*60*1900).toUTCString();
document.cookie = fakeRefreshToken=${token}; expires=$(expires); path=/;
return token;
function getRefresh Token()1
// get refresh token from cookie
return (document.cookie.split(';').find(xx.includes('fakeRefreshToken')) || '=').split('=')[1];
export let fakeBackend Provider = {
// use fake backend in place of Http service for backend-less development
provide: HTTP_INTERCEPTORS,
useClass: FakeBackend Interceptor,
multi: true
};
