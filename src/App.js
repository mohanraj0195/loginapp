import './App.css';
import MenuComponent from './components/menu-component';
import { Route, Routes } from 'react-router-dom';
import LoginForm from './components/login-component';
import ForgotPassword from './components/forgotpwd-component';
import { Content, Header } from 'antd/es/layout/layout';
import { Layout } from 'antd';
import { useState } from 'react';
import HomeComponent from './components/home-component';
import CodesComponent from './components/codes-component';
import GraphComponent from './components/graph-component';
import GridComponent from './components/grid-component';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [pageHeader, setPageHeader] = useState('Login Page');

  return (
    <div className="App">
      <Layout className='layout'>
        <Header className='header'>
          {
            pageHeader
          }
          {
            loggedIn && <MenuComponent setLoggedIn={setLoggedIn} setPageHeader={setPageHeader}/>
          }
        </Header>
        <Content className='content'>
          <div style={{ height: "100% !important"}}>
            <Routes>
              <Route path='/' element={<LoginForm setLoggedIn={setLoggedIn} setPageHeader={setPageHeader}/>} />
              <Route path='/forgotpwd' element={<ForgotPassword setPageHeader={setPageHeader} />} />
              <Route path='/home' element={<HomeComponent />}></Route>
              <Route path='/codes' element={<CodesComponent />}></Route>
              <Route path='/graph' element={<GraphComponent />}></Route>
              <Route path='/grid' element={<GridComponent />}></Route>
            </Routes>
          </div>
        </Content>
      </Layout>
    </div>
  )
};

export default App;