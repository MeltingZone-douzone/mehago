package com.douzone.mehago.vo;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class Mail {
    
    private String address;
    private String title;
    private String message;
}
