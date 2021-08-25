package com.douzone.mehago.exceptions;

public class InvalidJwtException extends RuntimeException{

    private static final long serialVersionUID = 1L;

    public InvalidJwtException(String msg) {
        super(msg);
    }

}
