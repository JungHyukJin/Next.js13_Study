# Next.js 13 연습 - 게시판 구현


<br>

---

# Database
- 관계형 : PostgreSQL, MySQL, Oracle...
  - 데이터를 표로 저장 가능하다
  ![Alt text](image.png)
- 비관계형 : mongoDB, Cloud firestore, cassandra...
  - 데이터 저장 방식이 자유롭다
  - 관계형 DB처럼 SQL문법이 필요없다 - 초심자들이 사용하기 좋다
  - 분산처리를 잘해준다 - 많은 입출력의 데이터 처리에 유용하다
  ```json
  {
    data1 : content1,
    data2 : content2,
    data3 : content3,
  }
  ```
<br>

---

# mongoDB 사용
## 1. 세팅
![create database](image-1.png)
- Database : 하나의 프로젝트
- Collection : 하나의 폴더 (내부에 document로 데이터를 저장)

![Alt text](image-3.png)
- 예시 데이터 생성

## 2. 사용
```bash
# 터미널에서 mongoDB 설치
npm install mongodb
```

```js
// @/util/database.js
import { MongoClient } from 'mongodb';
const url = SERVER_URL;
const options = { useNewUrlParser: true };
let connectDB;

// Next.js는 코딩 후 파일을 저장하면 모든 JS파일 코드를 전부 다시 읽고 지나감
// 개발 단계에서 글로벌 변수에 저장 후 재사용을 위해 하기 코드를 작성 후 사용
if (process.env.NODE_ENV === 'development') {
  if (!global._mongo) {
    global._mongo = new MongoClient(url, options).connect()
  }
  connectDB = global._mongo
} else {
  connectDB = new MongoClient(url, options).connect()
}
export { connectDB }

```
- DB입출력 코드는 server component안에서만 사용하는 것이 옳다
- client component에서 작성 시 모든 코드가 유저 브라우저로 전송되기 때문에 좋지 않은 선택이다

<br>

---

# 다이나믹 라우팅 - only client component
```js
'use client'

import {usePathname, useSearchParams, useParams} from 'next/navigation'

export default function DetailLink(){
  let router = useRouter(); // 자바스크립트 코드로 페이지이동 구현
  let url = usePathname(); // 현재 URL
  let searchParams = useSearchParams() // search parameter(query string) 출력
  let params = useParams() // [dynamic route]에 입력한 url 파라미터, ex)/list/id -> (id 출력)
  return (
    <button onClick={()=>{ router.push('/주소') }}>버튼</button>
  )
}

/*
    1. router.push('/주소') : '/주소' 경로로 페이지 이동
    2. router.back() : 뒤로가기
    3. router.forward() : 앞으로가기 
    4. router.refresh() : soft refresh -> 이전과 바뀐점을 분석해서 바뀐 부분만 새로고침 
    5. router.prefetch('/주소') : '/주소'의 내용을 미리 로드해준다.
*/

```