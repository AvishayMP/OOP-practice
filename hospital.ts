abstract class Person {
    private firstName: string;
    private lastName: string;
    constructor(fn: string, ln: string) {
        this.firstName = fn;
        this.lastName = ln;
    }
    abstract show(): void;
}

class Patient extends Person {
    patientID: number;

    constructor(fn: string, ln: string, pID: number) {
        super(fn, ln);
        this.patientID = pID;
    }
    show(): void {
        console.log(
            `name: ${this.firstName},
            last name: ${this.lastName},
            patientID: ${this.patientID}`);
    }
}

class Doctor extends Person {
    doctorID: number;
    specialization: string;

    constructor(fn: string, ln: string, dID: number, speciality: string) {
        super(fn, ln);
        this.doctorID = dID;
        this.specialization = speciality;
    }

    show(): void {
        console.log(`name: ${this.firstName},
        last name: ${this.lastName},
        doctorID: ${this.doctorID},
        speciality: ${this.specialization}`);
    }
}

class Appointment {
    patient: Patient;
    doctor: Doctor;
    date: string;
    time: string;

    constructor(p: Patient, d: Doctor, date: string, time: string) {
        this.patient = p;
        this.doctor = d;
        this.date = date;
        this.time = time;
    }

    show(): void {
        console.log('Patient:');
        this.patient.show();
        console.log('Doctor:');
        this.doctor.show();

        console.log(`Appointment   detailes:
        date: ${this.date},
        time: ${this.time}`);
    }
}

class Hospital {
    private hospitalName: string;
    private doctors: Doctor[];
    private patients: Patient[];
    private appointments: Appointment[];

    constructor(name: string, doctors: Doctor[], patients: Patient[], appointments: Appointment[]) {
        this.hospitalName = name;
        this.doctors = doctors;
        this.patients = patients;
        this.appointments = appointments;
    }
    addPatient(p: Patient): void {
        if (!this.patients.find(pa => Object.is(pa, p)))
            this.patients.push(p);
    }
    addDoctor(d: Doctor): void {
        if (!this.doctors.find(doc => Object.is(doc, d)))
            this.doctors.push(d);
    }
    addAppointment(a: Appointment): void {
        if (!this.appointments.find(ap =>
            ap.doctor.doctorID === a.doctor.doctorID &&
            ap.patient.patientID === a.patient.patientID)) {
            this.appointments.push(a);
        }
    }

    showAppointments(): void {
        this.appointments.forEach(ap => {
            ap.show();
        })
    }
    showAppointmentsOfDoctor(dID): void {
        this.appointments.forEach(ap => {
            if (ap.doctor.doctorID === dID) {
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
        let curDate: string = new Date().toString();
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

let hospital: Hospital = new Hospital("My Hospital", [], [], []);

let patient1 = new Patient("Yosi", "Boo", 1);
let patient2 = new Patient("Yonatan", "Goo", 2);

let doctor1 = new Doctor("Dr. John", "Smith", 1, "Cardiology");
let doctor2 = new Doctor("Dr. Jane", "Wize", 2, "Neurology");

hospital.addPatient(patient1);
hospital.addPatient(patient2);
hospital.addDoctor(doctor1);
hospital.addDoctor(doctor2);

let appointment1 = new Appointment(patient1, doctor1, "2023-08-27", "10:00");
let appointment2 = new Appointment(patient2, doctor2, "2023-08-27", "11:00");

hospital.addAppointment(appointment1);
hospital.addAppointment(appointment2);

hospital.showAppointments();