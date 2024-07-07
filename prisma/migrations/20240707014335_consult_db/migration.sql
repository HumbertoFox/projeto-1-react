-- CreateTable
CREATE TABLE "addresss" (
    "address_id" SERIAL NOT NULL,
    "zipcode" TEXT NOT NULL,
    "residencenumber" VARCHAR(50) NOT NULL,
    "building" VARCHAR(100) NOT NULL,
    "buildingblock" VARCHAR(50) NOT NULL,
    "apartment" VARCHAR(50) NOT NULL,
    "registerdate" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "addresss_pkey" PRIMARY KEY ("address_id")
);

-- CreateTable
CREATE TABLE "consultations" (
    "consultation_id" SERIAL NOT NULL,
    "cpf" TEXT NOT NULL,
    "crm" TEXT NOT NULL,
    "plan" VARCHAR(50) NOT NULL,
    "particular" VARCHAR(50) NOT NULL,
    "courtesy" VARCHAR(20) NOT NULL,
    "observation" TEXT NOT NULL,
    "consultdatestart" TEXT NOT NULL,
    "consultdateend" TEXT NOT NULL,
    "patient_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "registerdate" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "consultations_pkey" PRIMARY KEY ("consultation_id")
);

-- CreateTable
CREATE TABLE "cpfs" (
    "cpf" VARCHAR(11) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "dateofbirth" TEXT NOT NULL,

    CONSTRAINT "cpfs_pkey" PRIMARY KEY ("cpf")
);

-- CreateTable
CREATE TABLE "crms" (
    "crm" VARCHAR(11) NOT NULL,

    CONSTRAINT "crms_pkey" PRIMARY KEY ("crm")
);

-- CreateTable
CREATE TABLE "doctors" (
    "doctor_id" SERIAL NOT NULL,
    "crm" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "address_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "registerdate" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "doctors_pkey" PRIMARY KEY ("doctor_id")
);

-- CreateTable
CREATE TABLE "patients" (
    "patient_id" SERIAL NOT NULL,
    "cpf" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "address_id" INTEGER NOT NULL,
    "registerdate" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "patients_pkey" PRIMARY KEY ("patient_id")
);

-- CreateTable
CREATE TABLE "telephones" (
    "telephone" VARCHAR(11) NOT NULL,
    "email" VARCHAR(150) NOT NULL,

    CONSTRAINT "telephones_pkey" PRIMARY KEY ("telephone")
);

-- CreateTable
CREATE TABLE "users" (
    "user_id" SERIAL NOT NULL,
    "cpf" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "password" VARCHAR(200) NOT NULL,
    "address_id" INTEGER NOT NULL,
    "registerdate" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "zipcodes" (
    "zipcode" VARCHAR(11) NOT NULL,
    "street" VARCHAR(100) NOT NULL,
    "district" VARCHAR(100) NOT NULL,
    "city" VARCHAR(100) NOT NULL,

    CONSTRAINT "zipcodes_pkey" PRIMARY KEY ("zipcode")
);

-- AddForeignKey
ALTER TABLE "addresss" ADD CONSTRAINT "addresss_zipcode_fkey" FOREIGN KEY ("zipcode") REFERENCES "zipcodes"("zipcode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consultations" ADD CONSTRAINT "consultations_cpf_fkey" FOREIGN KEY ("cpf") REFERENCES "cpfs"("cpf") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consultations" ADD CONSTRAINT "consultations_crm_fkey" FOREIGN KEY ("crm") REFERENCES "crms"("crm") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consultations" ADD CONSTRAINT "consultations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consultations" ADD CONSTRAINT "consultations_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients"("patient_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doctors" ADD CONSTRAINT "doctors_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "addresss"("address_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doctors" ADD CONSTRAINT "doctors_cpf_fkey" FOREIGN KEY ("cpf") REFERENCES "cpfs"("cpf") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doctors" ADD CONSTRAINT "doctors_crm_fkey" FOREIGN KEY ("crm") REFERENCES "crms"("crm") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doctors" ADD CONSTRAINT "doctors_telephone_fkey" FOREIGN KEY ("telephone") REFERENCES "telephones"("telephone") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doctors" ADD CONSTRAINT "doctors_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patients" ADD CONSTRAINT "patients_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "addresss"("address_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patients" ADD CONSTRAINT "patients_cpf_fkey" FOREIGN KEY ("cpf") REFERENCES "cpfs"("cpf") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patients" ADD CONSTRAINT "patients_telephone_fkey" FOREIGN KEY ("telephone") REFERENCES "telephones"("telephone") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "addresss"("address_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_cpf_fkey" FOREIGN KEY ("cpf") REFERENCES "cpfs"("cpf") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_telephone_fkey" FOREIGN KEY ("telephone") REFERENCES "telephones"("telephone") ON DELETE RESTRICT ON UPDATE CASCADE;
