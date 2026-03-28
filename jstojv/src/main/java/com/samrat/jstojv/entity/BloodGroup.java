package com.samrat.jstojv.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "blood_groups")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BloodGroup extends BaseEntity {

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, unique = true)
    private GroupName name;

    public enum GroupName {
        A_POS("A+"), A_NEG("A-"), B_POS("B+"), B_NEG("B-"), AB_POS("AB+"), AB_NEG("AB-"), O_POS("O+"), O_NEG("O-");

        private final String label;

        GroupName(String label) {
            this.label = label;
        }

        public String getLabel() {
            return label;
        }
    }
}
