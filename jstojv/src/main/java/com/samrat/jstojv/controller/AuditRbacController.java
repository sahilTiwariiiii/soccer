package com.samrat.jstojv.controller;

import com.samrat.jstojv.entity.*;
import com.samrat.jstojv.service.AuditRbacService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
public class AuditRbacController {

    private final AuditRbacService auditRbacService;

    // Audit Log Endpoints
    @GetMapping("/audit-logs/user/{userId}")
    public ResponseEntity<List<AuditLog>> getUserLogs(@PathVariable Long userId) {
        return ResponseEntity.ok(auditRbacService.getUserLogs(userId));
    }

    // Role Endpoints
    @PostMapping("/roles")
    public ResponseEntity<Role> createRole(@RequestBody Role role) {
        return new ResponseEntity<>(auditRbacService.createRole(role), HttpStatus.CREATED);
    }

    @GetMapping("/roles")
    public ResponseEntity<List<Role>> getAllRoles() {
        return ResponseEntity.ok(auditRbacService.getAllRoles());
    }

    @PostMapping("/users/{userId}/assign-role/{roleId}")
    public ResponseEntity<User> assignRoleToUser(@PathVariable Long userId, @PathVariable Long roleId) {
        return ResponseEntity.ok(auditRbacService.assignRoleToUser(userId, roleId));
    }
}
