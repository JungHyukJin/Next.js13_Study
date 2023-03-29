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
