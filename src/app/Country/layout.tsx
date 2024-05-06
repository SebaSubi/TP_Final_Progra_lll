import SideBar from "./mode/constructionBar";
// import SideNav from "./mode/sidebar";

export default function Layout(
  { children } : { children: React.ReactNode}
) {
  return(
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div >
        <SideBar />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
        {children}
        Your mom yeah
      </div>
    </div>
  )
}