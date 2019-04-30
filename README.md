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

#### 2. Webpage
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
  "Checkcode":100,
  "Message":"success"
}
```
```
//error
{
  "Checkcode":200,
  "Message":"the user already exists"
}
```

### 2. login
> .../login

- RequestBody

```
{
  "phone_number":"13123456789",
  "password":"123456"
}
```
- ResponseBody

```
//success
{
  "Checkcode":100,
  "Message":"success"
}
```
```
//error
// user is not existed
{
  "Checkcode":200,
  "Message":"the user already exists"
}
//password is wrong
{
  "Checkcode":201,
  "Message":"Wrong password"
}
```
### 3. Get the Claim
>.../lost_luggage/receive

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
  "Checkcode":"201",
  "Message":
  {
      "police_number":"123",
      "phone_number":"13123456789"
      "time":"yyyy/mm/dd/hh/mm",
      "place":"xxxx"
      "reason":"xxxxxxxxxxxxxxxxx",
      "remark":"xxxxxxxxxxxxx",
      "price":"xxxx"        // It has to be in dollars
      "picture":"x0123412edx3",
      "claim_status": 101
  }
}
```
```
//error
{
  "Checkcode":"200"
  "Message":"it doesn't exist"
}
```

### 4. Submit the Claim
>.../lost_luggage/submit

- RequestBody

```
{
  "police_number":"123",
  "phone_number":"13123456789"
  "time":"yyyy/mm/dd/hh/mm",
  "place":"xxxxxx",
  "reason":"xxxxxxxxxxxxxxxxx",
  "remark":"xxxxxxxxxxxxx",
  "price":"xxxx"        // It has to be in dollars
  "picture":"x0123412edx3",
  "claim_status": 101
}
```
- ResponseBody

```
//success
{
  "Checkcode":100,
  "Message":"success"
}
```
```
//error
{
  "Checkcode":200,
  "Message":"Wrong type"
}
{
  "Checkcode":201,
  "Message":"Empty input"
}
{
  "Checkcode":202,
  "Message":"the claim exists"
}
```

### 5. Update the Claim
>.../lost_luggage/update

- RequestBody

```
{
  "police_number":"123",
  "phone_number":"13123456789"
  "time":"yyyy/mm/dd/hh/mm",
  "place":"xxxxxxx",
  "reason":"xxxxxxxxxxxxxxxxx",
  "remark":"xxxxxxxxxxxxx",
  "price":"xxxx"        // It has to be in dollars
  "picture":"x0123412edx3",
  "claim_status": 101
}
```
- ResponseBody

```
//success
{
  "Checkcode":100,
  "Message":"success"
}
```
```
//error
{
  "Checkcode":200,
  "Message":"Wrong type"
}
{
  "Checkcode":201,
  "Message":"Empty input"
}
{
  "Checkcode":202,
  "Message":"the claim exists"
}
```

### 6. personal information
> .../personal_information/pi

- RequestBody

```
{
  "phone_number":"13123456789"
}
```
- ResponseBody

```
//success
{
  "Checkcode":100,
  "photo":"xxxxxxx",
  "id_number":"xxxxxx",
  "Fullname":"xxxxxxxxxxxxxxx",
  "email":"xxxxxxxxxxxxxx"
}
```
```
//error
{
  "Checkcode":200,
  "Message":"the user doesn't exists"
}
```

### 6. personal information
> .../personal_information/ci

- RequestBody

```
{
  "phone_number":"13123456789",
  "photo":"xxxxxxxx",
  "Id_card":"xxxxxx",
  "email":"xxxxxxxxx"
}
```
- ResponseBody

```
//success
{
  "Checkcode":100,
  "Message":"success"
}
```
```
//error
{
  "Checkcode":200,
  "Message":"the user doesn't exists"
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
  "Checkcode":100,
  "Message":"successed"
}
```
```
//error
// The employee is not existed
{
  "Checkcode":200,
  "not exist"
}
//password is wrong
{
    "Checkcode":201,
    "Wrong password"
}
```
### 2. Get the specific Claim list
>.../lost_luggage/list

- RequestBody

```
{
  "length": 10,
  "status": 101,
      //101: to process
      //102: processing
      //103: processed
  "condition":{
        "time":101,
            //101: 正序 // default
            //102: 倒序
        "place":"xxxx",
            //"all": default
        "price": 101
            //0  : all // default
            //101: 0- 100
            //102: 100-1000
            //103: 1000 - 10000
            //104: 10000+
  }
}
```
- ResponseBody

```
//success
{
  "Checkcode":100,
  "claim_list":
  [{
    "police_number":"123",
    "time":"yyyy/mm/dd/hh/mm",
    "place":"xxxxxx",
    "price":"xxxxxx",
    },
    {...}
    ...
    ]
}
```

```
//error
{
  "Checkcode":"200"
  "Message":"it doesn't exist"
}
```


### 3. Get the Claim
>.../lost_luggage/one_message

- RequestBody

```
{
  "police_number":"123",
  "status": 101
}
```
- ResponseBody

```
//success
{
  "Checkcode": 100,
  "Message":
  {
    "police_number":"123",
    "phone_number":"13123456789"
    "time":"yyyy/mm/dd/hh/mm",
    "place":"xxxxx",
    "reason":"xxxxxxxxxxxxxxxxx",
    "remark":"xxxxxxxxxxxxx",
    "price":"xxxx"        // It has to be in dollars
    "picture":"x0123412edx3",
    "feedback":"xxxxxxxxxxxxxxxxxxxxx"  
    "claim_status": 101
  }
}
```
```
//error
{
  "Checkcode":"200"
  "Message":"it doesn't exist"
}
```


### 4. Submit the feedback
>.../lost_luggage/feedback_submit

- RequestBody

```
{
  "policy_number":"123"
  "status":101
  "message":"xxxxxxxxxxxxxxxxxxxxxxxx"
}
```
- ResponseBody

```
//success
{
  "Checkcode":100,
  "Message":"success"
}
```
```
//error
{
  "Checkcode":200,
  "Message":"Wrong type"
}
{
  "Checkcode":201,
  "Message":"Empty input"
}
{
  "Checkcode":202,
  "Message":"the claim doesn't exist"
}
```
