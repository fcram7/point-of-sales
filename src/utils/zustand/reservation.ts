import { create } from 'zustand';

interface reservationTime {
  timeStart: string;
  timeEnd: string;
}

interface reservation {
  contactPerson: string;
  contactNumber: string;
  selectedTable: number;
  peopleAmount: number;
  // reservationSchedule: Date | null;
  reservationSchedule: string;
  reservationTime: reservationTime[];
  attendedStatus: boolean;
}

interface reservationAction {
  setContactPerson: (reservation: reservation['contactPerson']) => void;
  setContactNumber: (reservation: reservation['contactNumber']) => void;
  setSelectedTable: (reservation: reservation['selectedTable']) => void;
  setPeopleAmount: (reservation: reservation['peopleAmount']) => void;
  setReservationSchedule: (reservation: reservation['reservationSchedule']) => void;
  setReservationTime: (reservation: reservationTime) => void;
  setAttendedStatus: (reservation: reservation['attendedStatus']) => void;
}

export const reservationStore = create<reservation & reservationAction>((set) => ({
  contactPerson: '',
  contactNumber: '',
  selectedTable: 1,
  peopleAmount: 1,
  // reservationSchedule: null,
  reservationSchedule: '',
  reservationTime: [],
  attendedStatus: false,
  setContactPerson: (contactPerson) => set(() => ({ contactPerson: contactPerson })),
  setContactNumber: (contactNumber) => set(() => ({ contactNumber: contactNumber })),
  setSelectedTable: (selectedTable) => set(() => ({ selectedTable: selectedTable })),
  setPeopleAmount: (peopleAmount) => set(() => ({ peopleAmount: peopleAmount })),
  setReservationSchedule: (reservationSchedule) => set(() => ({ reservationSchedule: reservationSchedule })),
  setReservationTime: (newReservationTime) => set((state) => ({
    reservationTime: [
      ...state.reservationTime,
      newReservationTime
    ]
  })),
  setAttendedStatus: (attendedStatus) => set(() => ({ attendedStatus: attendedStatus }))
}));