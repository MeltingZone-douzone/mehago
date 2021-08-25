## MEHAGO

db설정 변경...

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

```json
  proxy:{
          '/api': 'http://localhost:8080',
          '/chat': 'http://localhost:8888'           
        }
```

### 구조

링크 달아야 함

### jwt

링크 달아야 함
