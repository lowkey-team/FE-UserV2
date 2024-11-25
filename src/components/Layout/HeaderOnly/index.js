import Footer from "../components/Footer";
import Header from "../components/Header";
import SubHeader from "../components/SubHeader";

function DefaultLayout({ children }) {
    return <div>
         <Header />
        <div className="container-fill">
            <div className="row">
                    <div className="content">
                        {children}
                    </div>
            </div>
        </div>
        <Footer/>
    </div>
}

export default DefaultLayout;