import Sidebar from "./Sidebar.jsx";
import  Navbar  from "./Navbar.jsx";


const Layout = ({ children, showSidebar = false }) => {
  return (
    <div className="h-screen flex overflow-hidden">
        {/* Sidebar */}
        {showSidebar && < Sidebar />}

        <div className="flex-1 flex flex-col">
            <Navbar />

            <main className="flex-1 overflow-y-auto">
                {children}
            </main>
        </div>

    </div>
  )
}

export default Layout
