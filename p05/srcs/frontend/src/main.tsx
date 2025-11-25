import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './style.css';
import { Home } from './pages/Home.tsx';
import { Auth } from './pages/auth/Auth.tsx';

export const ipPort = "http://localhost:8080/";

function App() {

	return (
		<Routes>
			<Route path='/'>
				<Route index element={<Home />} />
				<Route path='auth' element={<Auth />} />
			</Route>
		</Routes>
	);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<App />
	</BrowserRouter>
)
