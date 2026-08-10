import "./Profile.css";
import {BadgeCheck,Calendar,Clock,Globe,Languages,Mail,MapPin,Shield,User} from "lucide-react";

import { useAccountSecurityQuery } from "../../../hooks/useAccountSecurityQuery";

function Profile() {
    const { data, isLoading, error } = useAccountSecurityQuery();

    if (isLoading) return <p>Loading profile...</p>;
    if (error) return <p>Failed to load profile.</p>;
    if (!data) return <p>No profile information found.</p>;

    return (
        <section className="profile">
            <div className="profile-header">
                <h2>My Profile</h2>
                <p>View your NeuroFlow AI account information.</p>
            </div>

            <div className="profile-card">
                <div className="profile-avatar">
                    {data.username?.charAt(0).toUpperCase()}
                </div>

                <div>
                    <h3>{data.username}</h3>
                    <span>{data.email}</span>
                </div>
            </div>

            <div className="profile-section">
                <h4>Personal Information</h4>

                <div className="profile-info">
                    <div className="profile-row">
                        <div className="profile-label">
                            <User size={15} />
                            Username
                        </div>
                        <span>{data.username}</span>
                    </div>

                    <div className="profile-row">
                        <div className="profile-label">
                            <Mail size={15} />
                            Email
                        </div>
                        <span>{data.email}</span>
                    </div>

                    <div className="profile-row">
                        <div className="profile-label">
                            <MapPin size={15} />
                            Country
                        </div>
                        <span>{data.country}</span>
                    </div>

                    <div className="profile-row">
                        <div className="profile-label">
                            <Languages size={15} />
                            Language
                        </div>
                        <span>{data.language}</span>
                    </div>

                    <div className="profile-row">
                        <div className="profile-label">
                            <Globe size={15} />
                            Timezone
                        </div>
                        <span>{data.timezone}</span>
                    </div>
                </div>
            </div>

            <div className="profile-section">
                <h4>Account Information</h4>

                <div className="profile-info">
                    <div className="profile-row">
                        <div className="profile-label">
                            <Shield size={15} />
                            Account Type
                        </div>
                        <span className="profile-badge">
                            {data.account_type}
                        </span>
                    </div>

                    <div className="profile-row">
                        <div className="profile-label">
                            <BadgeCheck size={15} />
                            Account Status
                        </div>
                        <span
                            className={`profile-badge ${
                                data.is_active ? "badge-success" : "badge-danger"
                            }`}
                        >
                            {data.is_active ? "Active" : "Inactive"}
                        </span>
                    </div>

                    <div className="profile-row">
                        <div className="profile-label">
                            <BadgeCheck size={15} />
                            Email Status
                        </div>
                        <span
                            className={`profile-badge ${
                                data.email_verified
                                    ? "badge-success"
                                    : "badge-danger"
                            }`}
                        >
                            {data.email_verified ? "Verified" : "Not Verified"}
                        </span>
                    </div>

                    <div className="profile-row">
                        <div className="profile-label">
                            <Calendar size={15} />
                            Joined
                        </div>
                        <span>
                            {new Date(data.date_joined).toLocaleDateString()}
                        </span>
                    </div>

                    <div className="profile-row">
                        <div className="profile-label">
                            <Clock size={15} />
                            Last Login
                        </div>
                        <span>
                            {data.last_login
                                ? new Date(data.last_login).toLocaleString()
                                : "Never"}
                        </span>
                    </div>
                </div>
            </div>

            <div className="profile-section">
                <h4>Permissions</h4>

                <div className="profile-info">
                    <div className="profile-row">
                        <div className="profile-label">
                            <Shield size={15} />
                            Staff Access
                        </div>
                        <span
                            className={`profile-badge ${
                                data.is_staff ? "badge-success" : ""
                            }`}
                        >
                            {data.is_staff ? "Enabled" : "Disabled"}
                        </span>
                    </div>

                    <div className="profile-row">
                        <div className="profile-label">
                            <Shield size={15} />
                            Administrator
                        </div>
                        <span
                            className={`profile-badge ${
                                data.is_superuser ? "badge-success" : ""
                            }`}
                        >
                            {data.is_superuser ? "Yes" : "No"}
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Profile;