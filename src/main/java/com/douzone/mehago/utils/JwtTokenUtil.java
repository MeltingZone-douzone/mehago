package com.douzone.mehago.utils;

import java.io.UnsupportedEncodingException;
import java.util.Base64;
import java.util.Date;

import javax.annotation.PostConstruct;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.douzone.mehago.service.ParticipantService;
import com.douzone.mehago.vo.Account;
import com.douzone.mehago.vo.NonMember;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtTokenUtil {

    // private static final Logger log =LoggerFactory.getLogger(JwtTokenUtil.class);
    private static final long ACCESS_TOKEN_EXPIRE_TIME = 1000 * 60 * 60 * 24 * 2; // 2일
    private static final long NONMEMBER_ACCESS_TOKEN_EXPIRE_TIME = 1000 * 60 * 60 * 12; // 30분
    private final ParticipantService participantService;

    @Value("${spring.jwt.secret}")
    private String secretKey;

    @Value("${spring.jwt.issuer}")
    private String issuer;

    @PostConstruct // 주입 받은뒤 실행하는 초기화
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    public String generateAccessToken(Account account) {
        String token = null;
        try {
            token = JWT.create()
                    .withIssuer(issuer)
                    .withClaim("role", "MEMBER")
                    .withClaim("no", account.getNo())
                    .withClaim("nickname", account.getNickname())
                    .withExpiresAt(new Date(System.currentTimeMillis() + ACCESS_TOKEN_EXPIRE_TIME))
                    .sign(generateAlgorithm());

        } catch (JWTCreationException exception) {
            // Invalid Signing configuration / Couldn't convert Claims.

            // TODO: Exception
        } catch (Exception e) {
            e.printStackTrace();
        }

        return token;
    }

    public String generateAccessToken(NonMember nonMember) {
        String token = null;
        boolean result = false;
        try {
            if (nonMember.getParticipantNo() != null) {
                Date expirationDate = new Date(System.currentTimeMillis() + ACCESS_TOKEN_EXPIRE_TIME);
                result = participantService.setExpirationDate(nonMember, expirationDate);
                if (result) {
                    token = JWT.create()
                            .withIssuer(issuer)
                            .withClaim("role", "NONMEMBER")
                            .withClaim("no", nonMember.getParticipantNo())
                            .withClaim("nickname", nonMember.getNickname())
                            .withExpiresAt(new Date(System.currentTimeMillis() + ACCESS_TOKEN_EXPIRE_TIME))
                            .sign(generateAlgorithm());
                }
            } else { // 비회원으로 시작
                token = JWT.create()
                        .withIssuer(issuer)
                        .withClaim("role", "NONMEMBER")
                        .withExpiresAt(new Date(System.currentTimeMillis() + NONMEMBER_ACCESS_TOKEN_EXPIRE_TIME))
                        .sign(generateAlgorithm());
            }
        } catch (JWTCreationException exception) {
            // Invalid Signing configuration / Couldn't convert Claims.

            // TODO: Exception
        } catch (Exception e) {
            e.printStackTrace();
        }

        return token;
    }

    // 토큰에 필요한 알고리즘 생성
    // Algorithrm, Header에 담을 정보, payload 정보를 JWTCreator 클래스의 sign 메소드를 호출하여 토큰을 만들게
    // 됨
    private Algorithm generateAlgorithm() throws UnsupportedEncodingException {
        return Algorithm.HMAC256(secretKey);
    }
}