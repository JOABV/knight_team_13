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
## Server url:
>### http://101.132.96.76:8080

## User:
>.../user

### 1. register
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

### 2. login
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
  "account.html"
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
### 3. lost luggage service
>.../lost_luggage

- RequestBody

```
{
  "police_number":"123",
  "time":"hh:mm",
  "date":"dd/mm/yyyy",
  "reason":"xxxxxxxxxxxxxxxxx",
  "remark":"xxxxxxxxxxxxx",
  "pricy":"xxxx"        // It has to be in dollars
}
```
- ResponseBody

```
//success
{
  "Saved"  
}
```
```
//error
{
  "it aleady exists"
}
```
## Staff
>.../staff

### 1. login
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
  "account.html"
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
### 2. lost luggage service
>.../lost_luggage

- RequestBody

```
{
  "police_number":"123"
}
```
- ResponseBody

```
//success
{
  "police_number":"123",
  "time":"hh:mm",
  "date":"dd/mm/yyyy",
  "reason":"xxxxxxxxxxxxxxxxx",
  "remark":"xxxxxxxxxxxxx",
  "pricy":"xxxx"        // It has to be in dollars
}
```
```
//error
{
  "it doesn't exist"
}
```
