# Hospital Management System (HMS) Workflow Guide

This documentation provides a comprehensive guide to the architecture and operational flow of our HMS, following the standards used in large-scale hospital systems ("Big HMS").

---

## **1. Core Principle: One Patient, Many Visits**

The fundamental principle of a robust HMS is the separation of the **Patient** from their **Visits**.

-   **Patient (`PatientRegistration`):** A single, permanent record for an individual, identified by a **UHID (Universal Health ID)**. This record is created only once and holds demographic information.
-   **Visit (`PatientVisit`):** A record of a specific encounter a patient has with the hospital. A patient can have many visits over time (e.g., 10 OPD consultations and 3 IPD admissions over 5 years). Each visit gets a unique **Visit ID**.

This model ensures a unified, chronological medical history for every patient, which is critical for quality of care.

---

## **2. The Patient Journey: Step-by-Step Workflow**

### **Phase 1: Patient Identification (The Front Desk / Registration Panel)**

This is the most critical step. The goal is to find an existing patient or register a new one.

**Question: How do we know if a patient is already registered?**

We use the patient's **mobile number** as the primary identifier.

-   **Action:** The front desk operator enters the patient's mobile number into the system.
-   **API Call:** The system internally calls an equivalent of `GET /api/v1/patients/search?mobile={number}`.
-   **Workflow:**
    1.  **Patient Found?**
        -   **YES:** The system retrieves the existing patient's details (UHID, name, etc.). The operator confirms the identity with the patient. **No new registration is needed.** Proceed to **Phase 2**.
        -   **NO:** The patient is new. The operator proceeds to register them.
    2.  **New Patient Registration:**
        -   **Action:** Operator fills in the patient's demographic details.
        -   **API Call:** `POST /api/v1/patients/register`
        -   **Outcome:** A new `PatientRegistration` record is created with a unique UHID. The system now has this patient on record for all future encounters.

---

### **Phase 2: Creating a Visit (OPD or IPD)**

Once the patient is identified (either found or newly registered), we must create a record for today's visit.

**Question: Do we use a different API for OPD and IPD?**

No. We use a single, unified API for all types of visits.

-   **Action:** The operator selects the type of visit (OPD or IPD), the department, and the doctor.
-   **API Call:** `POST /api/v1/patients/visits`
-   **Key Request Body Fields:**
    -   `patientId`: The ID of the patient from Phase 1.
    -   `visitType`: **"OPD"** or **"IPD"**. This is the crucial differentiator.
    -   `departmentId`, `doctorId`, etc.
-   **Outcome:**
    -   A new `PatientVisit` record is created and linked to the patient's UHID.
    -   A `PatientReceipt` is generated for the consultation or admission fee.
    -   **If `visitType` is "OPD":** An `OpdToken` is automatically generated for the doctor's queue. The patient's journey continues in the **OPD Workflow**.
    -   **If `visitType` is "IPD":** The patient is now marked as "Ready for Admission." Their journey continues in the **IPD Workflow**.

---

### **Phase 3A: The OPD Workflow (Consultation)**

1.  **Queue Management:** The patient waits in the queue, tracked by their `OpdToken`.
2.  **Doctor's Panel:** The doctor sees the patient in their queue.
3.  **Consultation & Summary:**
    -   **API:** `POST /api/v1/opd/summary`
    -   **Action:** The doctor records all clinical findings for this visit: complaints, diagnosis, prescription (treatment), investigation orders, and notes.

---

### **Phase 3B: The IPD Workflow (Admission & In-Patient Care)**

1.  **Bed Allocation:**
    -   **API:** `POST /api/v1/ipd/admissions`
    -   **Action:** An administrator assigns the patient to an available bed.
    -   **Outcome:** An `IPDAdmission` record is created, which generates a unique **Admission Number (IPN)**. The bed status is marked as "Occupied."
2.  **In-Patient Care:**
    -   Doctors record daily progress notes (`POST /api/v1/ipd/daily-notes`).
    -   Nurses record vitals and care notes (`POST /api/v1/ipd/nursing-notes`).
3.  **Discharge:**
    -   **API:** `PATCH /api/v1/ipd/admissions/{id}/discharge`
    -   **Action:** The patient is formally discharged, and a discharge summary is created. The bed status is updated (e.g., to "Cleaning").

---

## **Design Rationale & Best Practices**

**Question: Can we have separate registrations for OPD and IPD?**

This should be avoided. A unified registration system is the standard for all major HMS platforms for critical reasons:

1.  **Unified Medical History:** A patient is one person. Their medical history—whether from an OPD visit for a fever or an IPD stay for surgery—must be in one place. Separating registration would create dangerous information silos, where a doctor in one department might not see critical history from another.
2.  **Data Integrity:** It prevents duplicate records for the same patient, which corrupts data and leads to administrative chaos.
3.  **Operational Efficiency:** If a patient transitions from OPD to IPD (a common scenario), a unified system makes it a seamless process of "admission" rather than a cumbersome "new registration."

The current flow correctly implements this best-practice model.
