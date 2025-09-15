package com.kenwrickespinosa.server_api.user;

import java.util.List;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public List<User> findAll() {
        List<User> users = userRepository.findAll();
        return users;
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    public boolean existsByUsername(String string) {
        return userRepository.existsByUsername(string);
    }
}
