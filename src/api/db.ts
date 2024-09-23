import { supabase } from './config';

interface orderObject {
  orderName: string;
  itemPrice: number;
  orderAmount: number;
  orderTotal: number;
}

interface orders {
  orderId: string;
  customerName?: string;
  order?: orderObject[];
  total?: number;
  payment?: string;
  queueOrder?: boolean;
}

interface items {
  id?: number;
  itemName: string;
  itemPrice: number;
  itemCategory: string;
}

interface reservations {
  reservationId: string;
  contactPerson?: string;
  contactNumber?: string;
  selectedTable?: number | null;
  peopleAmount?: number | null;
  reservationSchedule?: Date;
  reservationStarts?: string;
  reservationEnds?: string;
  attendedStatus?: boolean;
}

export const getItemData = async () => {
  const { data, error } = await supabase
    .from('item')
    .select('id, item_name, item_price, item_category');

  if (error) {
    console.error('Error fetching items data: ', error.message);

    return { data: [], error };
  }

  return { data, error };
};

export const getOrdersData = async () => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('queue_order', true);

  if (error) {
    console.error('Error fetching orders data: ', error.message);
    return { data: [], error };
  }

  return { data, error };
};

export const getTableData = async () => {
  const { data, error } = await supabase.from('tables').select('*');

  if (error) {
    console.error('Error fetching tables data: ', error.message);
    return { data: [], error };
  }

  console.log('Table data: ', data);

  return { data, error };
};

export const getReservationsData = async () => {
  const { data, error } = await supabase.from('reservations').select('*');

  if (error) {
    console.error('Error fetching reservations data: ', error.message);
    return { data: [], error };
  }

  return { data, error };
};

export const setItemData = async ({
  itemName,
  itemPrice,
  itemCategory,
}: items) => {
  const { data, error } = await supabase.from('item').insert({
    item_name: itemName,
    item_price: itemPrice,
    item_category: itemCategory,
  });

  if (error) {
    console.error('Error inserting new data: ', error.message);

    return { data: null, error };
  }

  return { data, error };
};

export const setOrderData = async ({
  orderId,
  customerName,
  order,
  total,
  payment,
  queueOrder,
}: orders) => {
  const { data, error } = await supabase.from('orders').insert({
    order_id: orderId,
    customer_name: customerName,
    order: [
      {
        ...order,
      },
    ],
    total: total,
    payment: payment,
    queue_order: queueOrder,
  });

  if (error) {
    console.error('Error inserting data: ', error.message);

    return { data: null, error };
  }

  return { data, error: null };
};

export const setReservationData = async ({
  reservationId,
  contactPerson,
  contactNumber,
  selectedTable,
  peopleAmount,
  reservationSchedule,
  reservationStarts,
  reservationEnds,
  attendedStatus,
}: reservations) => {
  const { data, error } = await supabase.from('reservations').insert({
    reservation_id: reservationId,
    contact_person: contactPerson,
    contact_number: contactNumber,
    selected_table: selectedTable,
    people_amount: peopleAmount,
    reservation_schedule: reservationSchedule,
    reservation_starts: reservationStarts,
    reservation_ends: reservationEnds,
    attended_status: attendedStatus,
  });

  if (error) {
    console.error('Error inserting reservation data: ', error.message);
    return { data: null, error };
  }

  return { data, error: null };
};

export const updateItemData = async ({
  id,
  itemName,
  itemCategory,
  itemPrice,
}: items) => {
  const { data, error } = await supabase
    .from('item')
    .update({
      item_name: itemName,
      item_price: itemPrice,
      item_category: itemCategory,
    })
    .eq('id', id)
    .select();

  if (error) {
    console.error('Error: ', error.message);

    return { data: null, error };
  }

  console.log('Edited data: ', data);

  return { data, error: null };
};

export const updateQueueOrder = async ({ orderId, queueOrder }: orders) => {
  const { data, error } = await supabase
    .from('orders')
    .update({
      queue_order: queueOrder,
    })
    .eq('order_id', orderId)
    .select();

  if (error) {
    console.error('Error:', error);

    return { data: null, error };
  }

  return { data, error: null };
};

export const setReservationAttendedStatus = async ({
  reservationId,
  attendedStatus,
}: reservations) => {
  const { data, error } = await supabase
    .from('reservations')
    .update({
      attended_status: attendedStatus,
    })
    .eq('reservation_id', reservationId)
    .select();

  if (error) {
    console.error('Error: ', error);

    return { data: null, error };
  }

  return { data, error: null };
};
