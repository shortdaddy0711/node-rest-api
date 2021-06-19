# Dwitter API

## SUMMARY

| no. | Method   | Description                | URL                            |
| :-: | :------- | :------------------------- | :----------------------------- |
|  1  | `GET`    | get all tweets             | /api/tweets                    |
|  2  | `GET`    | get a tweet by id          | /api/tweets/:id                |
|  3  | `GET`    | get all tweets of one user | /api/tweets?username=:username |
|  4  | `POST`   | creat a tweet              | /api/tweets                    |
|  5  | `PUT`    | update a tweet             | /api/tweets/:id                |
|  6  | `DELETE` | remove a tweet             | /api/tweets/:id                |

## Tweets MODEL

### `Tweet` Schema

```
tweet: {
    id: string,           // Auto generate
    body: string,
    name: string,
    url: string,          // optional
    username: string,
    createAt: date,       // Auto generate
    modifiedAt: date,     // Auto generate
}
```

## Tweets APIs

### `GET` /api/tweets

#### get all tweets

#### Response `200`

```
{
    [tweet1, tweet2, ......]
}
```

### `GET` /api/tweets?username=:username

#### get all tweets for one user

#### Response `200`

```
{
    [tweet1, tweet2, ......]
}
```

### `GET` /api/tweets/:id

#### get a tweet by id

#### Response `200`

```
{
    tweet
}
```

### `POST` /api/tweets

#### create a tweet

#### Request

```
{
    body,
    name,
    username,
    url,         // optional
}
```

#### Response `201`

```
{
    id
}
```

### `PUT` /api/tweets/:id

#### update a tweet

#### Request

```
{
    body,
}
```

#### Response `200`

```
{
    id
}
```

### `DELETE` /api/tweets/:id

#### update a tweet

#### Response `204`

## Auth MODEL

### `Auth` Schema

```
user: {
    id: string,           // Auto generate
    username: string,
    password: string,
    name: string,
    email: string,
    url: string,          // optional
}
```

## Auth APIs

### `POST` /api/Auth/signup

#### register new user

#### Request

```
{
    username: string,
    password: string,
    name: string,
    email: string,
    url: string,          // optional
}
```

#### Response `201`

```
{
    token,
    username,
}
```

### `POST` /api/Auth/login

#### authentication registered user

#### Request

```
{
    username: string,
    password: string,
}
```

#### Response `200`

```
{
    token,
    username,
}
```

### `GET` /api/Auth/me

#### validation for exist token in memory

#### Response `200`

```
{
    token,
    username,
}
```
