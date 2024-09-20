import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

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
            <div className='reservation-card__reservation-detail'>
              <p className='reservation-card__contact-person'>
                {contactPerson}
              </p>
              <p className='reservation-card__contact-number'>
                {contactNumber}
              </p>
              <p className='reservation-card__amount-people'>{peopleAmount}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </article>
  );
};
