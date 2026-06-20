package com.usermanagement.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.usermanagement.exception.ResourceNotFoundException;

import com.usermanagement.dto.request.LoginRequestDto;
import com.usermanagement.dto.request.RegisterRequestDto;
import com.usermanagement.dto.response.LoginResponseDto;
import com.usermanagement.dto.response.RegisterResponseDto;
import com.usermanagement.mapper.UserMapper;
import com.usermanagement.model.User;
import com.usermanagement.repository.UserRepository;
import com.usermanagement.security.JwtProvider;

@Service
@Transactional
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;
    private final JwtProvider jwtProvider;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, UserMapper userMapper,
            JwtProvider jwtProvider) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.userMapper = userMapper;
        this.jwtProvider = jwtProvider;
    }

    public RegisterResponseDto register(RegisterRequestDto dto) {
        User user = new User(dto.getEmail(), dto.getName(), passwordEncoder.encode(dto.getPassword()));
        User savedUser = userRepository.save(user);
        return new RegisterResponseDto("Usuario registrado exitosamente", userMapper.toDto(savedUser));
    }

    public LoginResponseDto login(LoginRequestDto dto) {
        User user = userRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + dto.getEmail()));

        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            throw new ResourceNotFoundException("Wrong password for user with email: " + dto.getEmail());
        }

        String token = jwtProvider.generateToken(user.getEmail());

        return new LoginResponseDto(token, userMapper.toDto(user));
    }
}
