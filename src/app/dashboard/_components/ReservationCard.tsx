'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { days, months } from './ReservationInputArrays';
import { Button } from '@/components/ui/button';
import { setReservationAttendedStatus } from '@/api/db';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';

interface reservations {
  reservationId: string;
  contactPerson: string;
  contactNumber: string;
  selectedTable: number;
  peopleAmount: number;
  reservationSchedule: Date;
  reservationStarts: string;
  reservationEnds: string;
  attendedStatus: boolean;
  // fetchAllReservations: Promise<void>;
  fetchAllReservations: () => void;
}

export const ReservationCard = ({
  reservationId,
  reservationSchedule,
  contactPerson,
  contactNumber,
  peopleAmount,
  reservationStarts,
  reservationEnds,
  fetchAllReservations
}: reservations) => {
  const reservationScheduleObject = new Date(reservationSchedule);

  let reservationDay = days[reservationScheduleObject.getDay()];
  let reservationMonth = months[reservationScheduleObject.getMonth()];

  const { toast } = useToast();

  const updateAttendedStatusHandler = async (reservationId: string) => {
    try {
      await setReservationAttendedStatus({
        reservationId: reservationId,
        attendedStatus: true,
      });

      fetchAllReservations();

      toast({
        title: 'Reservation has been attended',
        action: (
          <ToastAction altText='Click here to close notification'>Close</ToastAction>
        )
      });
      
    } catch (error) {
      console.error(error);
    }

  }
  return (
    <article className='reservation-card'>
      <div className='reservation-card__content'>
        <Card>
          <CardHeader>
            <CardTitle>
              Reservation at{' '}
              {`${reservationDay}, ${reservationScheduleObject.getDate()} ${reservationMonth}`}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='flex items-center gap-8'>
              <div className='reservation-card__reservation-time-container grid gap-4'>
                <p className='reservation-card__reservation-time xl:text-4xl'>
                  {reservationStarts}
                </p>
                <p>Until</p>
                <p className='reservation-card__reservation-time xl:text-4xl'>
                  {reservationEnds}
                </p>
              </div>
              <div className='reservation-card__reservation-detail flex items-center justify-between w-full h-full pe-20'>
                <div className="reservation-card__contact-data">
                  <h3 className="reservation-card__contact-person-label xl:text-lg">Contact Person: </h3>
                  <p className='reservation-card__contact-person xl:text-2xl'>
                    {contactPerson}
                  </p>
                  <p className='reservation-card__contact-number-label xl:text-xl mt-4'>
                    Contact Number:
                  </p>
                  <p className='reservation-card__contact-number xl:text-xl'>
                    {contactNumber}
                  </p>
                </div>
                  <p className='reservation-card__amount-people xl:text-xl'>Amount of People: {peopleAmount}</p>
              </div>
            </div>

            <div className="reservation-card__attended-reservation-btn-container mt-6 flex justify-end">
              <Button type='button' onClick={() => updateAttendedStatusHandler(reservationId)}>Reservation has been attended</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </article>
  );
};
