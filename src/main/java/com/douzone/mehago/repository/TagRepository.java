package com.douzone.mehago.repository;

import com.douzone.mehago.vo.Tag;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class TagRepository {

    private final SqlSession sqlSession;

    public Long createTag(String tagName) {
        Tag tag = new Tag();
        tag.setName(tagName);
        sqlSession.insert("tag.insertTag", tag);
        return tag.getNo();
    }

    public boolean linkTagToChatRoom(Tag tag) {
        return sqlSession.insert("tag.linkTagToChatRoom", tag) == 1 ? true : false;
    }

    public Long searchTag(String tagName) {
        return sqlSession.selectOne("tag.searchTag", tagName);
    }

    public boolean unlinkTag(Long chatRoomNo) {
        return sqlSession.delete("tag.unlinkTag", chatRoomNo) == 1 ? true : false;
    }

}
