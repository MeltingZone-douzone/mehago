## MEHAGO

db설정 변경...

backend/models/dbconn.js

```javascript
module.exports = function () {
    return mysql.createConnection({
        host: "127.0.0.1:3306",
        port: 3307,
        user: "mehago",
        password: "mehago",
        database: "mehago",
    });
};
```

application.yml

```yml
# datasource
datasource:
  driver-class-name: org.mariadb.jdbc.Driver
  url: jdbc:mysql://127.0.0.1:3306/mehago?characterEncoding=utf8
  username: mehago
  password: mehago
  initialSize: 10
  maxActive: 100
```

start

```bash
$ npm run dev
```

spring-boot
경로 : /api

backend
경로 : /chat

webpack.config.xml

```javascript
  proxy:{
          '/api': 'http://localhost:8080',
          '/chat': 'http://localhost:8888'           
        }
```

### 구조

링크 달아야 함

### jwt

링크 달아야 함
