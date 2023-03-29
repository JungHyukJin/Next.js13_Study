# Next.JS 기초
### React.JS는 Library, Next.JS는 Framework
---
#### 특징 :
1. 앱에 있는 페이지들이 미리 렌더링이 된다. (pre rendering)
2. React.JS는 CSR, 브라우저가 자바스크립트를 가져와서 Client-side의 자바스크립트가 모든 UI를 만들어 `<div id='root'></div>`안에 보여준다. 인터넷 속도 이슈로 하얀 화면을 보거나 깜빡거리는 현상이 자주 일어난다. 렌더링 전까지 유저는 아무것도 볼 수 없다.
3. 반면, Next.JS는 정적 프리렌더링을 하기 때문에, 유저가 웹사이트에 진입하면 초기 상태의 component로 된 미리 생성된 HTML 페이지를 보게된다. 클라이언트쪽에서 코드를 다운받아 react를 실행시키는 시간을 기다리지 않아도 된다. SEO에도 굉장히 좋다.
4. hydration 기능 : <br>
   처음에 화면이 렌더링 되고, react.js가 클라이언트로 전송됐을 때, 기능들이 연결되어서 정상적으로 동작하게 된다. react.js를 프론트엔드 안에서 실행하는 것을 hydration이라고 한다.
---

- Next.JS 설치 
>  $ npx create-next-app@latest

>  타입스크립트 같이 사용 : <br>
>  $ npx create-next-app@latest --typescript

- 실행
> $ npm run dev

- pages폴더 안 전부 삭제 후 index.js 추가.
- index.js 내용이 Home에 처음 보이는 뷰이다.
  - 라우터 설정이 필요가 없다.
- pages폴더 안에 about컴포넌트를 생성 후 /about url로 접속 시 about페이지가 보여진다.
  - 라우팅 작업에 사용하는 많은 시간을 절약할 수 있다. ( raect-router-dom 설치 및 설정이 필요 없음 )
- URL 주소의 이름은 pages폴더 안의 컴포넌트의 이름으로 결정된다. 해당 컴포넌트 안에 선언된 함수의 이름과는 무관하다.
```js
// about.js
// export default는 꼭 필요
// import React from 'react' -> React Hooks를 사용하지 않는다면 필요 없음.

export default function aboutFunction() {
    return (
        <div>about</div>
    )
};

// URL --> localhost:3000/about ( /컴포넌트명 )
```
- 하지만, home에 표시되는 index컴포넌트는 /index로 접속이 불가능하다. 오직 /로만 접속 가능.
- Next.Js 는 a태그로 Navigation기능을 구현하지 않는다. Link태그를 사용해야 한다.

```js 
<Link href="/"> Home </Link> 

<Link href="/about"> About </Link>
```
- App.js는 우리가 만들 모든 페이지를 커스터마이징 할 수 있는 청사진같은 장소이다.
  - _app.js로 무조건 이 이름으로 만들어야 한다.
  - Next.JS가 index.js를 확인하기 전에 _app.js를 먼저 확인하고 렌더링 한다. ( global적인 요소들을 여기에 작성하면 된다. )
  - _app.js안에 함수 이름은 아무거나 상관없다.
```js
import "../styles/globals.css";
import NavBar from "@/components/NavBar";

export default function App({Component, pageProps}) {
  return (
    <>

        <Component {...pageProps}/>
        <div>Footer</div>
    </>
  )
}
```
- `<Component/>에 만든 컴포넌트가 렌더링된다.`<br/><br/>
<img src="./readmeImgs/1.png"/>

- Next.JS가 렌더링을 할 때 컴포넌트들을 가져다가 _app.js의 props에 있는 component에 전달한다.
- 컴포넌트에서 css를 임포트하고 싶다면, 반드시 module이어야 한다. 하지만 _app.js에서는 import가 가능하다. -> global로 적용해야하는 css를 쉽게 적용할 수 있다.
- `<NavBar />`처럼 공통적으로 적용해야 하는 컴포넌트가 있다면 _app.js에 적용하면 된다!