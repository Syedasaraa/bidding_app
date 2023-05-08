import React from 'react'
import { useGetUsersApiQuery } from "@/redux/commonApiCall";

const User = (id) => {
    let url;
    if (id) {
         url = `/users`
    } else {
        url = `/users/${id}`
     }
      const { data, isError, isLoading, isSuccess } = useGetUsersApiQuery(url);
      if (isSuccess) {
        console.log(data);
      }
  return (
    <div>user</div>
  )
}

export default User