import React, { useEffect } from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { getOrders, deleteOrder } from '../store/actions/order.actions';
import OrderItem from '../components/OrderItem'


const OrderItemScreen = () => {

    const dispatch = useDispatch();
    const orders = useSelector(state => state.order.list)

    useEffect(() => {
        dispatch(getOrders());
    }, []);

    const onHandlerDeleteItem = (id) => dispatch(deleteOrder(id));

    const renderCartItem = ({ item }) => (
        <OrderItem item={item} onDelete={onHandlerDeleteItem} />
    )

  return (
    <View style={styles.container}>
        <FlatList
            data={orders}
            renderItem={renderCartItem}
            keyExtractor={(item) => item.id}
            numColumns={1}
            onRefresh={() => dispatch(getOrders())}
            refreshing={false}
        />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
})

export default OrderItemScreen