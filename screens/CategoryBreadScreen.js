import React, { useEffect } from 'react'
import { FlatList} from 'react-native'
import BreadItem from '../components/BreadItem'

// redux
import { useSelector, useDispatch} from 'react-redux'
// actions
import { filteredBread, selectBread } from '../store/actions/bread.actions'

export const CategoryBreadScreen = ({navigation, route}) => {
    
    // redux
    const dispatch = useDispatch()
    const categoryBreads = useSelector(store => store.breads.filteredBread)
    const category = useSelector(store => store.categories.selected )

    useEffect(() => {
        dispatch(filteredBread(category.id))
    },[])

    const handleSelected = (item) => {
        dispatch(selectBread(item.id))
        navigation.navigate('Detail', {
            bread: item.name
        })
    }

    const renderItemBread = ({ item }) => (
        <BreadItem item={item} onSelected={handleSelected} />
    )

    return (
        <FlatList
            data={categoryBreads}
            renderItem={renderItemBread}
            keyExtractor={item => item.id}
        />
    )
}
