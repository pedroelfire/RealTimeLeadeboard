package com.usermanagement.controller;

import com.usermanagement.constant.AuthConstants;
import com.usermanagement.dto.request.LoginRequestDto;
import com.usermanagement.dto.request.RegisterRequestDto;
import com.usermanagement.dto.response.LoginResponseDto;
import com.usermanagement.dto.response.RegisterResponseDto;
import com.usermanagement.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(AuthConstants.AUTH_PATH)
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@Valid @RequestBody LoginRequestDto dto) {
        return ResponseEntity.ok(authService.login(dto));
    }

    @PostMapping("/register")
    public ResponseEntity<RegisterResponseDto> register(@Valid @RequestBody RegisterRequestDto dto) {
        return ResponseEntity.ok(authService.register(dto));
    }
}
