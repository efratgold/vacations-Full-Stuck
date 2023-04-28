import "./PageNotFound.css";
import notFound from "../../../Assets/images/page not found.jpg"

function PageNotFound(): JSX.Element {
    return (
        <div className="PageNotFound">
			<img src= {notFound} />
        </div>
    );
}

export default PageNotFound;
