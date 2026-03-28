package com.samrat.jstojv.controller;

import com.samrat.jstojv.dto.LoginRequest;
import com.samrat.jstojv.dto.LoginResponse;
import com.samrat.jstojv.entity.User;
import com.samrat.jstojv.repository.UserRepository;
import com.samrat.jstojv.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        if (loginRequest.getEmail() == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Please Enter the Email"));
        }
        if (loginRequest.getPassword() == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Please Enter the Password"));
        }

        Optional<User> userOpt = userRepository.findByEmail(loginRequest.getEmail());
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Invalid Credentials"));
        }

        User user = userOpt.get();
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Invalid Credentials"));
        }

        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("id", user.getId());
        extraClaims.put("email", user.getEmail());
        extraClaims.put("role", user.getRole().getName());
        extraClaims.put("hospitalId", user.getHospital().getId());
        extraClaims.put("branchId", user.getBranch().getId());

        String token = jwtUtils.generateToken(user.getEmail(), extraClaims);

        LoginResponse.UserDto userDto = LoginResponse.UserDto.builder()
                .id(user.getId())
                .email(user.getEmail())
                .role(user.getRole().getName())
                .name(user.getName())
                .employeeId(user.getEmployeeId())
                .hospitalId(user.getHospital().getId())
                .branchId(user.getBranch().getId())
                .build();

        return ResponseEntity.ok(LoginResponse.builder()
                .message("Login Successfully")
                .token(token)
                .user(userDto)
                .build());
    }
}
