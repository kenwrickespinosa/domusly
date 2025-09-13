package com.kenwrickespinosa.server_api.security;

import java.util.Collections;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.kenwrickespinosa.server_api.user.User;
import com.kenwrickespinosa.server_api.user.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    private UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException(username + " not found.");
        }
        return new org.springframework.security.core.userdetails.User(
            user.getUsername(),
            user.getPassword(),
            Collections.emptyList()
        );
    }
}
