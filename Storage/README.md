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

공식문서 : https://firebase.google.com/docs/web/setup?authuser=0

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

* `Server` 에서 Firebase SDK를 연결하는 방법은 2가지이다.

  1. `Firebase Admin SDK`사용 : 공식문서 - https://firebase.google.com/docs/admin/setup?authuser=0
  2. `Google Cloud Storage API`사용 : 공식문서 - https://googleapis.dev/nodejs/storage/latest

* `Firebase Cloud Storage`는 `Firebase`와 `Google Cloud Platform`이 같은 `Bucket`을 참조하는데, 
  서버에서 `Firebase`의 다른기능들을 이용하려면 1번 방법, 서버가 `Cloud Storage`만 이용하면 2번 방법을 사용하면 된다.

* 나는 나중에 `Firebase` 다른 기능들을 이용할 것을 고려하여 `1번 방법`을 사용함

  1. `Firebase Admin SDK` 의 `새 비공개 키 생성` (클릭하면 json 파일 자동 다운로드됨)
     ![image](https://user-images.githubusercontent.com/21153016/76815189-4dc25b00-6840-11ea-9ce4-c8e0ad3abf05.png)
     -> tip : 오른쪽 상단에 서비스계정관리를 이용하면 용도에 따라 권한이 다른 비공개 키를 생성 할 수 있다.
     -> tip : git을 사용하고 비공개 키 파일을 프로젝트폴더 안에 추가 한다면, 비공개 키 파일을 `.gitignore`에 추가하자!

  2. `Firebase Admin SDK`  구성 스니펫 코드에 추가
     ![image](https://user-images.githubusercontent.com/21153016/76815437-f96bab00-6840-11ea-84af-d7f709f54ec8.png)

     * 1행을 보자 

       ```js
       var admin = require("firebase-admin")
       ```

       > npm i firebase-admin

       -> firebase-admin 설치필요

     * 3행을 보자

       ```js
       var serviceAccount = require("path/to/serviceAccountKey.json")
       ```

       `serviceAccountkey.json` : 위에서 다운로드한 비공개키 파일

       `path/to` : 다운로드한 경로 

     * 마지막 행

       ```js
       admin.initializeApp({
         credential: admin.credential.cert(serviceAccount),
         databaseURL: "https://kick-storage-exam.firebaseio.com"
       });
       ```

       `admin.initializeApp` : server 구동시 `initializeApp` method를 통해 `"내가 Admin 이다!"` 를 인증함.

       `credential` : 다운로드한 비공개 키로부터 Admin 인증에 필요한 정보를 가져옴.

       `databaeURL` : 자동으로 작성되는 내용인데, 이번 예제에서는 Storage를 사용함으로 주석처리 해도 됨.

       *`storageBucket` : Storage를 이용하기 위해 추가해야함.  Firebase 사이트에서 왼쪽메뉴중 Storage선택하면 gs://<BUCKET_NAME>.appspot.com 이라는 주소가 나옴.

       입력할 때는 gs://를 빼고 아래와 같이 입력하면 됨.

       ```js
       admin.initializeApp({
         credential: admin.credential.cert(serviceAccount),
         // databaseURL: "",
         storageBucket : <BUCKET_NAME>.appspot.com
       });
       ```

     * sever 개발 코드에 추가하기

       개발폴더/`firebaseAdmin.js `생성

       ```js
       // firebaseAdmin.js
       const admin = require("firebase-admin");
       
       const serviceAccount = require("path/to/serviceAccountKey.json");
       
       admin.initializeApp({
           credential: admin.credential.cert(serviceAccount),
           //databaseURL: "",
           storageBucket : <BUCKET_NAME>.appspot.com
       });
       
       const BUCKET = admin.storage().bucket();  // storage init 매서드
  
       module.exports = { BUCKET }; // 이 BUCKET으로 필요할 때, storage 작업 할 거임
     ```
     
3. upload router 구성
  
     * 개발폴더/router/`upload.js` 생성
  
       ```js
       // upload.js
       const express = require("express");
       const router = express.Router();
       
       const BUCKET = require("../firebaseAdmin")
       
       router.post("/image", (req, res) => {
           /*
           localhost:3000/upload/image 로 요청된 이미지를
           Storage로 업로드하는 작업
           */
       });
       
     module.exports = router;
       ```
     
     * 개발폴터/index.js 수정

       ```js
       // index.js
       ...
       // middle-ware
       app.use("/",require("./router/main"));
       app.use("/upload",require("./router/upload")); // 여기 추가
       ...
       ```
  
  4. 이미지 업로드 시나리오
  
     * PC에서 `Server`로 [Postman 프로그램]( https://www.postman.com) 이용해서 content/type : multipart/formdata로 전송 할 거임
     * `Server`에서는 [multer](https://github.com/expressjs/multer/blob/master/doc/README-ko.md)라는 모듈 사용해서 업로드된 파일을 읽을 것임
  
  5. multer 설치 후 코드 적용
  
     * > npm i multer
  
     * upload.js 수정
  
       ```js
       // upload.js
       const express = require("express");
       const router = express.Router();
       
       const multer = require("multer"); // multer 모듈 불러오기
       const upload = multer({ storage: multer.memoryStorage() }).any(); // multer 설정
       
       const BUCKET = require("../firebaseAdmin")
       
       router.post("/image", (req, res) => {
           upload(req, res, (err) => { // req,res를 multer로 전달
               if (err instanceof multer.MulterError) {
                   // A Multer error occurred when uploading.
               } else if (err) {
                   // An unknown error occurred when uploading.
               }
       
               // read file
               const file_list = req.files;  // req.files에 정보 담김
               console.log("file_list : ", file_list);   // termial에서 file 구조 확인.
               
               res.status(200).json({ file: file_list });
           });
       });
       
       module.exports = router;
       ```
  
       -> multer의 자세한 내용은 [여기](https://github.com/expressjs/multer/blob/master/doc/README-ko.md)에서 확인 
  
  6. multer 에서 읽은 파일 storage로 저장하기
  
     * 위에서 `file_list`에 업로드 된 file 정보가 배열로 들어 있음.
       이 예제에서는 1개의 이미지 파일을 업로드 할 것임으로 업로드한 이미지는 `file_list[0]`에 들어있음
  
     * `Firebase`코드 적용
       -> Firebase Admin SDK를 사용하여 BUCKET 매서드를 참조하면 `Google Cloud Storage Client Library` 규칙을 사용하여 작업을 처리할 수 있음 ([링크](https://googleapis.dev/nodejs/storage/latest/))
  
       ```js
       // upload.js
       ...
       router.post("/image", (req, res) => {
           upload(req, res, (err) => { // req,res를 multer로 전달
               ...
       
               // read file
               const file_list = req.files;  // req.files에 정보 담김
               console.log("file_list : ", file_list);   // termial에서 file 구조 확인.
       
               if (file_list.length === 0) {
                   res.status(400).json({ error: "no file" });
                   return;
               }
       
               // firebase storage
               const file_to_up = BUCKET.file(file_list[0].originalname); // file 매서드로 file이름 지정
               file_to_up.save(file_list[0].buffer)
                   .then(() => {
                       res.status(200).json({ msg: "file uploaded" });
                       return;
                   })
                   .catch(err => {
                       res.status(500).json({ error: err.toString() });
                       return;
                   });
           });
       });
       ...
       ```
  
       -> `BUCKET`의 매서드인 `file`을 통해 파일명을 정하고, `file`의 매서드인 `save`를 통해 저장하면됨 `save`에 인자로 들어가야할 data는 버퍼값을 넣으면 됨. `save(data[=buffer])`
       자세한 내용은 [여기](https://googleapis.dev/nodejs/storage/latest/File.html#save) 참고 (Bucket.file().save() 에 관한 내용)
  
  7. 저장결과 확인하기
  
     * `Firebase` 사이트에 접속 하여 `Storage` 를 눌러보면 새로운 파일이 업로드 된것을 확인할 수 있다.
  
       ![image](https://user-images.githubusercontent.com/21153016/76933233-04513900-6930-11ea-9ff2-9b795782e98e.png)
  
       