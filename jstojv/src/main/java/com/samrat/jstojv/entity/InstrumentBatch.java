package com.samrat.jstojv.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "instrument_batches")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InstrumentBatch extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hospital_id", nullable = false)
    private Hospital hospital;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "branch_id", nullable = false)
    private Branch branch;

    @Column(name = "batch_number", nullable = false, unique = true)
    private String batchNumber;

    @ElementCollection
    @CollectionTable(name = "instrument_batch_items", joinColumns = @JoinColumn(name = "batch_id"))
    private List<InstrumentBatchItem> instruments;

    @Column(name = "sterilization_date")
    private LocalDateTime sterilizationDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sterilization_by")
    private User sterilizationBy;

    @Column(name = "expiry_date")
    private LocalDateTime expiryDate;

    @Enumerated(EnumType.STRING)
    private Status status = Status.Ready;

    @Embeddable
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class InstrumentBatchItem {
        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "instrument_id", nullable = false)
        private InstrumentMaster instrument;

        @Column(nullable = false)
        private Integer quantity = 1;
    }

    public enum Status {
        Ready, Used, Expired
    }
}
