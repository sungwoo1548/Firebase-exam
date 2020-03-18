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

  1. PC에서 react 프로젝트를 빌드한다

     1. > yarn build

     2.  build 폴더에서 index.html 파일을 열어 내가 작성한 내용이 맞는지 확인한다.

  2. firebase 사이트에서 storage 사용 설정

     1. 지역은 asia-northeast1 (도쿄) 로 선택

  3. firebase cli 설치

     1. > npm i -g firebase-tools

     2. > firebase login

        로그인 명령어를 입력하면 크롬에서 연동하는 화면이 나옴

     3. > firebase init

        ![image](https://user-images.githubusercontent.com/21153016/76745729-badedd80-67b9-11ea-990a-4caae6d608b3.png)

        첫질문 : y

        ![image](https://user-images.githubusercontent.com/21153016/76745827-dcd86000-67b9-11ea-807c-72319a819b72.png)

        hosting 과 storage 선택

        ![image](https://user-images.githubusercontent.com/21153016/76745994-1e690b00-67ba-11ea-8f8e-192cf4cd7cda.png)

        Use an existing project에 화살표 두고 엔터! ( 셋팅 단계에서 이미 프로젝트 생성했음. )

        ![image](https://user-images.githubusercontent.com/21153016/76746216-7dc71b00-67ba-11ea-97bd-c03c3ab41d09.png)

        내가 만든 프로젝트 이름 선택하고 엔터!

        ![image](https://user-images.githubusercontent.com/21153016/76746287-9fc09d80-67ba-11ea-9785-355cc91ea506.png)

        hosting 설정 단계임. 배포 할 때 사용되는 html파일의 위치 지정하는 것임. 
        --> react는 build 를 통해 index.html을 생성함. 

        (public)을 지우고 build로 변경 후 엔터!

        ![image](https://user-images.githubusercontent.com/21153016/76746577-13fb4100-67bb-11ea-862b-dcadafb3a0ae.png)

        배포에 사용될 html의 이름을 지정하는 내용인데, 기본값이 index.html 이냐고 묻는 것임

        y 입력 후 엔터!

        ![image](https://user-images.githubusercontent.com/21153016/76746711-4a38c080-67bb-11ea-936c-20d7537b7a62.png)

        Storage 설정 단계로 storage접근 권한을 적어놓은 파일이 무엇인지 묻는 내용

        그냥 엔터!

        ![image](https://user-images.githubusercontent.com/21153016/76746803-72282400-67bb-11ea-8f02-8a30500770e8.png)

        설정 완료!!!

  4. 배포해보기

     1. > firebase deploy

        ![image](https://user-images.githubusercontent.com/21153016/76746965-b4516580-67bb-11ea-9269-88b0a8a85734.png)

        이미 로그인되어있고, init까지 했으므로 firebase deploy 명령어 하나로 자동 배포됨.

        마지막 줄에 hosting URL로 접속하면 내가 만든 사이트가 떠야함.
        

     2. firebase 사이트에서 확인하기

        ![image](https://user-images.githubusercontent.com/21153016/76747272-3b9ed900-67bc-11ea-94ab-c044b41edb63.png)

        hosting 탭을 보면 `프로젝트명.web.app` 과 `프로젝트명.firebaseapp.com` 이라는 2개의 주소가 생성되는데, 어느것을 써도 상관없음. 
        

     * ========= 5번 내용 이후는 Server 작업 후 진행 ==============

  5. Firebase SDK 적용 후 local test

  6. 배포하기



### 2. Server - `Node JS`

1. <img src="https://user-images.githubusercontent.com/21153016/76597822-b8278280-6544-11ea-8eac-de647c013183.png" alt="image"  />