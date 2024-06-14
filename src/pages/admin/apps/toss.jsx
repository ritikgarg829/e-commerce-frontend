import React from 'react'
import "../../../Styles/admin/toss.css";
import AdminSidebar from "../../../components/admin/adminSidebar"
import { useState } from "react";



const toss = () => {

    const [angle, setAngle] = useState(0);

    const flipCoin = () => {
        if (Math.random() > 0.5) setAngle((prev) => prev + 180);
        else setAngle((prev) => prev + 360);
    };

    return (
        <div className="adminContainer-toss">
            <AdminSidebar />
            <main className="toss-app-container">
                <h1 className="font-bold text-3xl">Toss</h1>
                <section>
                    <article
                        className="tosscoin"
                        onClick={flipCoin}
                        style={{
                            transform: `rotateY(${angle}deg)`,
                        }}
                    >
                        <div></div>
                        <div></div>
                    </article>
                </section>
            </main>
        </div>
    );
};

export default toss
