-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(50) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `passwordHash` VARCHAR(255) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `lastLogin` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_username_key`(`username`),
    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `staff_profiles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `firstName` VARCHAR(50) NOT NULL,
    `lastName` VARCHAR(50) NOT NULL,
    `staffNumber` VARCHAR(30) NOT NULL,
    `designation` VARCHAR(100) NOT NULL,
    `phone` VARCHAR(20) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `staff_profiles_userId_key`(`userId`),
    UNIQUE INDEX `staff_profiles_staffNumber_key`(`staffNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `departments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(30) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `description` VARCHAR(255) NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `departments_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `roles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `description` VARCHAR(255) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `roles_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `permissions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(80) NOT NULL,
    `module` VARCHAR(50) NOT NULL,
    `description` VARCHAR(255) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `permissions_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_roles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `roleId` INTEGER NOT NULL,
    `assignedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `user_roles_userId_roleId_key`(`userId`, `roleId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role_permissions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `roleId` INTEGER NOT NULL,
    `permissionId` INTEGER NOT NULL,
    `assignedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `role_permissions_roleId_permissionId_key`(`roleId`, `permissionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_departments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `departmentId` INTEGER NOT NULL,
    `assignedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `user_departments_userId_departmentId_key`(`userId`, `departmentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `patients` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `patientNumber` VARCHAR(30) NOT NULL,
    `firstName` VARCHAR(50) NOT NULL,
    `lastName` VARCHAR(50) NOT NULL,
    `otherNames` VARCHAR(50) NULL,
    `dateOfBirth` DATE NOT NULL,
    `gender` ENUM('MALE', 'FEMALE', 'OTHER') NOT NULL,
    `phone` VARCHAR(20) NULL,
    `email` VARCHAR(100) NULL,
    `address` TEXT NULL,
    `bloodGroup` VARCHAR(5) NULL,
    `genotype` VARCHAR(5) NULL,
    `emergencyContactName` VARCHAR(100) NULL,
    `emergencyContactPhone` VARCHAR(20) NULL,
    `emergencyContactRel` VARCHAR(50) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `patients_patientNumber_key`(`patientNumber`),
    INDEX `patients_patientNumber_idx`(`patientNumber`),
    INDEX `patients_lastName_firstName_idx`(`lastName`, `firstName`),
    INDEX `patients_phone_idx`(`phone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `patient_contacts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `patientId` INTEGER NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `relationship` VARCHAR(50) NOT NULL,
    `phone` VARCHAR(20) NOT NULL,
    `email` VARCHAR(100) NULL,
    `address` TEXT NULL,
    `isNextOfKin` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `visits` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `visitNumber` VARCHAR(30) NOT NULL,
    `patientId` INTEGER NOT NULL,
    `departmentId` INTEGER NULL,
    `visitType` ENUM('OUTPATIENT', 'EMERGENCY', 'INPATIENT') NOT NULL DEFAULT 'OUTPATIENT',
    `status` ENUM('REGISTERED', 'AWAITING_TRIAGE', 'AWAITING_CONSULTATION', 'AWAITING_INVESTIGATION', 'AWAITING_PAYMENT', 'COMPLETED', 'CANCELLED') NOT NULL DEFAULT 'REGISTERED',
    `priority` ENUM('ROUTINE', 'URGENT', 'EMERGENCY') NOT NULL DEFAULT 'ROUTINE',
    `chiefComplaint` TEXT NULL,
    `arrivalTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `closureTime` DATETIME(3) NULL,
    `closedById` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `visits_visitNumber_key`(`visitNumber`),
    INDEX `visits_visitNumber_idx`(`visitNumber`),
    INDEX `visits_patientId_idx`(`patientId`),
    INDEX `visits_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `appointments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `patientId` INTEGER NOT NULL,
    `doctorId` INTEGER NULL,
    `departmentId` INTEGER NULL,
    `scheduledAt` DATETIME(3) NOT NULL,
    `status` ENUM('SCHEDULED', 'CONFIRMED', 'CHECKED_IN', 'COMPLETED', 'CANCELLED', 'NO_SHOW') NOT NULL DEFAULT 'SCHEDULED',
    `reason` VARCHAR(255) NULL,
    `bookedById` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `appointments_patientId_idx`(`patientId`),
    INDEX `appointments_scheduledAt_idx`(`scheduledAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `admissions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `admissionNumber` VARCHAR(30) NOT NULL,
    `patientId` INTEGER NOT NULL,
    `visitId` INTEGER NOT NULL,
    `ward` VARCHAR(50) NOT NULL,
    `bedNumber` VARCHAR(20) NOT NULL,
    `admittedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dischargedAt` DATETIME(3) NULL,
    `admittedById` INTEGER NOT NULL,
    `dischargedById` INTEGER NULL,
    `status` ENUM('ADMITTED', 'DISCHARGED', 'TRANSFERRED') NOT NULL DEFAULT 'ADMITTED',
    `dischargeSummary` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `admissions_admissionNumber_key`(`admissionNumber`),
    INDEX `admissions_admissionNumber_idx`(`admissionNumber`),
    INDEX `admissions_patientId_idx`(`patientId`),
    INDEX `admissions_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `observations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `patientId` INTEGER NOT NULL,
    `visitId` INTEGER NOT NULL,
    `recordedById` INTEGER NOT NULL,
    `temperature` DECIMAL(4, 1) NULL,
    `bloodPressureSystolic` INTEGER NULL,
    `bloodPressureDiastolic` INTEGER NULL,
    `pulseRate` INTEGER NULL,
    `respiratoryRate` INTEGER NULL,
    `oxygenSaturation` DECIMAL(5, 2) NULL,
    `weightKg` DECIMAL(5, 2) NULL,
    `heightCm` DECIMAL(5, 2) NULL,
    `painScale` INTEGER NULL,
    `notes` TEXT NULL,
    `recordedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `observations_patientId_idx`(`patientId`),
    INDEX `observations_visitId_idx`(`visitId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `consultations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `patientId` INTEGER NOT NULL,
    `visitId` INTEGER NOT NULL,
    `doctorId` INTEGER NOT NULL,
    `clinicalNotes` TEXT NOT NULL,
    `historyOfPresentingIllness` TEXT NULL,
    `physicalExamination` TEXT NULL,
    `isFinalized` BOOLEAN NOT NULL DEFAULT false,
    `finalizedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `consultations_patientId_idx`(`patientId`),
    INDEX `consultations_visitId_idx`(`visitId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `diagnoses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `consultationId` INTEGER NOT NULL,
    `diagnosisCode` VARCHAR(20) NULL,
    `description` VARCHAR(255) NOT NULL,
    `type` ENUM('PROVISIONAL', 'FINAL') NOT NULL DEFAULT 'PROVISIONAL',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `care_plans` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `consultationId` INTEGER NOT NULL,
    `treatmentPlan` TEXT NOT NULL,
    `followUpDate` DATE NULL,
    `followUpInstructions` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `record_amendments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `entityType` VARCHAR(50) NOT NULL,
    `entityId` INTEGER NOT NULL,
    `originalData` TEXT NOT NULL,
    `amendedData` TEXT NOT NULL,
    `reason` TEXT NOT NULL,
    `amendedById` INTEGER NOT NULL,
    `amendedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `record_amendments_entityType_entityId_idx`(`entityType`, `entityId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lab_test_catalogue` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `testCode` VARCHAR(30) NOT NULL,
    `testName` VARCHAR(100) NOT NULL,
    `category` VARCHAR(50) NOT NULL,
    `description` VARCHAR(255) NULL,
    `sampleType` VARCHAR(50) NOT NULL,
    `unit` VARCHAR(30) NULL,
    `referenceRange` VARCHAR(100) NULL,
    `price` DECIMAL(12, 2) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `lab_test_catalogue_testCode_key`(`testCode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lab_orders` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `orderNumber` VARCHAR(30) NOT NULL,
    `patientId` INTEGER NOT NULL,
    `visitId` INTEGER NOT NULL,
    `orderedById` INTEGER NOT NULL,
    `clinicalNotes` TEXT NULL,
    `priority` ENUM('ROUTINE', 'URGENT', 'EMERGENCY') NOT NULL DEFAULT 'ROUTINE',
    `status` ENUM('ORDERED', 'SAMPLE_COLLECTED', 'PROCESSING', 'AWAITING_VERIFICATION', 'VERIFIED', 'RELEASED', 'CANCELLED') NOT NULL DEFAULT 'ORDERED',
    `orderedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `lab_orders_orderNumber_key`(`orderNumber`),
    INDEX `lab_orders_orderNumber_idx`(`orderNumber`),
    INDEX `lab_orders_patientId_idx`(`patientId`),
    INDEX `lab_orders_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lab_order_items` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `labOrderId` INTEGER NOT NULL,
    `testId` INTEGER NOT NULL,
    `status` ENUM('ORDERED', 'PROCESSING', 'COMPLETED', 'CANCELLED') NOT NULL DEFAULT 'ORDERED',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lab_samples` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `labOrderId` INTEGER NOT NULL,
    `sampleBarcode` VARCHAR(50) NOT NULL,
    `sampleType` VARCHAR(50) NOT NULL,
    `collectedById` INTEGER NULL,
    `collectedAt` DATETIME(3) NULL,
    `status` ENUM('PENDING', 'COLLECTED', 'REJECTED') NOT NULL DEFAULT 'PENDING',
    `rejectionReason` VARCHAR(255) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `lab_samples_sampleBarcode_key`(`sampleBarcode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lab_results` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `orderItemId` INTEGER NOT NULL,
    `resultValue` VARCHAR(255) NOT NULL,
    `unit` VARCHAR(30) NULL,
    `referenceRange` VARCHAR(100) NULL,
    `isAbnormal` BOOLEAN NOT NULL DEFAULT false,
    `remarks` TEXT NULL,
    `status` ENUM('DRAFT', 'VERIFIED', 'RELEASED', 'AMENDED') NOT NULL DEFAULT 'DRAFT',
    `enteredById` INTEGER NOT NULL,
    `enteredAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `verifiedById` INTEGER NULL,
    `verifiedAt` DATETIME(3) NULL,
    `releasedById` INTEGER NULL,
    `releasedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `lab_results_orderItemId_key`(`orderItemId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `medicines` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `drugCode` VARCHAR(30) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `genericName` VARCHAR(100) NULL,
    `category` VARCHAR(50) NOT NULL,
    `dosageForm` VARCHAR(50) NOT NULL,
    `strength` VARCHAR(50) NOT NULL,
    `unitOfMeasure` VARCHAR(30) NOT NULL,
    `minimumStockLevel` INTEGER NOT NULL DEFAULT 10,
    `unitPrice` DECIMAL(12, 2) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `medicines_drugCode_key`(`drugCode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stock_batches` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `medicineId` INTEGER NOT NULL,
    `batchNumber` VARCHAR(50) NOT NULL,
    `expiryDate` DATE NOT NULL,
    `quantityAvailable` INTEGER NOT NULL DEFAULT 0,
    `unitCost` DECIMAL(12, 2) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `stock_batches_expiryDate_idx`(`expiryDate`),
    UNIQUE INDEX `stock_batches_medicineId_batchNumber_key`(`medicineId`, `batchNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stock_transactions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `medicineId` INTEGER NOT NULL,
    `batchId` INTEGER NULL,
    `transactionType` ENUM('RECEIPT', 'DISPENSE', 'ADJUSTMENT', 'RETURN', 'REVERSAL') NOT NULL,
    `quantity` INTEGER NOT NULL,
    `previousStock` INTEGER NOT NULL,
    `newStock` INTEGER NOT NULL,
    `reason` VARCHAR(255) NULL,
    `referenceNumber` VARCHAR(50) NULL,
    `performedById` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `stock_transactions_medicineId_idx`(`medicineId`),
    INDEX `stock_transactions_createdAt_idx`(`createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `prescriptions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `prescriptionNumber` VARCHAR(30) NOT NULL,
    `patientId` INTEGER NOT NULL,
    `visitId` INTEGER NOT NULL,
    `prescribedById` INTEGER NOT NULL,
    `status` ENUM('PENDING', 'PARTIALLY_DISPENSED', 'FULLY_DISPENSED', 'CANCELLED') NOT NULL DEFAULT 'PENDING',
    `notes` TEXT NULL,
    `prescribedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `prescriptions_prescriptionNumber_key`(`prescriptionNumber`),
    INDEX `prescriptions_prescriptionNumber_idx`(`prescriptionNumber`),
    INDEX `prescriptions_patientId_idx`(`patientId`),
    INDEX `prescriptions_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `prescription_items` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `prescriptionId` INTEGER NOT NULL,
    `medicineId` INTEGER NOT NULL,
    `dosage` VARCHAR(50) NOT NULL,
    `route` VARCHAR(50) NOT NULL,
    `frequency` VARCHAR(50) NOT NULL,
    `duration` VARCHAR(50) NOT NULL,
    `quantityPrescribed` INTEGER NOT NULL,
    `quantityDispensed` INTEGER NOT NULL DEFAULT 0,
    `instructions` VARCHAR(255) NULL,
    `status` ENUM('PENDING', 'PARTIALLY_DISPENSED', 'DISPENSED', 'CANCELLED') NOT NULL DEFAULT 'PENDING',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dispensing_records` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `prescriptionItemId` INTEGER NOT NULL,
    `batchId` INTEGER NULL,
    `quantityDispensed` INTEGER NOT NULL,
    `dispensedById` INTEGER NOT NULL,
    `dispensedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `remarks` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `service_catalogue` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `serviceCode` VARCHAR(30) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `category` VARCHAR(50) NOT NULL,
    `description` VARCHAR(255) NULL,
    `price` DECIMAL(12, 2) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `service_catalogue_serviceCode_key`(`serviceCode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `invoices` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `invoiceNumber` VARCHAR(30) NOT NULL,
    `patientId` INTEGER NOT NULL,
    `visitId` INTEGER NULL,
    `totalAmount` DECIMAL(12, 2) NOT NULL,
    `discountAmount` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
    `paidAmount` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
    `balanceDue` DECIMAL(12, 2) NOT NULL,
    `status` ENUM('UNPAID', 'PARTIALLY_PAID', 'PAID', 'CANCELLED') NOT NULL DEFAULT 'UNPAID',
    `createdById` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `invoices_invoiceNumber_key`(`invoiceNumber`),
    INDEX `invoices_invoiceNumber_idx`(`invoiceNumber`),
    INDEX `invoices_patientId_idx`(`patientId`),
    INDEX `invoices_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `invoice_items` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `invoiceId` INTEGER NOT NULL,
    `itemType` ENUM('SERVICE', 'LAB_TEST', 'MEDICINE', 'ADMISSION', 'PROCEDURE', 'OTHER') NOT NULL DEFAULT 'SERVICE',
    `itemId` INTEGER NULL,
    `description` VARCHAR(255) NOT NULL,
    `quantity` INTEGER NOT NULL DEFAULT 1,
    `unitPrice` DECIMAL(12, 2) NOT NULL,
    `totalPrice` DECIMAL(12, 2) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `receiptNumber` VARCHAR(30) NOT NULL,
    `invoiceId` INTEGER NOT NULL,
    `patientId` INTEGER NOT NULL,
    `amount` DECIMAL(12, 2) NOT NULL,
    `paymentMethod` ENUM('CASH', 'POS', 'BANK_TRANSFER', 'CHEQUE', 'OTHER') NOT NULL DEFAULT 'CASH',
    `paymentReference` VARCHAR(50) NULL,
    `status` ENUM('COMPLETED', 'REVERSED') NOT NULL DEFAULT 'COMPLETED',
    `receivedById` INTEGER NOT NULL,
    `paidAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `payments_receiptNumber_key`(`receiptNumber`),
    INDEX `payments_receiptNumber_idx`(`receiptNumber`),
    INDEX `payments_invoiceId_idx`(`invoiceId`),
    INDEX `payments_patientId_idx`(`patientId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `financial_adjustments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `invoiceId` INTEGER NOT NULL,
    `adjustmentType` ENUM('DISCOUNT', 'WAIVER', 'REVERSAL', 'REFUND') NOT NULL,
    `amount` DECIMAL(12, 2) NOT NULL,
    `reason` TEXT NOT NULL,
    `approvedById` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pregnancy_episodes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `episodeNumber` VARCHAR(30) NOT NULL,
    `patientId` INTEGER NOT NULL,
    `lastMenstrualPeriod` DATE NULL,
    `estimatedDateOfDelivery` DATE NULL,
    `gestationalAgeAtBookingWeeks` INTEGER NULL,
    `gravida` INTEGER NOT NULL DEFAULT 1,
    `para` INTEGER NOT NULL DEFAULT 0,
    `aliveChildren` INTEGER NOT NULL DEFAULT 0,
    `abortions` INTEGER NOT NULL DEFAULT 0,
    `bloodGroup` VARCHAR(5) NULL,
    `rhFactor` VARCHAR(10) NULL,
    `serologyStatus` VARCHAR(100) NULL,
    `status` ENUM('BOOKED', 'ACTIVE', 'DELIVERED', 'DISCHARGED', 'COMPLETED', 'CANCELLED') NOT NULL DEFAULT 'BOOKED',
    `bookingDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `pregnancy_episodes_episodeNumber_key`(`episodeNumber`),
    INDEX `pregnancy_episodes_episodeNumber_idx`(`episodeNumber`),
    INDEX `pregnancy_episodes_patientId_idx`(`patientId`),
    INDEX `pregnancy_episodes_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `antenatal_records` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pregnancyEpisodeId` INTEGER NOT NULL,
    `visitId` INTEGER NULL,
    `visitDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `gestationalAgeWeeks` DECIMAL(4, 1) NULL,
    `fundalHeightCm` DECIMAL(4, 1) NULL,
    `fetalHeartRateBpm` INTEGER NULL,
    `fetalPresentation` VARCHAR(50) NULL,
    `fetalLie` VARCHAR(50) NULL,
    `maternalWeightKg` DECIMAL(5, 2) NULL,
    `maternalBloodPressure` VARCHAR(20) NULL,
    `urinalysisProtein` VARCHAR(20) NULL,
    `urinalysisGlucose` VARCHAR(20) NULL,
    `complaints` TEXT NULL,
    `attendedById` INTEGER NOT NULL,
    `nextAppointmentDate` DATE NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `antenatal_records_pregnancyEpisodeId_idx`(`pregnancyEpisodeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `obstetric_histories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `patientId` INTEGER NOT NULL,
    `pregnancyEpisodeId` INTEGER NULL,
    `yearOfPregnancy` INTEGER NOT NULL,
    `gestationalAgeAtDelivery` VARCHAR(30) NULL,
    `deliveryMode` VARCHAR(50) NULL,
    `deliveryLocation` VARCHAR(100) NULL,
    `birthWeightKg` DECIMAL(4, 2) NULL,
    `babyGender` VARCHAR(10) NULL,
    `outcome` VARCHAR(50) NOT NULL,
    `complications` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `labour_episodes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pregnancyEpisodeId` INTEGER NOT NULL,
    `admissionDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `onsetOfLabour` DATETIME(3) NULL,
    `membraneStatus` ENUM('INTACT', 'RUPTURED') NOT NULL DEFAULT 'INTACT',
    `ruptureDateTime` DATETIME(3) NULL,
    `liquorColor` VARCHAR(50) NULL,
    `status` ENUM('IN_PROGRESS', 'DELIVERED', 'TRANSFERRED_TO_THEATRE', 'COMPLICATED') NOT NULL DEFAULT 'IN_PROGRESS',
    `admittedById` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `labour_episodes_pregnancyEpisodeId_idx`(`pregnancyEpisodeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `labour_observations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `labourEpisodeId` INTEGER NOT NULL,
    `recordedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `cervicalDilationCm` DECIMAL(3, 1) NULL,
    `descentOfHead` VARCHAR(30) NULL,
    `contractionFrequencyIn10Min` INTEGER NULL,
    `contractionDurationSec` INTEGER NULL,
    `fetalHeartRateBpm` INTEGER NULL,
    `maternalPulseBpm` INTEGER NULL,
    `maternalBloodPressure` VARCHAR(20) NULL,
    `maternalTemperature` DECIMAL(4, 1) NULL,
    `recordedById` INTEGER NOT NULL,
    `remarks` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `deliveries` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `labourEpisodeId` INTEGER NOT NULL,
    `pregnancyEpisodeId` INTEGER NOT NULL,
    `deliveryDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deliveryMode` ENUM('SPONTANEOUS_VAGINAL', 'VACUUM_EXTRACTION', 'FORCEPS', 'CAESAREAN_SECTION', 'BREECH_DELIVERY', 'OTHER') NOT NULL DEFAULT 'SPONTANEOUS_VAGINAL',
    `placentaDelivered` BOOLEAN NOT NULL DEFAULT true,
    `placentaMethod` VARCHAR(50) NULL,
    `perineumStatus` ENUM('INTACT', 'FIRST_DEGREE_TEAR', 'SECOND_DEGREE_TEAR', 'THIRD_DEGREE_TEAR', 'EPISIOTOMY') NOT NULL DEFAULT 'INTACT',
    `estimatedBloodLossMl` INTEGER NULL,
    `deliveryNotes` TEXT NULL,
    `deliveredById` INTEGER NOT NULL,
    `assistantId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `newborns` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `deliveryId` INTEGER NOT NULL,
    `babyOrder` VARCHAR(30) NOT NULL,
    `gender` ENUM('MALE', 'FEMALE', 'INDETERMINATE') NOT NULL,
    `birthDateTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `birthWeightKg` DECIMAL(4, 2) NOT NULL,
    `birthLengthCm` DECIMAL(4, 1) NULL,
    `headCircumferenceCm` DECIMAL(4, 1) NULL,
    `apgarScore1Min` INTEGER NULL,
    `apgarScore5Min` INTEGER NULL,
    `apgarScore10Min` INTEGER NULL,
    `birthStatus` ENUM('LIVE_BIRTH', 'FRESH_STILLBIRTH', 'MACERATED_STILLBIRTH') NOT NULL DEFAULT 'LIVE_BIRTH',
    `resuscitationRequired` BOOLEAN NOT NULL DEFAULT false,
    `resuscitationDetails` VARCHAR(255) NULL,
    `abnormalitiesObserved` VARCHAR(255) NULL,
    `examinedById` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `postnatal_observations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pregnancyEpisodeId` INTEGER NOT NULL,
    `newbornId` INTEGER NULL,
    `observationType` ENUM('MATERNAL', 'NEWBORN') NOT NULL DEFAULT 'MATERNAL',
    `recordedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `vitalSignsSummary` VARCHAR(255) NULL,
    `clinicalNotes` TEXT NOT NULL,
    `recordedById` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `maternity_discharges` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pregnancyEpisodeId` INTEGER NOT NULL,
    `dischargeDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `maternalCondition` VARCHAR(255) NOT NULL,
    `newbornCondition` VARCHAR(255) NOT NULL,
    `dischargeInstructions` TEXT NOT NULL,
    `dischargedById` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `maternity_discharges_pregnancyEpisodeId_key`(`pregnancyEpisodeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `audit_logs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NULL,
    `action` VARCHAR(100) NOT NULL,
    `entityType` VARCHAR(50) NOT NULL,
    `entityId` INTEGER NULL,
    `details` TEXT NULL,
    `ipAddress` VARCHAR(50) NULL,
    `userAgent` VARCHAR(255) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `audit_logs_action_idx`(`action`),
    INDEX `audit_logs_entityType_entityId_idx`(`entityType`, `entityId`),
    INDEX `audit_logs_createdAt_idx`(`createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `system_settings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `key` VARCHAR(50) NOT NULL,
    `value` TEXT NOT NULL,
    `category` VARCHAR(50) NOT NULL,
    `description` VARCHAR(255) NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `system_settings_key_key`(`key`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `staff_profiles` ADD CONSTRAINT `staff_profiles_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_roles` ADD CONSTRAINT `user_roles_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_roles` ADD CONSTRAINT `user_roles_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `roles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `role_permissions` ADD CONSTRAINT `role_permissions_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `roles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `role_permissions` ADD CONSTRAINT `role_permissions_permissionId_fkey` FOREIGN KEY (`permissionId`) REFERENCES `permissions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_departments` ADD CONSTRAINT `user_departments_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_departments` ADD CONSTRAINT `user_departments_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `departments`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `patient_contacts` ADD CONSTRAINT `patient_contacts_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `patients`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `visits` ADD CONSTRAINT `visits_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `patients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `visits` ADD CONSTRAINT `visits_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `departments`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `appointments` ADD CONSTRAINT `appointments_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `patients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `appointments` ADD CONSTRAINT `appointments_doctorId_fkey` FOREIGN KEY (`doctorId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `appointments` ADD CONSTRAINT `appointments_departmentId_fkey` FOREIGN KEY (`departmentId`) REFERENCES `departments`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `appointments` ADD CONSTRAINT `appointments_bookedById_fkey` FOREIGN KEY (`bookedById`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `admissions` ADD CONSTRAINT `admissions_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `patients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `admissions` ADD CONSTRAINT `admissions_visitId_fkey` FOREIGN KEY (`visitId`) REFERENCES `visits`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `admissions` ADD CONSTRAINT `admissions_admittedById_fkey` FOREIGN KEY (`admittedById`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `admissions` ADD CONSTRAINT `admissions_dischargedById_fkey` FOREIGN KEY (`dischargedById`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `observations` ADD CONSTRAINT `observations_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `patients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `observations` ADD CONSTRAINT `observations_visitId_fkey` FOREIGN KEY (`visitId`) REFERENCES `visits`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `observations` ADD CONSTRAINT `observations_recordedById_fkey` FOREIGN KEY (`recordedById`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `consultations` ADD CONSTRAINT `consultations_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `patients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `consultations` ADD CONSTRAINT `consultations_visitId_fkey` FOREIGN KEY (`visitId`) REFERENCES `visits`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `consultations` ADD CONSTRAINT `consultations_doctorId_fkey` FOREIGN KEY (`doctorId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `diagnoses` ADD CONSTRAINT `diagnoses_consultationId_fkey` FOREIGN KEY (`consultationId`) REFERENCES `consultations`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `care_plans` ADD CONSTRAINT `care_plans_consultationId_fkey` FOREIGN KEY (`consultationId`) REFERENCES `consultations`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lab_orders` ADD CONSTRAINT `lab_orders_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `patients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lab_orders` ADD CONSTRAINT `lab_orders_visitId_fkey` FOREIGN KEY (`visitId`) REFERENCES `visits`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lab_orders` ADD CONSTRAINT `lab_orders_orderedById_fkey` FOREIGN KEY (`orderedById`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lab_order_items` ADD CONSTRAINT `lab_order_items_labOrderId_fkey` FOREIGN KEY (`labOrderId`) REFERENCES `lab_orders`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lab_order_items` ADD CONSTRAINT `lab_order_items_testId_fkey` FOREIGN KEY (`testId`) REFERENCES `lab_test_catalogue`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lab_samples` ADD CONSTRAINT `lab_samples_labOrderId_fkey` FOREIGN KEY (`labOrderId`) REFERENCES `lab_orders`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lab_samples` ADD CONSTRAINT `lab_samples_collectedById_fkey` FOREIGN KEY (`collectedById`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lab_results` ADD CONSTRAINT `lab_results_orderItemId_fkey` FOREIGN KEY (`orderItemId`) REFERENCES `lab_order_items`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lab_results` ADD CONSTRAINT `lab_results_enteredById_fkey` FOREIGN KEY (`enteredById`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lab_results` ADD CONSTRAINT `lab_results_verifiedById_fkey` FOREIGN KEY (`verifiedById`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lab_results` ADD CONSTRAINT `lab_results_releasedById_fkey` FOREIGN KEY (`releasedById`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stock_batches` ADD CONSTRAINT `stock_batches_medicineId_fkey` FOREIGN KEY (`medicineId`) REFERENCES `medicines`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stock_transactions` ADD CONSTRAINT `stock_transactions_medicineId_fkey` FOREIGN KEY (`medicineId`) REFERENCES `medicines`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stock_transactions` ADD CONSTRAINT `stock_transactions_batchId_fkey` FOREIGN KEY (`batchId`) REFERENCES `stock_batches`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stock_transactions` ADD CONSTRAINT `stock_transactions_performedById_fkey` FOREIGN KEY (`performedById`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `prescriptions` ADD CONSTRAINT `prescriptions_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `patients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `prescriptions` ADD CONSTRAINT `prescriptions_visitId_fkey` FOREIGN KEY (`visitId`) REFERENCES `visits`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `prescriptions` ADD CONSTRAINT `prescriptions_prescribedById_fkey` FOREIGN KEY (`prescribedById`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `prescription_items` ADD CONSTRAINT `prescription_items_prescriptionId_fkey` FOREIGN KEY (`prescriptionId`) REFERENCES `prescriptions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `prescription_items` ADD CONSTRAINT `prescription_items_medicineId_fkey` FOREIGN KEY (`medicineId`) REFERENCES `medicines`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dispensing_records` ADD CONSTRAINT `dispensing_records_prescriptionItemId_fkey` FOREIGN KEY (`prescriptionItemId`) REFERENCES `prescription_items`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dispensing_records` ADD CONSTRAINT `dispensing_records_batchId_fkey` FOREIGN KEY (`batchId`) REFERENCES `stock_batches`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dispensing_records` ADD CONSTRAINT `dispensing_records_dispensedById_fkey` FOREIGN KEY (`dispensedById`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `invoices` ADD CONSTRAINT `invoices_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `patients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `invoices` ADD CONSTRAINT `invoices_visitId_fkey` FOREIGN KEY (`visitId`) REFERENCES `visits`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `invoices` ADD CONSTRAINT `invoices_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `invoice_items` ADD CONSTRAINT `invoice_items_invoiceId_fkey` FOREIGN KEY (`invoiceId`) REFERENCES `invoices`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payments` ADD CONSTRAINT `payments_invoiceId_fkey` FOREIGN KEY (`invoiceId`) REFERENCES `invoices`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payments` ADD CONSTRAINT `payments_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `patients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payments` ADD CONSTRAINT `payments_receivedById_fkey` FOREIGN KEY (`receivedById`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `financial_adjustments` ADD CONSTRAINT `financial_adjustments_invoiceId_fkey` FOREIGN KEY (`invoiceId`) REFERENCES `invoices`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `financial_adjustments` ADD CONSTRAINT `financial_adjustments_approvedById_fkey` FOREIGN KEY (`approvedById`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pregnancy_episodes` ADD CONSTRAINT `pregnancy_episodes_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `patients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `antenatal_records` ADD CONSTRAINT `antenatal_records_pregnancyEpisodeId_fkey` FOREIGN KEY (`pregnancyEpisodeId`) REFERENCES `pregnancy_episodes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `antenatal_records` ADD CONSTRAINT `antenatal_records_visitId_fkey` FOREIGN KEY (`visitId`) REFERENCES `visits`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `antenatal_records` ADD CONSTRAINT `antenatal_records_attendedById_fkey` FOREIGN KEY (`attendedById`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `obstetric_histories` ADD CONSTRAINT `obstetric_histories_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `patients`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `obstetric_histories` ADD CONSTRAINT `obstetric_histories_pregnancyEpisodeId_fkey` FOREIGN KEY (`pregnancyEpisodeId`) REFERENCES `pregnancy_episodes`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `labour_episodes` ADD CONSTRAINT `labour_episodes_pregnancyEpisodeId_fkey` FOREIGN KEY (`pregnancyEpisodeId`) REFERENCES `pregnancy_episodes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `labour_episodes` ADD CONSTRAINT `labour_episodes_admittedById_fkey` FOREIGN KEY (`admittedById`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `labour_observations` ADD CONSTRAINT `labour_observations_labourEpisodeId_fkey` FOREIGN KEY (`labourEpisodeId`) REFERENCES `labour_episodes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `labour_observations` ADD CONSTRAINT `labour_observations_recordedById_fkey` FOREIGN KEY (`recordedById`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `deliveries` ADD CONSTRAINT `deliveries_labourEpisodeId_fkey` FOREIGN KEY (`labourEpisodeId`) REFERENCES `labour_episodes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `deliveries` ADD CONSTRAINT `deliveries_pregnancyEpisodeId_fkey` FOREIGN KEY (`pregnancyEpisodeId`) REFERENCES `pregnancy_episodes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `deliveries` ADD CONSTRAINT `deliveries_deliveredById_fkey` FOREIGN KEY (`deliveredById`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `deliveries` ADD CONSTRAINT `deliveries_assistantId_fkey` FOREIGN KEY (`assistantId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `newborns` ADD CONSTRAINT `newborns_deliveryId_fkey` FOREIGN KEY (`deliveryId`) REFERENCES `deliveries`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `newborns` ADD CONSTRAINT `newborns_examinedById_fkey` FOREIGN KEY (`examinedById`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `postnatal_observations` ADD CONSTRAINT `postnatal_observations_pregnancyEpisodeId_fkey` FOREIGN KEY (`pregnancyEpisodeId`) REFERENCES `pregnancy_episodes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `postnatal_observations` ADD CONSTRAINT `postnatal_observations_newbornId_fkey` FOREIGN KEY (`newbornId`) REFERENCES `newborns`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `postnatal_observations` ADD CONSTRAINT `postnatal_observations_recordedById_fkey` FOREIGN KEY (`recordedById`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `maternity_discharges` ADD CONSTRAINT `maternity_discharges_pregnancyEpisodeId_fkey` FOREIGN KEY (`pregnancyEpisodeId`) REFERENCES `pregnancy_episodes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `maternity_discharges` ADD CONSTRAINT `maternity_discharges_dischargedById_fkey` FOREIGN KEY (`dischargedById`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `audit_logs` ADD CONSTRAINT `audit_logs_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
