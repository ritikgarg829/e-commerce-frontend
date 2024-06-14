import React, { useEffect, useState } from 'react';
import "../../../Styles/admin/management/createCoupon.css";
import AdminSidebar from "../../../components/admin/adminSidebar";
import { useNewCouponMutation } from "../../../redux/api/coupon-api";
import toast from "react-hot-toast";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom"

const allLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const allNumbers = "1234567890";
const allSymbols = "!@#$%^&*()_+";

const createCoupon = () => {
    const { user } = useSelector((state) => state.userReducer);
    const [newCoupon] = useNewCouponMutation();

    const [size, setSize] = useState(8);
    const [prefix, setPrefix] = useState("");
    const [amount, setAmount] = useState(0);
    const [includeNumbers, setIncludeNumbers] = useState(false);
    const [includeCharacters, setIncludeCharacters] = useState(false);
    const [includeSymbols, setIncludeSymbols] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const [coupon, setCoupon] = useState("");

    const copyText = async (coupon) => {
        await window.navigator.clipboard.writeText(coupon);
        setIsCopied(true);
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!includeNumbers && !includeCharacters && !includeSymbols) {
            return toast.error("Please select at least one option: Numbers, Characters, or Symbols.");
        }

        let result = prefix || "";
        const loopLength = size - result.length;

        for (let i = 0; i < loopLength; i++) {
            let entireString = "";
            if (includeCharacters) entireString += allLetters;
            if (includeNumbers) entireString += allNumbers;
            if (includeSymbols) entireString += allSymbols;

            const randomNum = Math.floor(Math.random() * entireString.length);
            result += entireString[randomNum];
        }


        const mycoupon = result.toUpperCase()
        setCoupon(mycoupon);

        const res = await newCoupon({ coupon: mycoupon, userid: user?._id, amount });
        console.log("error", res)

        if (res.error) {
            toast.error("Failed to create coupon.");
        } else {
            toast.success("Coupon created successfully.");
        }
    };

    useEffect(() => {
        setIsCopied(false);
    }, [coupon]);

    return (
        <div className="adminContainer">
            <AdminSidebar />
            <main className="dashboard-app-container">
                <h1 className="font-bold text-3xl text-center">Create Coupon</h1>
                <section>
                    <form className="coupon-form" onSubmit={submitHandler}>
                        <input
                            type="text"
                            placeholder="Text to include"
                            value={prefix}
                            onChange={(e) => setPrefix(e.target.value)}
                            maxLength={size}
                        />

                        <input
                            type="number"
                            placeholder="Coupon Length"
                            value={size || ""}
                            onChange={(e) => setSize(Number(e.target.value))}
                            min={8}
                            max={25}
                        />

                        <input
                            type="number"
                            placeholder="Coupon amount"
                            value={amount || ""}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            min={50}
                        />

                        <fieldset>
                            <legend>Include</legend>

                            <input
                                type="checkbox"
                                checked={includeNumbers}
                                onChange={() => setIncludeNumbers(prev => !prev)}
                            />
                            <span>Numbers</span>

                            <input
                                type="checkbox"
                                checked={includeCharacters}
                                onChange={() => setIncludeCharacters(prev => !prev)}
                            />
                            <span>Characters</span>

                            <input
                                type="checkbox"
                                checked={includeSymbols}
                                onChange={() => setIncludeSymbols(prev => !prev)}
                            />
                            <span>Symbols</span>
                        </fieldset>
                        <button className="generate" type="submit">Create Coupon</button>
                    </form>

                    {coupon && (
                        <code>
                            {coupon}{" "}
                            <span className="coupon-span" onClick={() => copyText(coupon)}>
                                {isCopied ? "Copied" : "Copy"}
                            </span>{" "}
                        </code>
                    )}
                </section>
            </main>
        </div>
    );
};

export default createCoupon;

