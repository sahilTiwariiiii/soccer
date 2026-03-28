package com.samrat.jstojv.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "blood_components")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BloodComponent extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hospital_id", nullable = false)
    private Hospital hospital;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "branch_id", nullable = false)
    private Branch branch;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "donation_id", nullable = false)
    private BloodDonation donation;

    @Enumerated(EnumType.STRING)
    @Column(name = "component_type")
    private ComponentType componentType;

    @Column(name = "quantity_ml")
    private Integer quantityML;

    @Column(name = "expiry_date")
    private LocalDateTime expiryDate;

    @Enumerated(EnumType.STRING)
    private Status status = Status.Available;

    public enum ComponentType {
        Whole_Blood("Whole Blood"), PRBC("PRBC"), Platelets("Platelets"), FFP("FFP"), Cryoprecipitate("Cryoprecipitate");

        private final String label;

        ComponentType(String label) {
            this.label = label;
        }

        public String getLabel() {
            return label;
        }
    }

    public enum Status {
        Available, Reserved, Issued, Expired, Discarded
    }
}
