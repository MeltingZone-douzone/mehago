## JWT

#### pom.xml

jwt library

```xml
<dependency>
    <groupId>com.auth0</groupId>
    <artifactId>java-jwt</artifactId>
    <version>3.18.1</version>
</dependency>
```

@Component : 직접 작성한 Class를 Bean으로 등록하기 위한 어노테이션

@Value("${spring.jwt.secret}) : application.yml 에서 가져온 value

```java

    @PostConstruct // 주입 받은뒤 실행하는 초기화
    protected void init(){
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes()
        // 가져온 secretkey를 base64로 인코딩
        );
    }
```

```java
    public String generateToken(Account account){
        String token = null;
        try {
            token = JWT.create()
                        .withClaim("userNo", account.getNo())
                        .withClaim("userNickname", account.getNickname())
                        // .withExpiresAt(expiresAt)
                        .sign(generateAlgorithm());

        } catch (Exception e) {
            //TODO: handle exception
            // log.error(e.getMessage());
            e.getStackTrace();
        }

        return token;
    }
```

```json
{
  "clame": "Token에 담을 정보",
  "issuer": "Token 발급자",
  "subject": "Token 제목",
  "issuedate": "Token 발급 시간",
  "expriation": "Token 만료 시간"
}
```

milliseconds
signWith(알고리즘, 비밀키)


### React에서 사용하기 (header 처리)

1. getMapping

```javascript
<button
  onClick={() => {
    axios
      .get("/api/account/test", {
        headers: {
          Authorization: `Bearer ${localStorage.get("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
      });
  }}
>
  auth get
</button>
```

2. postMapping

```javascript
<button
  onClick={() => {
    axios
      .post("/api/account/test", null, {
        headers: {
          Authorization: `Bearer ${localStorage.get("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
      });
  }}
>
  auth post
</button>
```

3. logout
 
```javascript
<button
  onClick={() =>
    axios
      .post("/api/account/logout", null, {
        headers: {
          Authorization: `Bearer ${localStorage.get("token")}`,
        },
      })
      .then((res) => {
        localStorage.remove("token");
      })
  }
>
  logout
</button>
```

### Node에서 token decode하기 (backend)

```javascript
        encodedSecretKey = new Buffer(secretKey).toString('base64');

        jwt.verify(socket.token, encodedSecretKey, function (err, decoded) {
            console.log({ err: err, result: decoded, });
        });
```

