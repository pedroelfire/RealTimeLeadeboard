package com.usermanagement.dto.request;

import jakarta.validation.constraints.Email;

public class UpdateUserRequestDto {

    @Email(message = "Invalid email format")
    private String email;

    private String name;

    private String password;

    public UpdateUserRequestDto() {
    }

    public UpdateUserRequestDto(String email, String name) {
        this.email = email;
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
