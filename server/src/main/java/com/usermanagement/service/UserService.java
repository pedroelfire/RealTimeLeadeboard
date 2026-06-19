package com.usermanagement.service;

import com.usermanagement.dto.request.CreateUserRequestDto;
import com.usermanagement.dto.request.UpdateUserRequestDto;
import com.usermanagement.dto.response.UserResponseDto;
import com.usermanagement.exception.ResourceNotFoundException;
import com.usermanagement.mapper.UserMapper;
import com.usermanagement.model.User;
import com.usermanagement.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public UserService(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    @Transactional(readOnly = true)
    public List<UserResponseDto> getAllUsers() {
        return userRepository.findAll().stream().map(userMapper::toDto).toList();
    }

    @Transactional(readOnly = true)
    public UserResponseDto getUserById(Long id) {
        return userMapper.toDto(getUserOrThrow(id));
    }

    public UserResponseDto createUser(CreateUserRequestDto dto) {
        User user = new User(dto.getEmail(), dto.getName());
        return userMapper.toDto(userRepository.save(user));
    }

    public UserResponseDto updateUser(Long id, UpdateUserRequestDto dto) {
        User user = getUserOrThrow(id);
        if (dto.getEmail() != null)
            user.setEmail(dto.getEmail());
        if (dto.getName() != null)
            user.setName(dto.getName());
        return userMapper.toDto(user);
    }

    public void deleteUser(Long id) {
        User user = getUserOrThrow(id);
        userRepository.delete(user);
    }

    private User getUserOrThrow(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", id));
    }
}
