import { useContext, useEffect, useState } from "react";
import UserCard from "../components/cards/UserCard";
import { getAllUsers } from "../services/Users";
import { UserDetailsResponse } from "../models/responses/UserResponse";
import { AuthContext } from "../hooks/authContext";
import Layout from "../layout/Layout";
import MoonLoaderSpinner from "../components/loader/MoonLoader";

function Dashboard(){
    const [users, setUsers] = useState<UserDetailsResponse[]>([])
    const {userToken} = useContext(AuthContext)
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try{
                const response = await getAllUsers(userToken)
                setUsers(response)
            }
            catch (error) {
                console.error("Error fetching user details:", error);
            } finally {
                setLoading(false); // Stop loading
            }
            
        }

        fetchUsers()
    },[userToken])

    const displayUsers = users?.map(user => {
        return <UserCard
                    key={user.userResponse.id}
                    userResponse={user.userResponse}
                    albumResponseList={user.albumResponseList} />

    })
    return(
        <Layout>
            {loading ? (
                    <MoonLoaderSpinner/>
            ):(
                <div className="sm: px-2 md:grid grid-cols-3 gap-4 lg:grid-cols-4">
                    {displayUsers}
                </div>
            )}
            
        </Layout>
    )
}

export default Dashboard;