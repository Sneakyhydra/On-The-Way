// Imports
import { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import Home from './components/pages/Home';
import Dashboard from './components/pages/Dashboard';
import NotFound from './components/pages/NotFound';

// Auth routes
import RegisterStudent from './components/auth/RegisterStudent';
import RegisterCounsellor from './components/auth/RegisterCounsellor';
import RegisterAdmin from './components/auth/RegisterAdmin';

// Routing
import PrivateRoute from './components/routing/PrivateRoute';

// Layout components
import Alerts from './components/layout/Alert/Alerts';

// States
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import AdminState from './context/admin/AdminState';
import CounState from './context/counsellor/CounState';
import StudState from './context/student/StudState';

// CSS
import './App.css';
import Preloader from './components/layout/Preloader/Preloader';

const App = () => {
	return (
		<AuthState>
			<AlertState>
				<AdminState>
					<CounState>
						<StudState>
							<Router>
								<Alerts />
								<Routes>
									<Route exact path='/' element={<Home />} />

									<Route
										exact
										path='regstudent'
										element={<RegisterStudent />}
									/>

									<Route
										exact
										path='regcounsellor'
										element={<RegisterCounsellor />}
									/>

									<Route exact path='ad123' element={<RegisterAdmin />} />

									<Route
										exact
										path='dashboard'
										element={
											<PrivateRoute>
												<Suspense fallback={<Preloader />}>
													<Dashboard />
												</Suspense>
											</PrivateRoute>
										}
									/>

									<Route path='*' element={<NotFound />} />
								</Routes>
							</Router>
						</StudState>
					</CounState>
				</AdminState>
			</AlertState>
		</AuthState>
	);
};

export default App;
