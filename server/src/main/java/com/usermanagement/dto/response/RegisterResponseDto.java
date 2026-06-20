package com.usermanagement.dto.response;

public class RegisterResponseDto {
    private String message;
    private UserResponseDto user;

    public RegisterResponseDto(String message, UserResponseDto user) {
        this.message = message;
        this.user = user;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public UserResponseDto getUser() {
        return user;
    }

    public void setUser(UserResponseDto user) {
        this.user = user;
    }
}
