import "./ModelCard.css";

import { Bot } from "lucide-react";

import { useModelStatusQuery } from "../../hooks/useModelStatusQuery";

function SidebarModelCard() {

    const {

        data,

        isLoading,

    } = useModelStatusQuery();

    return (

        <div className="sidebar-model-card">

            <div className="sidebar-model-header">

                <Bot size={18} />

                <span>AI Model</span>

            </div>

            <div className="sidebar-model-body">

                <h3>

                    {isLoading
                        ? "Loading..."
                        : data?.provider}

                </h3>

                <div className="sidebar-model-status">

                    <span className="status-dot" />

                    <span>

                        {isLoading
                            ? "Checking..."
                            : data?.status}

                    </span>
                </div>
            </div>
        </div>
    );
}
export default SidebarModelCard;