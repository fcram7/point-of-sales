import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { days, months } from './DaysMonths';
import { days, months } from './ReservationInputArrays';

interface reservations {
  contactPerson: string;
  contactNumber: string;
  selectedTable: number;
  peopleAmount: number;
  reservationSchedule: Date;
  reservationStarts: string;
  reservationEnds: string;
  attendedStatus: boolean;
}

export const ReservationCard = ({
  reservationSchedule,
  contactPerson,
  contactNumber,
  peopleAmount,
  reservationStarts,
  reservationEnds,
}: reservations) => {
  const reservationScheduleObject = new Date(reservationSchedule);

  let reservationDay = days[reservationScheduleObject.getDay()];
  let reservationMonth = months[reservationScheduleObject.getMonth()];
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
          <CardContent className='flex items-center gap-8'>
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
          </CardContent>
        </Card>
      </div>
    </article>
  );
};
