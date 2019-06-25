# Interview

## Show All Interviews

Returns json datas about all interviews.

* **URL**

    `/interviews`

* **Method**

    `GET`

* **URL Params**

    `tag: string = "all"`

    `limit: number = 4`

    `offset: number = 0`

* **Data Params**

    `None`

* **Success Response**
    * *Code*: `200`

    ```json
    {
        "datas": [
            {
                "tags": [ "vue", "react"],
                "id": "5cf1423357cd510271cd9289",
                "question": "question example",
                "answer": "answer example",
                "created": "2019-05-31T15:03:15.726Z",
                "updated": "2019-05-31T15:03:15.727Z",
                "links": {
                    "self": "api.ironmental.net/v1/interviews/5cf1423357cd510271cd9289"
                }

            },
            {
                "tags": [ "vue" ],
                "id": "5cf1427257cd512221cd928c",
                "question": "question example2",
                "answer": "answer example2",
                "created": "2019-05-31T15:04:18.294Z",
                "updated": "2019-05-31T15:04:18.294Z",
                "links": {
                    "self": "api.ironmental.net/v1/interviews/5cf1427257cd512221cd928c"
                }

            },
        ],
        "links": {
            "prev": null,
            "next": "https://api.ironmental.net/interviews?tag={tag}&limit=4&offset=4"
        }
    }
    ```

* **Error Response**
    * *Code:* `400`

    ``` json
    {
        "error" : {
            "status" : 400,
            "message" : "Bad Request"
        }
    }
    ```

    * *Code:* `404`

    ``` json
    {
        "error" : {
            "status" : 404,
            "message" : "Not Found"
        }
    }
    ```

    * *Code:* `500`
    
    ```json
    {
        "error" : {
            "status" : 500,
            "message" : "Internal Server Error"
        }
    }
    ```
---

## Show interview

Returns json data about single interview.

* **URL**

    `/interviews/:id`

* **Method**

    `GET`

* **URL Params**

    `id: ObjectId = ObjectId("5cf142b857cd51f683cd928e")`

* **Data Params**

    `None`

* **Success Response**
    * *Code*: `200`

    ```json

    {
        "tags": [ "html", "nodejs"],
        "id": "5cf142b857cd51f683cd928e",
        "question": "DOM과node.js에 대해 설명하시오",
        "answer": "DOM은 돔이고 node.js는 node.js다.",
        "created": "2019-05-31T15:05:28.527Z",
        "updated": "2019-05-31T15:05:28.527Z",
        "links": {
            "self": api.ironmental.net/v1/interviews/5cf142b857cd51f683cd928e,
        }
    }

    ```

* **Error Response**

    * *Code:* `404`
    
    ```json
    {
        "error" : {
            "status" : 404,
            "message" : "Not Found"
        }
    }
    ```

    * *Code:* `500`
    
    ```json
    {
        "error" : {
            "status" : 500,
            "message" : "Internal Server Error"
        }
    }
    ```

# Subscriber

## Add Subscriber

Inserts data about subscriber.

* **URL**

    `/sub`

* **Method**

    `POST`

* **URL Params**

    `None`

* **Data Params**

    `{ "email" : "subscriber@example.com" }`
    

* **Success Response**
    * *Code*: `200`

        *1. 구독자 리스트에 없는 메일 주소일 경우*

        ```json

        {
            "message": "인증메일을 보냈으니 확인해주세요 :)",
            "isSub": false,
            "isCertify": false
        }
        ```

        *2. 구독했으나 인증이 완료되지 않은 경우*

        ```json

        {
            "message": "인증되지 않은 구독자입니다. 인증메일을 보냈으니 확인해주세요 :)",
            "isSub": true,
            "isCertify": false
        }
        ```

        *3. 이미 인증이 완료된 구독자의 메일 주소일 경우*
        ```json
        {
            "message": "이미 구독자입니다 :D",
            "isSub": true,
            "isCertify": true
        }
        ```

* **Error Response**
    * *Code:* `400`

    ```json
    {
        "error" : {
            "status" : 400,
            "message" : "Bad Reuqest"
        }
    }
    ```

    * *Code:* `500`
    
    ```json
    {
        "error" : {
            "status" : 500,
            "message" : "Internal Server Error"
        }
    }
    ```
# Tag
## Show All Tags

Returns json datas about a tags data.

* **URL**

    /tags

* **Method**

    `GET`
  
* **URL Params**

    `None`
 
   
* **Data Params**
  
    `None`

* **Success Response**

    * *Code:* `200`

    ```json
    {
        "tags": ["tags"]
    }
    ```

* **Error Response:**
    * *Code:* `500`
    
    ```json
    {
        "error" : {
            "status" : 500,
            "message" : "Internal Server Error"
        }
    }
    ```

# Auth

## Send Confirm code

Sends confirm code to check whether user already subscribes.

* **URL**

    `/confirm`

* **Method:**

    `POST`
  
* **URL Params**

    `None`
   
* **Data Params**
  
    `{ "confirmCode": [uuid] }`

* **Success Response**

    * *Code:* `200`
    
    ```json
    {
        "message": "인증되었습니다 :D" 
    }
    ```

* **Error Response**
    * *Code:* `400`
    
    ```json
    {
        "error" : {
            "status" : 400,
            "message" : "Bad Reuqest"
        }
    }
    ```

    * *Code:* `404`
    
    ```json
    {
        "error" : {
            "status" : 404,
            "message" : "Not Found"
        }
    }
    ```

    * *Code:* `500`
    
    ```json
    {
        "error" : {
            "status" : 500,
            "message" : "Internal Server Error"
        }
    }
    ```