package com.samrat.jstojv.dto;

import lombok.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PatientVisitRequest {
    private Long patientId;
    private LocalDate visitDate;
    private LocalTime visitTime;
    private String visitType;
    private Double fee;
    private Long departmentId;
    private String departmentName;
    private Long doctorId;
    private Long roomId;
    private String slot;
    private String paymentMode;
    private Double discountPercent;
    private String remark;
    private String priority;
}
