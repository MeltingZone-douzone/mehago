package com.douzone.mehago.vo;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class NonMember extends TokenInfo {
    private Long participantNo;
    private String nickname;

    public NonMember() {
    }

    public NonMember(TokenInfo tokenInfo) {
        this.participantNo = tokenInfo.getNo();
        this.nickname = tokenInfo.getNickname();
    }
}
