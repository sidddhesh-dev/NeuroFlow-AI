import "./DeleteAccount.css";

import { useState } from "react";

import { X, AlertTriangle } from "lucide-react";

import { useDeleteAccountMutation } from "../../../hooks/useDeleteAccountMutation";

function DeleteAccount({ onClose }) {

    const deleteAccountMutation =
        useDeleteAccountMutation();

    const [confirmation, setConfirmation] =
        useState("");

    const [error, setError] =
        useState("");

    async function handleDelete() {

        setError("");

        try {

            await deleteAccountMutation.mutateAsync(
                confirmation
            );

            window.location.href = "/login";

        }

        catch (error) {

            setError(

                error.message ||

                "Unable to delete account."

            );

        }

    }

    return (

        <div
            className="delete-account-overlay"
            onClick={onClose}
        >

            <div
                className="delete-account-modal"
                onClick={(event) =>
                    event.stopPropagation()
                }
            >

                <div className="delete-account-header">

                    <h2>

                        Delete Account

                    </h2>

                    <button onClick={onClose}>

                        <X size={18} />

                    </button>

                </div>

                <div className="delete-warning">

                    <AlertTriangle size={34} />

                    <div>

                        <h3>

                            This action is permanent

                        </h3>

                        <p>

                            Your chats, notes, documents,

                            history and settings will be

                            permanently removed.

                        </p>

                    </div>

                </div>

                <label>

                    Type

                    <strong>

                        {" "}DELETE{" "}

                    </strong>

                    to continue

                </label>

                <input

                    type="text"

                    value={confirmation}

                    onChange={(event) =>

                        setConfirmation(

                            event.target.value

                        )

                    }

                    placeholder="DELETE"

                />

                {

                    error && (

                        <p className="delete-error">

                            {error}

                        </p>

                    )

                }

                <div className="delete-actions">

                    <button

                        className="cancel-delete"

                        onClick={onClose}

                    >

                        Cancel

                    </button>

                    <button

                        className="confirm-delete"

                        disabled={

                            confirmation !== "DELETE"

                        }

                        onClick={handleDelete}

                    >

                        {

                            deleteAccountMutation.isPending

                                ? "Deleting..."

                                : "Delete Account"

                        }

                    </button>

                </div>

            </div>

        </div>

    );

}

export default DeleteAccount;