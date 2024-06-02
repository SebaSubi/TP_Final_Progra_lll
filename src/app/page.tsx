import Image from "next/image";
import Progressbar from "./construccion_logic/components/progressbar";
// import GoldMine from "./components/GoldMine";
// import SideNav from "./construccion/mode/constructionBar";

const getUser = async() => {
  try {
    const res = await fetch('http://localhost:3000/api/user_instance', { cache: 'no-store' }) //Fetches the information, and sets the cache to no-store*
    if(!res.ok) {
      throw new Error("failed to fetch data")
    } //We check if the response is ok\
    console.log(res)
    return res.json()

  } catch (error) {
    console.log("Error loading topics:", error)
  }
}
//*The fetch normallyi will store the fist fetch in a cache, so if we update data and do the fetch, the updated data will not show


export default async function Home() {

  const {instance: users} = await getUser(); // Renaming instance cause i dirint feel like rewriting the html code

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {users.map((t: any, index: any) => (
        <div key={index}>
          The users are: {t.fullname} <br/>
          thir mail is: {t.email}
        </div>
      ))}
  
    </main>
  );
}
