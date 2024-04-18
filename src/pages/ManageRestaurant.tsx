import { useCreateRestaurant, useGetMyRestaurant, useUpdateRestaurant } from "../api/MyRestaApi"
import { ManageRestaForm } from "../form/manage_restaurant_form/ManageRestaForm"

export const ManageRestaurant = () => {

    // creating a restaurant using custom useCreateRestaurant hook 
    const {createRestaurant, isLoading: isCreateLoading} = useCreateRestaurant();

    // getting my restaurant data using custom useGetMyRestaurant hook 
    const {myRestaurantData} = useGetMyRestaurant();

    // updating a restaurant using custom useUpdateRestaurant hook 
    const {updateRestaurant, isLoading: isUpdateLoading} = useUpdateRestaurant();

    const isModifying = !!myRestaurantData;

  return (
    <ManageRestaForm
    onSave={isModifying ? updateRestaurant : createRestaurant} 
    isLoading={isCreateLoading || isUpdateLoading} 
    restaurant={myRestaurantData} />
  )
}
