<a href="https://zzdd1558.tistory.com/222">redis 참고 사이트</a>

### Redis - DataBase

1. join 할 때 redis에 참가자 데이터를 넣음
    (다른 브라우저에서 같은 아이디로 접속하더라도 중복을 방지할 수 있다)

redis set을 하게 되면 value가 같은 데이터를 중복해서 넣을 수 없음

```bash
> sadd room24 "test"
(integer) 1
> smembers room24
1) "test"
> scard room24
(integer) 1
```

```javascript
redisClient.sadd(`room${curRoom}`, participantObject.no);
```

```bash
$ sadd "roomname" "participant"
```

2. chatting시 참가자들의 수를 찾기


```javascript
const chatMembers = redisClient.scard(currentRoom);
```

```bash
> SCARD "roomname"
(integer) 2
```

3. disconnect시 참가자에서 제거

```javascript
redisClient.srem(currentRoom, messageObj.participantNo)
```

```bash
> SREM "roomname" "participant"
(integer) 1
```

