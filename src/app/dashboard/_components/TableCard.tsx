'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ReservationCard } from './ReservationCard';
import { getReservationsData } from '@/api/db';
import { useToast } from '@/components/ui/use-toast';
import { useEffect, useState } from 'react';

interface reservations {
  reservation_id: string;
  contact_person: string;
  contact_number: string;
  selected_table: number;
  people_amount: number;
  reservation_schedule: Date;
  reservation_starts: string;
  reservation_ends: string;
  attended_status: boolean;
}

interface tables {
  id?: number;
  tableNumber: number;
  tableCapacity: number;
}

export const TableCard = ({
  tableNumber,
  tableCapacity,
}: tables) => {
  const [reservationItem, setReservationItem] = useState<reservations[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    console.log('Fetching reservation data...');
    const fetchAllReservations = async () => {
      const { data, error } = await getReservationsData();

      if (error) {
        console.error('Error fetching reservations data: ', error.message);
      }

      setReservationItem(data as reservations[]);
    }

    fetchAllReservations();
  }, []);

  const reservationData = reservationItem.filter((reservation) => reservation.selected_table === tableNumber && reservation.attended_status === false);

  return (
    <article className='table-card w-full'>
      <div className='table-card__content'>
        <Card className='w-full'>
          <CardHeader>
            <CardTitle>Table {tableNumber}</CardTitle>
            <CardDescription>
              Capacity of {tableCapacity} person
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type='single' collapsible className='w-full'>
              <AccordionItem value='reservation'>
                <AccordionTrigger>
                  View reservation for this table
                </AccordionTrigger>
                <AccordionContent>
                  {reservationData &&
                    reservationData.map((reservation, index) => (
                      <ReservationCard
                        key={index}
                        reservationId={reservation.reservation_id}
                        contactPerson={reservation.contact_person}
                        contactNumber={reservation.contact_number}
                        selectedTable={reservation.selected_table}
                        peopleAmount={reservation.people_amount}
                        reservationSchedule={reservation.reservation_schedule}
                        reservationStarts={reservation.reservation_starts}
                        reservationEnds={reservation.reservation_ends}
                        attendedStatus={reservation.attended_status}
                      />
                    ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </article>
  );
};
