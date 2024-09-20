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
import { Button } from '@/components/ui/button';
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerTrigger } from '@/components/ui/drawer';
import { ReservationInput } from './ReservationInput';
import { z } from 'zod';
import { reservationSchema } from '@/utils/schema/ReservationSchema';
import { getReservationsData, setReservationData } from '@/api/db';
import { reservationStore } from '@/utils/zustand/reservation';
import { useToast } from '@/components/ui/use-toast';
import { useEffect, useState } from 'react';

interface reservations {
  reservation_id: string;
  contact_person: string;
  contact_number: string;
  selected_table: number;
  people_amount: number;
  reservation_schedule: Date;
  // reservationSchedule: string;
  reservation_starts: string;
  reservation_ends: string;
  // reservationSchedule: string;
  // reservationTime: reservationTime[];
  attended_status: boolean;
}

interface tables {
  id?: number;
  tableNumber: number;
  tableCapacity: number;
  reservationData: reservations[];
}

export const TableCard = ({
  tableNumber,
  tableCapacity,
  // reservationData,
}: tables) => {
  const { attendedStatus } = reservationStore();
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

  const reservationData = reservationItem.filter((reservation) => reservation.selected_table === tableNumber);
  console.log('Resevation data: ', reservationData)

  const reservationSubmitHandler = async (
    values: z.infer<typeof reservationSchema>
  ) => {
    try {
      await setReservationData({
        reservationId: values.reservationId,
        contactPerson: values.contactPerson,
        contactNumber: values.contactNumber,
        selectedTable: values.selectedTable,
        peopleAmount: values.peopleAmount,
        reservationSchedule: values.reservationSchedule,
        reservationStarts: values.reservationStarts,
        reservationEnds: values.reservationEnds,
        attendedStatus: attendedStatus,
      });

      console.log('Submitted values: ', values);

      toast({
        title: 'Submitted date:',
        description: (
          <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
            <code className='text-white'>{values.reservationSchedule.toDateString()}</code>
          </pre>
        )
      })
    } catch (err) {
      console.error(err);
    }
  };

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
                        contactPerson={reservation.contact_person}
                        contactNumber={reservation.contact_number}
                        selectedTable={reservation.selected_table}
                        peopleAmount={reservation.people_amount}
                        reservationSchedule={reservation.reservation_schedule}
                        reservationStarts={reservation.reservation_starts}
                        reservationEnds={reservation.reservation_ends}
                        // reservationTime={reservation.reservationTime}
                        attendedStatus={reservation.attended_status}
                      />
                    ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="table-card__make-reservation-btn-container flex justify-end mt-6">
              <Drawer>
                <DrawerTrigger asChild>
                  <Button type='button'>Make Reservation</Button>
                </DrawerTrigger>
                <DrawerContent>
                  <div className='all-menus-card__drawer-content px-large xl:px-small'>
                    <ReservationInput handleSubmit={reservationSubmitHandler}/>
                  </div>
                  <DrawerFooter>
                    <div className='flex w-full items-center justify-center gap-4'>
                      <DrawerClose asChild>
                        <Button type='button' variant={'outline'} className='hover:border-primary'>
                          Cancel Edit
                        </Button>
                      </DrawerClose>
                    </div>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </div>
          </CardContent>
        </Card>
      </div>
    </article>
  );
};
