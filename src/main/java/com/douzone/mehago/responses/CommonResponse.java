package com.douzone.mehago.responses;

import lombok.Setter;
import lombok.Getter;

@Setter @Getter
public class CommonResponse<T> {

    private String result;
    private T data;
    private String message;

    private CommonResponse() {}

    private CommonResponse(T data) {
        this.result = "success";
        this.data = data;
    }

    private CommonResponse(String message) {
        this.result = "fail";
        this.message = message;
    }

    public static CommonResponse<Object> success(Object data) {
        return new CommonResponse<Object>(data);
    }

    public static CommonResponse<Object> fail(String message) {
        return new CommonResponse<Object>(message);
    }
}
