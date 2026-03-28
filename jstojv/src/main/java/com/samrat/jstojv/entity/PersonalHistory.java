package com.samrat.jstojv.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "personal_histories")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PersonalHistory extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "visit_id")
    private PatientVisit visit;

    @Enumerated(EnumType.STRING)
    private Diet diet;

    @Enumerated(EnumType.STRING)
    private Appetite appetite;

    @Enumerated(EnumType.STRING)
    private Sleep sleep;

    @Enumerated(EnumType.STRING)
    private Bladder bladder;

    @Enumerated(EnumType.STRING)
    private Bowel bowel;

    @Column(name = "current_treatment")
    private String currentTreatment;

    private String comments;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by_user_id")
    private User createdByUser;

    public enum Diet {
        Vegetarian, Non_Vegetarian
    }

    public enum Appetite {
        Normal, Reduced, Increased
    }

    public enum Sleep {
        Normal, Reduced, Increased
    }

    public enum Bladder {
        Consistent, Inconsistent
    }

    public enum Bowel {
        Normal, Loose_Motions, Constipation
    }
}
