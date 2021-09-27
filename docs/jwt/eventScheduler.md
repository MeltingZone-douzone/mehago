1. eventSheduler???

주기적으로 쿼리를 실행해 줄 수 있음.
사용목적: 비회원의 토큰 기간이 만료 됨에 따라서 (알수없음)으로 변경해 준다.

``` sql
CREATE
    [DEFINER = user]
    EVENT
    [IF NOT EXISTS]
    event_name
    ON SCHEDULE schedule
    [ON COMPLETION [NOT] PRESERVE]
    [ENABLE | DISABLE | DISABLE ON SLAVE]
    [COMMENT 'string']
    DO event_body;

schedule: {
    AT timestamp [+ INTERVAL interval] ...
  | EVERY interval
    [STARTS timestamp [+ INTERVAL interval] ...]
    [ENDS timestamp [+ INTERVAL interval] ...]
}

interval:
    quantity {YEAR | QUARTER | MONTH | DAY | HOUR | MINUTE |
              WEEK | SECOND | YEAR_MONTH | DAY_HOUR | DAY_MINUTE |
              DAY_SECOND | HOUR_MINUTE | HOUR_SECOND | MINUTE_SECOND}
```

1. database 설정

이벤트 스케쥴러의 on/off여부 확인

```sql
show variables like 'event%';  
```

이벤트 스케쥴러 on/off 설정

```sql
set GLOBAL event_scheduler = ON;
set GLOBAL event_scheduler = off;
```

이벤트 스케쥴러 정보 확인

```sql
SELECT * FROM information_schema.events;
```

1. create eventSheduler

비회원은 토큰의 유효기간이 지나면 다시 사용할 수 없으므로
닉네임을 (알수없음)으로 변경 해 다른회원들이 알 수 있도록 한다.

실행 주기 정해야 됨 >> 5 분

create

```sql
create event if not exists tokenExpiration
on schedule	every 5 minute
on completion not preserve
enable
comment 'non-member nickname to (알수없음)'
do
	update participant
    set chat_nickname="(알수없음)", is_deleted=1
    where expiration_date<now();
```

drop

```sql
    drop event tokenExpiration;
```

test data
```sql
 update participant set chat_nickname = "와테스트중" where no = 27;
 update participant set expiration_date = now() where no = 27;
```

