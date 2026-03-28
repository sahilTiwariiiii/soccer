package com.samrat.jstojv.service;

import com.samrat.jstojv.dto.PatientVisitRequest;
import com.samrat.jstojv.dto.PatientVisitResponse;
import com.samrat.jstojv.entity.*;
import com.samrat.jstojv.repository.*;
import com.samrat.jstojv.util.ReceiptUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PatientVisitService {

    private final PatientVisitRepository patientVisitRepository;
    private final PatientRegistrationRepository patientRegistrationRepository;
    private final ReceiptRepository receiptRepository;
    private final RoomRepository roomRepository;
    private final OpdTokenRepository opdTokenRepository;
    private final DepartmentRepository departmentRepository;
    private final UserRepository userRepository;
    private final BranchRepository branchRepository;
    private final HospitalRepository hospitalRepository;

    @Transactional
    public PatientVisitResponse createPatientVisit(PatientVisitRequest request, User currentUser) {
        // 1. Validate patient exists
        PatientRegistration patient = patientRegistrationRepository.findById(request.getPatientId())
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        Hospital hospital = currentUser.getHospital();
        Branch branch = currentUser.getBranch();

        // 2. Generate a unique receipt number
        String receiptNo = ReceiptUtils.generateUniqueReceiptNumber();

        // 3. Fetch related entities
        Department department = null;
        if (request.getDepartmentId() != null) {
            department = departmentRepository.findById(request.getDepartmentId())
                    .orElse(null);
        }

        User doctor = null;
        if (request.getDoctorId() != null) {
            doctor = userRepository.findById(request.getDoctorId())
                    .orElse(null);
        }

        Room room = null;
        if (request.getRoomId() != null) {
            room = roomRepository.findById(request.getRoomId())
                    .orElse(null);
        }

        // 4. Create the patient visit
        PatientVisit patientVisit = PatientVisit.builder()
                .patient(patient)
                .uhid(patient.getUhid())
                .hospital(hospital)
                .branch(branch)
                .visitDate(request.getVisitDate())
                .visitTime(request.getVisitTime())
                .visitType(PatientVisit.VisitType.valueOf(request.getVisitType()))
                .department(department)
                .departmentName(request.getDepartmentName())
                .doctor(doctor)
                .room(room)
                .slot(request.getSlot() != null ? PatientVisit.Slot.valueOf(request.getSlot()) : null)
                .fee(request.getFee())
                .paymentMode(PatientVisit.PaymentMode.valueOf(request.getPaymentMode()))
                .receiptNo(receiptNo)
                .build();

        patientVisit = patientVisitRepository.save(patientVisit);

        // 5. Create the receipt
        Receipt receipt = Receipt.builder()
                .receiptNumber(receiptNo)
                .patient(patient)
                .uhid(patient.getUhid())
                .visit(patientVisit)
                .department(department)
                .doctor(doctor)
                .paymentMode(Receipt.PaymentMode.valueOf(request.getPaymentMode()))
                .discountPercent(request.getDiscountPercent())
                .fee(request.getFee())
                .remarks(request.getRemark())
                .createdBy(currentUser)
                .build();

        receiptRepository.save(receipt);

        // 6. Generate OPD Token if applicable
        OpdToken tokenInfo = null;
        if ("OPD".equals(request.getVisitType()) && room != null) {
            LocalDateTime startOfDay = LocalDateTime.now().with(LocalTime.MIN);
            LocalDateTime endOfDay = LocalDateTime.now().with(LocalTime.MAX);
            
            long count = opdTokenRepository.countByRoomIdAndTokenDateBetween(room.getId(), startOfDay, endOfDay);
            int tokenNumber = (int) count + 1;

            tokenInfo = OpdToken.builder()
                    .hospital(room.getHospital())
                    .branch(room.getBranch())
                    .room(room)
                    .doctor(doctor != null ? doctor : room.getAssignedDoctor())
                    .patient(patient)
                    .visit(patientVisit)
                    .tokenDate(LocalDateTime.now())
                    .tokenNumber(tokenNumber)
                    .priority(OpdToken.Priority.valueOf(request.getPriority() != null ? request.getPriority() : "Normal"))
                    .status(OpdToken.Status.Waiting)
                    .build();

            tokenInfo = opdTokenRepository.save(tokenInfo);
        }

        return PatientVisitResponse.builder()
                .message("Patient visit created successfully")
                .visit(patientVisit)
                .token(tokenInfo)
                .build();
    }
}
