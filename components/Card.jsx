"use client";
import React, { useState } from "react";

export default function Card() {
    const [people, setPeople] = useState([]);
    const [newName, setNewName] = useState("");
    const [items, setItems] = useState([]);
    const [itemName, setItemName] = useState("");
    const [itemPrice, setItemPrice] = useState("");
    const [selected, setSelected] = useState({});

    function handleAddPerson() {
        if (newName === "") return;
        setPeople([...people, newName]);
        setNewName("");
    }

    function handleAddItem() {
        if (itemName === "" || itemPrice === "") return;
        setItems([...items, { name: itemName, price: Number(itemPrice) }]);
        setItemName("");
        setItemPrice("");
    }

    function handleSelect(person, itemIndex) {
        const copy = { ...selected };
        if (!copy[itemIndex]) copy[itemIndex] = [];

        if (copy[itemIndex].includes(person)) {
            copy[itemIndex] = copy[itemIndex].filter(p => p !== person);
        } else {
            copy[itemIndex].push(person);
        }

        setSelected(copy);
    }

    function calculateTotal() {
        const totals = {};
        for (let person of people) {
            totals[person] = 0;
        }

        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const selectedPeople = selected[i] || [];
            if (selectedPeople.length === 0) continue;

            const amount = item.price / selectedPeople.length;
            for (let person of selectedPeople) {
                totals[person] += amount;
            }
        }

        return totals;
    }

    return (
        <div>
            {/* People Section */}
            <div className="bg-[#11141B] flex justify-evenly text-white w-[98%] mt-10 h-64 rounded-[20px] overflow-hidden">
                <div className="w-full flex flex-col px-6 mt-6">
                    <h1>People</h1>
                    <div className="flex items-center gap-4 mt-5">
                        <input
                            type="text"
                            placeholder="Name"
                            className="w-full px-3 py-2 rounded-lg bg-[#161D2B]"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                        />
                        <button
                            className="px-4 py-2 bg-[#AC31EB] rounded-lg"
                            onClick={handleAddPerson}
                        >
                            +
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-4 mt-5 overflow-y-auto max-h-36 pr-2">
                        {people.map((person, index) => (
                            <div
                                key={index}
                                className="bg-[#291E45] text-white px-4 py-1 rounded-xl"
                            >
                                {person}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Items Section */}
            <div className="bg-[#11141B] flex justify-evenly text-white w-[98%] mt-10 h-72 rounded-[20px]">
                <div className="w-full flex flex-col px-6 mt-6">
                    <h1>Items</h1>
                    <div className="flex items-center gap-4 mt-5">
                        <input
                            type="text"
                            placeholder="Name"
                            className="w-full px-3 py-2 rounded-lg bg-[#161D2B]"
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Price"
                            className="w-full px-3 py-2 rounded-lg bg-[#161D2B]"
                            value={itemPrice}
                            onChange={(e) => setItemPrice(e.target.value)}
                        />
                        <button
                            className="px-4 py-2 bg-[#AC31EB] rounded-lg"
                            onClick={handleAddItem}
                        >
                            +
                        </button>
                    </div>
                    <div className="mt-4 h-[140px] overflow-y-auto">
                        {items.map((item, index) => (
                            <div key={index} className="bg-[#161D2A] p-3 rounded-lg mb-2">
                                <div className="flex justify-between">
                                    <h2>{item.name}</h2>
                                    <h2 className="text-[#AC31EB]">${item.price}</h2>
                                </div>
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {people.map((person, personIndex) => {
                                        const isSelected = selected[index]?.includes(person);
                                        return (
                                            <div
                                                key={personIndex}
                                                className={
                                                    "bg-[#291E45] text-white px-4 py-1 rounded-xl cursor-pointer " +
                                                    (isSelected ? "bg-[#AC31EB]" : "")
                                                }
                                                onClick={() => handleSelect(person, index)}
                                            >
                                                {person}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Summary Section */}
            <div className="bg-[#11141B] flex justify-evenly text-white w-[98%] mt-10 mb-10 h-72 rounded-[20px]">
                <div className="w-full flex flex-col px-6 mt-6">
                    <h1>Split Summary</h1>
                    <div className="mt-4 h-[175px] overflow-y-auto">
                        {people.map((person, index) => {
                            const totals = calculateTotal();
                            return (
                                <div
                                    key={index}
                                    className="bg-[#161D2A] p-3 rounded-lg mb-2 flex justify-between"
                                >
                                    <span>{person}</span>
                                    <div className="text-[#AC31EB]">
                                        Total: ${totals[person]?.toFixed(2) || "0.00"}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}