import { useSession } from "next-auth/react";

export async function getContinents() {
    const res = await fetch("/api/user_instance", {
        method: "GET",
        headers: {
            "Content-type": "application/json",
        },
    });
    const data = await res.json();
    // console.log(data.instance);
    return data.instance;
}

export async function postUserInstance
    (
        userId: string,
        name: string,
        level: number,
        country: string,
        boosts: any[],
        units: number,
        gold: number,
        materials: any[]
    ) {

    try {
        const res = await fetch("/api/user_instance", {
            method: "POST",
            headers: {
                "Content-type": "application/json",

            },
            body: JSON.stringify({ userId, name, level, country, boosts, units, gold, materials })
        });

        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
    }
}