//app.tsx
import Nav from './components/Nav/Nav';
import Home from './pages/Home/Home';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import Logo from './assets/LogoPng.png';
import { Routes, Route } from 'react-router-dom';
import Goals from './pages/Goals/Goals';
import RandomChallenges from './pages/RandomChallenges/RandomChallenges';
import DailyChallenges from './pages/DailyChallenges/DailyChallenges';
import FocusMode from './pages/FocusMode/FocusMode';
import CalendarPlanner from './pages/CalendarPlanner/CalendarPlanner';
import Statistics from './pages/Statistics/Statistics';
import ReportsSummary from './pages/ReportsSummary/RandomChallenges';
import Profile from './pages/Profile/Profile';
import Login from './pages/Login/Login';
import { AuthProvider } from './contexts/AuthContext';
import NewTask from './pages/NewTask/NewTask';
import WorkPanel from './pages/WorkPanel/WorkPanel';
import Register from './components/Register/Register';

function App() {
  return (
    <AuthProvider>
    <div className='appContainer'>
      <div className="div1"><img className='logoImg' src={Logo} alt='logoImage'/></div>
      <div className="div2"><Nav/></div>
      <div className="div3"><SearchBar/></div>
      <div className="div4">
        <Routes>
          <Route path="/" element={<Home />} />
           <Route path="/newTask" element={<NewTask/>} />
           <Route path="/WorkPanel" element={<WorkPanel/>} />
          <Route path="/daily-challenges" element={<DailyChallenges />} />
          <Route path="/randomChallenges" element={<RandomChallenges/>} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/focus-mode" element={<FocusMode />} />
          <Route path="/calendar" element={<CalendarPlanner />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/reports" element={<ReportsSummary />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
        </Routes>
      </div>
    </div>
    </AuthProvider>
  );
}

export default App;