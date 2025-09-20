package com.kenwrickespinosa.server_api.auth;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.kenwrickespinosa.server_api.security.JwtService;
import com.kenwrickespinosa.server_api.user.User;
import com.kenwrickespinosa.server_api.user.UserService;

@Service
public class AuthService {

    private JwtService jwtService;
    private UserService userService;
    private AuthenticationManager authenticationManager;
    private PasswordEncoder passwordEncoder;

    public AuthService(
        JwtService jwtService,
        UserService userService,
        AuthenticationManager authenticationManager, 
        PasswordEncoder passwordEncoder
        ) {
            this.jwtService = jwtService;
            this.userService = userService;
            this.authenticationManager = authenticationManager;
            this.passwordEncoder = passwordEncoder;
        }

    // User log in
     public String authenticateUser(User user) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                user.getUsername(),
                user.getPassword()
            )
        );
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        return jwtService.generateToken(userDetails.getUsername());
     }

     // User register
     public User registerUser(User user) {
        User newUser = new User();
        newUser.setUsername(user.getUsername());
        newUser.setFirstname(user.getFirstname());
        newUser.setLastname(user.getLastname());
        newUser.setGender(user.getGender());
        newUser.setPassword(passwordEncoder.encode(user.getPassword()));
        newUser.setRole(user.getRole());

        return userService.save(newUser);
    }
}
