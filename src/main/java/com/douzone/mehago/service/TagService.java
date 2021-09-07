package com.douzone.mehago.service;

import java.util.List;

import com.douzone.mehago.repository.TagRepository;
import com.douzone.mehago.vo.Tag;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TagService {

    private final TagRepository tagRepository;

    public boolean createTags(Long chatRoomNo, List<String> tagNames) {
        boolean result = false;
        Tag tag = new Tag();
        for (String tagName : tagNames) {
            Long tagNo = tagRepository.searchTag(tagName);
            tag.setNo((tagNo != null ? tagNo : tagRepository.createTag(tagName)));
            tag.setChatRoomNo(chatRoomNo);
            result = tagRepository.linkTagToChatRoom(tag);
        }
        return result;
    }

}
