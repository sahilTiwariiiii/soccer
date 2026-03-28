package com.samrat.jstojv.dto;

import com.samrat.jstojv.entity.OpdToken;
import com.samrat.jstojv.entity.PatientVisit;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PatientVisitResponse {
    private String message;
    private PatientVisit visit;
    private OpdToken token;
}
