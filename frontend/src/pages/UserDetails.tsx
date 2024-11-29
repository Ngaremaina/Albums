import { useParams } from "react-router-dom";
import Layout from "../layout/Layout";
import { useContext, useEffect, useState } from "react";
import { getUserDetails } from "../services/Users";
import { AuthContext } from "../hooks/authContext";
import { UserDetailsResponse } from "../models/responses/UserResponse";
import UserProfile from "../components/cards/UserProfileCard";
import AlbumList from "./AlbumList";
import MoonLoaderSpinner from "../components/loader/MoonLoader";

function UserDetails() {
    const { username } = useParams();
    const { userToken } = useContext(AuthContext);
    const [user, setUser] = useState<UserDetailsResponse>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserDetails = async () => {
            setLoading(true); // Start loading
            try {
                const response = await getUserDetails(username, userToken);
                // console.log(response);
                setUser(response);
            } catch (error) {
                console.error("Error fetching user details:", error);
            } finally {
                setLoading(false); // Stop loading
            }
        };
        fetchUserDetails();
    }, [userToken, username]);

    return (
        <Layout>
            <div className="px-10">
                {loading ? (
                    <MoonLoaderSpinner/>
                ) : (
                    <>
                        <div className="flex justify-center mb-4">
                            <UserProfile userResponse={user?.userResponse} />
                        </div>
                        <dl className="w-full text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                            <AlbumList albumResponseList={user?.albumResponseList} />
                        </dl>
                    </>
                )}
            </div>
        </Layout>
    );
}

export default UserDetails;
