import { Route, Routes } from 'react-router-dom';
import FirstScreen from './pages/firstScreen/FirstScreen';
import Layout from './components/hoc/Layout';
import InfoPage from './pages/infoPage/InfoPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<FirstScreen />} />
        <Route path="/:id" element={<InfoPage />} />
      </Route>
    </Routes>
  );
}

export default App;
