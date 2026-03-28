package com.samrat.jstojv.controller;

import com.samrat.jstojv.entity.*;
import com.samrat.jstojv.service.UserManagementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/user-management")
@RequiredArgsConstructor
public class UserManagementController {

    private final UserManagementService userManagementService;
    private final com.samrat.jstojv.repository.UserRepository userRepository;

    // Attendance Endpoints
    @PostMapping("/attendance/clock-in")
    public ResponseEntity<Attendance> clockIn(
            @RequestBody Attendance.ClockInfo clockInInfo,
            @AuthenticationPrincipal UserDetails userDetails) {
        
        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        return new ResponseEntity<>(userManagementService.clockIn(user.getId(), clockInInfo), HttpStatus.CREATED);
    }

    @PostMapping("/attendance/clock-out")
    public ResponseEntity<Attendance> clockOut(
            @RequestBody Attendance.ClockInfo clockOutInfo,
            @AuthenticationPrincipal UserDetails userDetails) {
        
        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(userManagementService.clockOut(user.getId(), clockOutInfo));
    }

    // Leave Endpoints
    @PostMapping("/leave/apply")
    public ResponseEntity<LeaveRequest> applyLeave(@RequestBody LeaveRequest request) {
        return new ResponseEntity<>(userManagementService.applyLeave(request), HttpStatus.CREATED);
    }

    @PostMapping("/leave/{id}/approve")
    public ResponseEntity<LeaveRequest> approveLeave(
            @PathVariable Long id,
            @RequestBody String comment,
            @AuthenticationPrincipal UserDetails userDetails) {
        
        User approver = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(userManagementService.approveLeave(id, approver, comment));
    }

    // Payroll Endpoints
    @PostMapping("/payroll/generate")
    public ResponseEntity<Payroll> generatePayroll(
            @RequestParam Long userId,
            @RequestParam Integer month,
            @RequestParam Integer year) {
        return new ResponseEntity<>(userManagementService.generatePayroll(userId, month, year), HttpStatus.CREATED);
    }
}
