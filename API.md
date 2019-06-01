# Interview
## Show All Interviews
Returns json datas about all interviews.

* **URL**

    /interviews

* **Method**

    `GET`

* **URL Params**

    `None`

* **Data Params**

    `None`

* **Success Response**
    - **Code**: 200

      **Content**:

~~~json
# if tag is "all"
[
    {
        "tags": [
            "vue",
            "react"
        ],
        "_id": "5cf1423357cd510271cd9289",
        "question": "vue 와 react 글이다2",
        "answer": "vue, react 10글자 넘어야되용 ㅎㅎㅎㅎ2",
        "createdAt": "2019-05-31T15:03:15.726Z",
        "updateAt": "2019-05-31T15:03:15.727Z",
        "__v": 0
    },
    {
        "tags": [
            "vue"
        ],
        "_id": "5cf1427257cd512221cd928c",
        "question": "vue router에 대해서 설명해보세요",
        "answer": "vue rotuer 란 balablabalobaoba",
        "createdAt": "2019-05-31T15:04:18.294Z",
        "updateAt": "2019-05-31T15:04:18.294Z",
        "__v": 0
    },
]
~~~

~~~json
# else
{
    "interviews": [
        {
            "tags": [
                "html",
                "node.js"
            ],
            "_id": "5cf142c257cd51e6b8cd9291",
            "question": "DOM과node.js에 대해 설명하시오2",
            "answer": "DOM은 돔이고 node.js는 node.js다.2",
            "createdAt": "2019-05-31T15:05:38.314Z",
            "updateAt": "2019-05-31T15:05:38.314Z",
            "__v": 0
        },
        {
            "tags": [
                "html",
                "nodejs"
            ],
            "_id": "5cf142b857cd51f683cd928e",
            "question": "DOM과node.js에 대해 설명하시오",
            "answer": "DOM은 돔이고 node.js는 node.js다.",
            "createdAt": "2019-05-31T15:05:28.527Z",
            "updateAt": "2019-05-31T15:05:28.527Z",
            "__v": 0
        }
    ],
    "_id": "5cf142b857cd5127b9cd928f"
}
~~~


## Create Interview
Creates data about interview question and answer.

* **URL**

    /interviews

* **Method**

    `POST`

* **URL Params**

    `None`

* **Data Params**

```json
{
    "question": "~~",
    "answer": "~~",
    "tags": "~~"
}
```

* **Success Response**
    - **Code**: 200

      **Content**: `{ message: "Success" }`


## Show interview
Returns json data about single interview.

* **URL**

    /interviews/:id

* **Method**

    `GET`

* **URL Params**

    `id=[object id]`

* **Data Params**

    `None`

* **Success Response**
    - **Code**: 200

      **Content**:

```json
{
    "tags": [
        "html",
        "nodejs"
    ],
    "_id": "5cf142b857cd51f683cd928e",
    "question": "DOM과node.js에 대해 설명하시오",
    "answer": "DOM은 돔이고 node.js는 node.js다.",
    "createdAt": "2019-05-31T15:05:28.527Z",
    "updateAt": "2019-05-31T15:05:28.527Z",
    "__v": 0
}
```

# Subscriber
## Show All Subscribers
Returns json datas about all subscribers.

* **URL**

    /

* **Method**

    `GET`

* **URL Params**

    `None`

* **Data Params**

    `None`

* **Success Response**
    - **Code**: 200

      **Content**: `{ message: "Success" }`


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

```json
# 구독자 리스트에 없는 메일 주소일 경우
{
    "message": "인증메일을 보냈으니 확인해주세요 :)",
    "isSub": false,
    "isCertify": false
}
```
```json
# 구독했으나 인증이 완료되지 않은 경우
{
    "message": "인증되지 않은 구독자입니다. 인증메일을 보냈으니 확인해주세요 :)",
    "isSub": true,
    "isCertify": false
}
```
```json
# 이미 인증이 완료된 구독자의 메일 주소일 경우
{
    "message": "이미 구독자입니다 :D",
    "isSub": true,
    "isCertify": true
}
```


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
[
    {
        "interviews": [
            "interview_id",
            "interview_id2",
        ],
        "_id": "tag_id",
        "name": "tag_name",
        "createdAt": "created date",
        "__v": 0
    },
    {
        "interviews": [
            "interview_id3",
            "interview_id1",
        ],
        "_id": "tag_id2",
        "name": "tag_name2",
        "createdAt": "created date2",
        "__v": 0
    },
]
```

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
# 인증 코드가 맞을 경우
{ "message": "인증되었습니다 :D" }
```

```json
# 인증 코드가 틀렸을 경우
{ "message": "잘못된 인증 코드입니다." }
```