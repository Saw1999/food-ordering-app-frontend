import { useGetUser, useUpdateUser } from "../api/UserApi"
import { UserProfileForm } from "../form/user-profile-form/UserProfileForm"


export const UserProfile = () => {
    const {updateUser, isLoading: isUpdateLoading} = useUpdateUser();
    const {userData, isLoading: isGetLoading} = useGetUser();

    if(isGetLoading) {
      return <span>Loading...</span>
    }

    if(!userData) {
      return <span>Loading Failed!</span>
    }
    
  return (
    <UserProfileForm onSave={updateUser} isLoading={isUpdateLoading} userData={userData} />

  )
}
