package com.samrat.jstojv.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "complaints")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Complaint extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "visit_id")
    private PatientVisit visit;

    @ElementCollection
    @CollectionTable(name = "complaint_list", joinColumns = @JoinColumn(name = "complaint_id"))
    @Column(name = "complaint")
    private List<String> complaints;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by_user_id")
    private User createdByUser;
}
