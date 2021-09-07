#### backend

## mysql



application.yml 

```javascript
   datasource:
      driver-class-name: org.mariadb.jdbc.Driver
      url: jdbc:mysql://192.168.80.112:3307/mehago?characterEncoding=utf8
      username: mehago
      password: mehago
```

dbconn.js

```javascript
    return mysql.createConnection({
        host: "192.168.80.112",
        port: 3307,
        user: "mehago",
        password: "mehago",
        database: "mehago",
    });
```