package com.douzone.mehago.repository;

import com.douzone.mehago.entities.ChatRoomEntity;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface ES_ChatRoomRepository extends ElasticsearchRepository<ChatRoomEntity, Long> {
    
}
