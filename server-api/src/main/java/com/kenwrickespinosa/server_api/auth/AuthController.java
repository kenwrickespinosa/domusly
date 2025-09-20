package com.kenwrickespinosa.server_api.auth;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kenwrickespinosa.server_api.security.JwtService;
import com.kenwrickespinosa.server_api.user.User;
import com.kenwrickespinosa.server_api.user.UserService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private AuthService authService;
    private JwtService jwtService;
    private UserService userService;

    public AuthController(AuthService authService, JwtService jwtService, UserService userService) {
        this.authService = authService;
        this.jwtService = jwtService;
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> authenticateUser(@RequestBody User user) {
        String token = authService.authenticateUser(user);
        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/signup")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        // if (userService.existsByUsername(user.getUsername())) {
        //     return ResponseEntity.noContent().build();
        // }

        // return ResponseEntity.ok("User registered successfully");
        try {
            authService.registerUser(user);
            return ResponseEntity.ok("User registered successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<Map<String, String>> getAuthUser(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String token = authHeader.substring(7);    // Remove the `Bearer` to just get the token

        String username = jwtService.getUsernameFromToken(token);

        User user = userService.findByUsername(username);

        Map<String, String> response = new HashMap<>();
        response.put("Firstname", user.getFirstname());
        response.put("Lastname", user.getLastname());

        return ResponseEntity.ok(response);
    }
}
