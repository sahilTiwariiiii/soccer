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
public class BedWardManagementService {

    private final WardRepository wardRepository;
    private final BedRepository bedRepository;
    private final RoomRepository roomRepository;

    // --- Ward Operations ---
    @Transactional
    public Ward createWard(Ward ward) {
        return wardRepository.save(ward);
    }

    public List<Ward> getAllWards() {
        return wardRepository.findAll();
    }

    // --- Bed Operations ---
    @Transactional
    public Bed createBed(Bed bed) {
        return bedRepository.save(bed);
    }

    public List<Bed> getBedsByRoom(Long roomId) {
        return bedRepository.findByRoomId(roomId);
    }

    public List<Bed> getAvailableBeds(Long branchId) {
        return bedRepository.findByStatus(Bed.BedStatus.Available);
    }

    @Transactional
    public Bed updateBedStatus(Long bedId, Bed.BedStatus status) {
        Bed bed = bedRepository.findById(bedId)
                .orElseThrow(() -> new RuntimeException("Bed not found"));
        bed.setStatus(status);
        return bedRepository.save(bed);
    }
}
