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

export const getItemData = async () => {
  const { data, error } = await supabase
    .from('item')
    .select('id, item_name, item_price, item_category');

  return { data, error };
};

export const getOrdersData = async () => {
  const { data, error } = await supabase.from('orders').select('*').eq('queue_order', true);

  if (error) {
    console.error('Error fetching orders data: ', error.message);
    return { data: [], error };
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

  return { data, error };
};

export const updateQueueOrder = async ({ orderId, queueOrder }: orders) => {
  const { data, error } = await supabase
    .from('orders')
    .update({
      queue_order: queueOrder
    })
    .eq('order_id', orderId)
    .select();

  if(error) {
    console.error('Error:', error);

    return { data: null, error }
  }

  console.log('updated data: ', data);
  return { data, error: null };
    

};
