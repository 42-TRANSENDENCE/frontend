주의하실점은, react-custom-scrollbars 패키지가 React 14~16 구버전에 의존하고 있기 때문에,<br/>
이 프로젝트를 사용하는 순간부터 새로운 패키지를 설치할 때마다 --legacy-peer-deps 옵션을 붙여줘야 합니다.<br/>
($npm i [package] --legacy-peer-deps)

작업 front router는 http://localhost:5173/chat/ <br/>
임시 백엔드는 https://github.com/42-TRANSENDENCE/hyoslee_chat.git 에서 be폴더 진입 후, 패키지 다운로드받고, $npm start
