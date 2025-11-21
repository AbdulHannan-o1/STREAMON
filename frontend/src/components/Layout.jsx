import Sidebar from "./Sidebar.jsx";
import  Navbar  from "./Navbar.jsx";


const Layout = ({ children, showSidebar = false }) => {
  return <div className="min-h-screen">
    <div className="flex">
        {/* Sidebar */}
        {showSidebar && < Sidebar />}

        <div className="flex-1 flex flex-col">
            <Navbar />

            <main className="flex overflow-y-auto">
                {children}
            </main>
        </div>

    </div>
  </div>
}

export default Layout
