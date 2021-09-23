package com.douzone.mehago.vo;

import lombok.Data;

@Data
public class TokenInfo {
    private Long no;
    private String nickname;
    private boolean isNonMember;

    public Long getNo() {
        return this.no;
    }

    public String getNickname() {
        return this.nickname;
    }

    public boolean getIsNonMember() {
        return this.isNonMember;
    }

    public void setNo(Long no) {
        this.no = no;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public void setIsNonMember(boolean isNonMember) {
        this.isNonMember = isNonMember;
    }

    @Override
    public String toString() {
        return no + nickname + isNonMember;
    }
}
