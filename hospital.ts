abstract class Person {
    private firstName: string;
    private lastName: string;
    private address: string;
    private age: number;

    constructor(fn: string, ln: string, address: string, age: number) {
        this.firstName = fn;
        this.lastName = ln;
        this.address = address;
        this.age = age;
    }
    show(): void {
        for (const key in this) {
            console.log(`${key}: ${this[key]}`);
        }
    }
    getnName(): string {
        return `${this.firstName}, ${this.lastName}`;
    }
    checkAge(min: number, max: number): boolean {
        return this.age >= min && this.age <= max;
    }
}

enum aStatus {
    PLANED = 'planed',
    COMPLETE = 'complete',
    CANCELED = 'canceled'
}

class Patient extends Person {
    patientID: number;
    phoneNumber: string;
    emergancyContact: string;
    medicalHistory: Appointment[];
    constructor(fn: string, ln: string, pID: number, address: string, age: number) {
        super(fn, ln, address, age);
        this.patientID = pID;
        this.medicalHistory = [];
    }
    show(): void {
        console.log('person detailes:');
        super.show();
    }
    updHistory(appointment: Appointment): void {
        this.medicalHistory.push(appointment);
    }
}

abstract class MedicalStaff extends Person {
    staffID: number;
    position: string;
    department: string;
    constructor(fn: string, ln: string, age: number, staffID: number, position: string, department: string) {
        super(fn, ln, position, age);
        this.staffID = staffID;
        this.position = position;
        this.department = department;
    }
}


class Doctor extends MedicalStaff {
    availability: string[];
    minAge: number;
    maxAge: number;

    constructor(fn: string, ln: string, id: number, age: number, position: string, speciality: string, minAge: number, maxAge: number) {
        super(fn, ln, age, id, position, speciality);
        this.availability = ['7:00-12:00', '15:00-20:00'];
        this.minAge = minAge;
        this.maxAge = maxAge;
    }

    show(): void {
        console.log(`doctor info:`);
        super.show();
    }
}

class Appointment {
    patient: Patient;
    doctor: Doctor;
    date: string;
    time: string;
    private status: aStatus;

    constructor(p: Patient, d: Doctor, date: string, time: string) {
        this.patient = p;
        this.doctor = d;
        this.date = date;
        this.time = time;
        this.status = aStatus.PLANED;
    }

    show(): void {
        console.log('Patient:');
        this.patient.show();
        console.log('Doctor:');
        this.doctor.show();

        console.log(`Appointment detailes:
        date: ${this.date},
        time: ${this.time},
        status: ${this.status}`);
    }

    compleate(): void {
        this.status = aStatus.COMPLETE;
        this.show();
    }

    canceled(): void {
        this.status = aStatus.CANCELED;
        this.show();
    }
}

class MedicalRecord {
    patient: Patient;
    doctor: Doctor;
    diagnosis: string;
    prescription: string;

    constructor(patient: Patient, doctor: Doctor, diagnosis: string, prescription: string) {
        this.patient = patient;
        this.doctor = doctor;
        this.diagnosis = diagnosis;
        this.prescription = prescription;
    }
}

class Hospital {
    private hospitalName: string;
    private doctors: Doctor[];
    private patients: Patient[];
    private appointments: Appointment[];
    private medicalRecordes: MedicalRecord[];

    constructor(name: string, doctors: Doctor[], patients: Patient[], appointments: Appointment[]) {
        this.hospitalName = name;
        this.doctors = doctors;
        this.patients = patients;
        this.appointments = appointments;
        this.medicalRecordes = [];
    }
    addPatient(p: Patient): void {
        if (!this.patients.find(pa => Object.is(pa, p)))
            this.patients.push(p);
    }
    addDoctor(d: Doctor): void {
        if (!this.doctors.find(doc => doc.staffID == d.staffID)) {
            this.doctors.push(d);
        }
    }
    addAppointment(a: Appointment): void {
        if (!this.appointments.find(ap =>
            ap.doctor.staffID === a.doctor.staffID &&
            ap.date === a.date && ap.time === a.time)) {
            if (a.patient.checkAge(a.doctor.minAge, a.doctor.maxAge)) {
                this.appointments.push(a);
            } else {
                console.log("This doctor can't accept this patient because of his age.");

            }
        } else {
            console.log("The apointment date and time alredy been scaduled");
        }
    }
    createMedicalRecord(mR: MedicalRecord): void {
        this.medicalRecordes.push(mR);
    }
    getMedicalRecord(p: Patient): MedicalRecord[] {
        return this.medicalRecordes.filter(md => md.patient.patientID === p.patientID);
    }
    getDoctorSchedule(d: Doctor): Appointment[] {
        return this.appointments.filter(ap => ap.doctor.staffID === d.staffID);
    }

    showAppointments(): void {
        this.appointments.forEach(ap => {
            ap.show();
        })
    }
    showAppointmentsOfDoctor(dID): void {
        this.appointments.forEach(ap => {
            if (ap.doctor.staffID === dID) {
                ap.show();
            }
        })
    }
    showAppointmentsOfPatient(pID): void {
        this.appointments.forEach(ap => {
            if (ap.patient.patientID === pID) {
                ap.show();
            }
        })
    }
    showAppointmentsToday(): void {
        let curDate: string = new Date().toISOString().split('T')[0];
        this.appointments.forEach(ap => {
            if (ap.date === curDate) {
                ap.show();
            }
        })
    }

    show(): void {
        console.log(this.hospitalName);
    }
}

function testHospitalSystem() {
    // Create some instances of classes
    const doctor1 = new Doctor("John", "Doe", 1, 35, "Cardiology", "Cardiologist", 25, 70);
    const patient1 = new Patient("Alice", "Smith", 1001, "123 Main St", 30);
    const appointment1 = new Appointment(patient1, doctor1, "2023-08-28", "10:00");

    const hospital = new Hospital("Test Hospital", [doctor1], [patient1], [appointment1]);

    // Add more tests here, like adding more doctors, patients, and appointments, and then querying the hospital's data.

    // For example:
    hospital.addDoctor(new Doctor("Jane", "Johnson", 2, 40, "Dermatology", "Dermatologist", 18, 80));
    hospital.addPatient(new Patient("Bob", "Brown", 1002, "456 Elm St", 45));

    hospital.addAppointment(new Appointment(patient1, doctor1, "2023-08-29", "15:00"));

    // Display some information
    hospital.show();
    hospital.showAppointments();
    hospital.showAppointmentsOfDoctor(101);
    hospital.showAppointmentsOfPatient(1001);
    hospital.showAppointmentsToday();
}

// Call the testing function
testHospitalSystem();
