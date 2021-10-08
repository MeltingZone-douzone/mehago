package com.douzone.mehago.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

import lombok.Data;

@Data
@Document(indexName = "participant")
public class ParticipantEntity {
    
    @Id
    private long no;


}
