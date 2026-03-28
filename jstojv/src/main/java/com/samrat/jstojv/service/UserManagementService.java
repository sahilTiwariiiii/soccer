package com.samrat.jstojv.service;

import com.samrat.jstojv.entity.*;
import com.samrat.jstojv.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserManagementService {

    private final AttendanceRepository attendanceRepository;
    private final PayrollRepository payrollRepository;
    private final LeaveRequestRepository leaveRequestRepository;
    private final SalaryStructureRepository salaryStructureRepository;
    private final UserRepository userRepository;

    // --- Attendance Operations ---
    @Transactional
    public Attendance clockIn(Long userId, Attendance.ClockInfo clockInInfo) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Attendance attendance = Attendance.builder()
                .user(user)
                .date(LocalDateTime.now())
                .clockIn(clockInInfo)
                .hospital(user.getHospital())
                .branch(user.getBranch())
                .status(Attendance.Status.Present)
                .build();
        return attendanceRepository.save(attendance);
    }

    @Transactional
    public Attendance clockOut(Long userId, Attendance.ClockInfo clockOutInfo) {
        LocalDateTime todayStart = LocalDateTime.now().withHour(0).withMinute(0).withSecond(0);
        LocalDateTime todayEnd = LocalDateTime.now().withHour(23).withMinute(59).withSecond(59);
        
        List<Attendance> attendances = attendanceRepository.findByUserIdAndDateBetween(userId, todayStart, todayEnd);
        if (attendances.isEmpty()) {
            throw new RuntimeException("No clock-in found for today");
        }
        
        Attendance attendance = attendances.get(0);
        attendance.setClockOut(clockOutInfo);
        // Calculate work hours logic can be added here
        return attendanceRepository.save(attendance);
    }

    // --- Leave Operations ---
    @Transactional
    public LeaveRequest applyLeave(LeaveRequest request) {
        return leaveRequestRepository.save(request);
    }

    @Transactional
    public LeaveRequest approveLeave(Long leaveId, User approver, String comment) {
        LeaveRequest request = leaveRequestRepository.findById(leaveId)
                .orElseThrow(() -> new RuntimeException("Leave request not found"));
        request.setStatus(LeaveRequest.Status.Approved);
        request.setApprovedBy(approver);
        request.setComment(comment);
        return leaveRequestRepository.save(request);
    }

    // --- Payroll Operations ---
    @Transactional
    public Payroll generatePayroll(Long userId, Integer month, Integer year) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        SalaryStructure salaryStructure = salaryStructureRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Salary structure not found for user"));
        
        Payroll payroll = Payroll.builder()
                .user(user)
                .month(month)
                .year(year)
                .basic(salaryStructure.getBasic())
                .hra(salaryStructure.getHra())
                .conveyance(salaryStructure.getConveyance())
                .specialAllowance(salaryStructure.getSpecialAllowance())
                .medicalAllowance(salaryStructure.getMedicalAllowance())
                // Deductions and Net Salary calculation
                .hospital(user.getHospital())
                .branch(user.getBranch())
                .paymentStatus(Payroll.Status.Pending)
                .build();
        return payrollRepository.save(payroll);
    }
}
