package com.samrat.jstojv.service;

import com.samrat.jstojv.entity.*;
import com.samrat.jstojv.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuditRbacService {

    private final AuditLogRepository auditLogRepository;
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;

    // --- Audit Log Operations ---
    @Transactional
    public AuditLog logAction(AuditLog log) {
        return auditLogRepository.save(log);
    }

    public List<AuditLog> getUserLogs(Long userId) {
        return auditLogRepository.findByUserId(userId);
    }

    // --- RBAC Operations ---
    @Transactional
    public Role createRole(Role role) {
        return roleRepository.save(role);
    }

    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    @Transactional
    public User assignRoleToUser(Long userId, Long roleId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new RuntimeException("Role not found"));
        
        user.setRole(role);
        return userRepository.save(user);
    }
}
