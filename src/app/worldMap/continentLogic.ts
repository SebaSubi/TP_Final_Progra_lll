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

// export async function getContinent(name: string) {
//     const res = await fetch("/api/user_instance");
//     const data = await res.json();
//     // return data.instance;
// }

// export async function createContinent(continentName: string) {
//     const { data: session } = useSession();

//     const res = await fetch("/api/counter", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({(session?.user as any)?._id, (session?.user as any)?.fullname, 1, continentName, null, null, 500, null}),
//     });
//     return res.json();
// }

export async function postUserInstance
    (
        userId: string,
        name: string,
        level: number,
        country: string,
        boosts: any[],
        units: any[],
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