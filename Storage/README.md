# Firebase Storage (Cloud Storage)

[TOC]

## Firebase의 Cloud Storage 활용

> 임의의 기기에서 `Server`로 전송된 이미지를 저장하고 `Front`페이지에서 저장된 이미지를 보여주는 기능 구현 



## 셋팅

### 1. Front - `REACT JS`

1. npx create-react-app [이름]  ; 으로 react 앱을 생성 
2. 기본 셋팅 ( front/src/index.js ,  front/src/component/App.js )구조. ( front 첫 commit 확인)

### 2. Server - `Node JS`

1. npm init -y ; 로 package.json 생성  **.gitignore 파일에 꼭 node_modules 추가
2. npm i express ; 로 express 모듈 설치
3. server/index.js 작성
4. server/router/main.js 작성

### 3. Firebase

1.  Firebase 접속 (구글아이디 사용)

2.  프로젝트 생성
   <img src="https://user-images.githubusercontent.com/21153016/76598364-13a64000-6546-11ea-9483-203e1d175274.png" alt="image" style="zoom:50%;" />

   * `+`버튼 눌러서 기본으로 생성 (나중에 각각 설정 가능)
     ( 프로젝트명 > 애널리틱스off > 생성)

3. 프로젝트에서 앱 만들기
   <img src="https://user-images.githubusercontent.com/21153016/76606767-33456480-6556-11ea-8fa7-eaaaed4d6b39.png" alt="image" style="zoom:50%;" />

   * 앱 이름 정하고(공개되지 않음, 나만 알아볼수 있으면 됨) 바로 `앱등록` 클릭

   * 클릭하면 `Firebase SDK 추가` 가 나오는데, 지금은 무시



## Firebase SDK 연결하기

### 1. Firebase SDK for `Front`

[공식 참고 문서]: https://firebase.google.com/docs/web/setup?authuser=0	"자바스크립트 프로젝트에 Firebase 추가"

* `Front` 에서 Firebase SDK를 연결하는 방법은 크게 4가지가 있다.

  1.  호스팅 URL에서 추가 - 가장 쉬운방법 

  2.  index.html에 `<script/>` 태그 사용하여 필요한 리소스(CDN) 적용

     - 셋팅 3.3앱 만들기 후 전환되는 화면에서 바로 확인 할 수 있지만, 
       언제든지 `설정 > 일반 > 하단에 내앱 메뉴 > 내가정한 앱이름`에서 확인 할 수 있다.
       <img src="https://user-images.githubusercontent.com/21153016/76608268-ae0f7f00-6558-11ea-8647-0f1aa733ee84.png" alt="image"  />

       <img src="https://user-images.githubusercontent.com/21153016/76608374-dac39680-6558-11ea-9d0e-ee3956ea02ad.png" alt="image"  />

  3.  모듈 Bundler 사용 - 방식은 Node.js와 같음

  4.  Node.js 앱

     - 위 그림에서 CDN 말고 `구성` 을 선택하면 `firebaseConfig`라는 javascript  객체가 있는데,
       이 객체를 key 값으로 Firebase SDK를 사용할 수있다.



* 나는 Node.js 용 SDK 를 사용할 것임
  1. 



### 2. Server - `Node JS`

1. <img src="https://user-images.githubusercontent.com/21153016/76597822-b8278280-6544-11ea-8eac-de647c013183.png" alt="image"  />