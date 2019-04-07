# knight_team_13
---
#### 1. url: http://101.132.96.76:63342/app/static/
- user
   - register
   - login
   - form
- employee
   - login
   - form

#### 2. Language
- ##### html-en:  
>.../html-en
- ##### html-zh:
>.../html-zh

#### 3. Webpage
- homepage
>.../homepage.html

- register
> .../register.html

----
#  API
## 1. User: http://101.132.96.76:8080/user
- ### register
> .../register

- RequestBody

```
{
  "username":"13123456789",
  "password":"123456"
}
```
- ResponseBody

```
//success
{
  "Success: Saved 13123456789"
}
```
```
//error
{
    "Wrong: the user already exists"
}
```

- ### login
> .../login

- RequestBody

```
{
  "username":"13123456789",
  "password":"123456"
}
```
- ResponseBody

```
//success
{
  "user.html-zh"
}
```
```
//error
// user is not existed
{
  "not exist"
}
//password is wrong
{
    "Wrong password"
}
```
