# Interview
## Show All Interviews
Returns json datas about all interviews.

* **URL**

    /interviews

* **Method**

    `GET`

* **URL Params**

    `tag: string = "all"`

    `limit: number = 4`

    `offset: number = 0`

* **Data Params**

    `None`

* **Success Response**
    - **Code**: 200

      **Content**:

~~~json
{
    "data": [
        {
            "tags": [ "vue", "react"],
            "_id": "5cf1423357cd510271cd9289",
            "question": "question example",
            "answer": "answer example",
            "createdAt": "2019-05-31T15:03:15.726Z",
            "updateAt": "2019-05-31T15:03:15.727Z",
            "__v": 0,
        },
        {
            "tags": [ "vue" ],
            "_id": "5cf1427257cd512221cd928c",
            "question": "question example2",
            "answer": "answer example2",
            "createdAt": "2019-05-31T15:04:18.294Z",
            "updateAt": "2019-05-31T15:04:18.294Z",
            "__v": 0,
        },
    ],
    "links": [
        {
            "rel": "prev",
            "href": null
        },
        {
            "rel": "next",
            "href": "https://api.ironmental.net/interviews?tag={tag}&limit=4&offset=4"
        }
    ]
}

~~~

* **Error Response:**

## Show interview
Returns json data about single interview.

* **URL**

    /interviews/:id

* **Method**

    `GET`

* **URL Params**

    `id: ObjectId = ObjectId("5cf142b857cd51f683cd928e")`

* **Data Params**

    `None`

* **Success Response**
    - **Code**: 200

      **Content**:

```json

{
    "tags": [ "html", "nodejs"],
    "_id": "5cf142b857cd51f683cd928e",
    "question": "DOM과node.js에 대해 설명하시오",
    "answer": "DOM은 돔이고 node.js는 node.js다.",
    "createdAt": "2019-05-31T15:05:28.527Z",
    "updateAt": "2019-05-31T15:05:28.527Z",
    "__v": 0
}

```

* **Error Response:**

# Subscriber
## Add Subscriber
Inserts data about subscriber.

* **URL**

  /

* **Method**

    `POST`

* **URL Params**

    `None`

* **Data Params**

    `{ "email" : "subscriber@example.com" }`
    

* **Success Response**
    - **Code**: 200

      **Content**:


**1. 구독자 리스트에 없는 메일 주소일 경우**

```json

{
    "message": "인증메일을 보냈으니 확인해주세요 :)",
    "isSub": false,
    "isCertify": false
}
```

**2. 구독했으나 인증이 완료되지 않은 경우**

```json

{
    "message": "인증되지 않은 구독자입니다. 인증메일을 보냈으니 확인해주세요 :)",
    "isSub": true,
    "isCertify": false
}
```

**3. 이미 인증이 완료된 구독자의 메일 주소일 경우**
```json
{
    "message": "이미 구독자입니다 :D",
    "isSub": true,
    "isCertify": true
}
```

* **Error Response:**

# Tag
## Show All Tags

Returns json datas about a tags data.

* **URL**

    /tags

* **Method:**

    `GET`
  
*  **URL Params**

    `None`
 
   
* **Data Params**
  
    `None`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**

```json
{
    "tags": ["tags"]
}
```
* **Error Response:**

# Auth
## Send Confirm code
Sends confirm code to check whether user already subscribes.

* **URL**

    /confirm

* **Method:**

    `POST`
  
*  **URL Params**

    `None`
   
* **Data Params**
  
    `{ "confirmCode": [uuid] }`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**

```json
{ "message": "인증되었습니다 :D" }
```

* **Error Response:**

```json
{ "message": "잘못된 인증 코드입니다." }
```