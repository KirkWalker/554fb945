import { createBrowserRouter } from "react-router-dom";
import Inbox from './routes/Inbox.jsx';
import Archives from "./routes/Archives.jsx"
import Detail from "./routes/Detail.jsx"

export const router = createBrowserRouter([
    {path: '/', element: <Inbox /> },
    {path: '/archives', element: <Archives /> },
    {path: ':slug', element: <Detail /> }
]);
