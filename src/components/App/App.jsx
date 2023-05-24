import { Routes, Route, Navigate } from 'react-router-dom';
// import { Navigation } from '../Navigation/Navigation';

import { List } from '../pages/List/List';
import { ItemList } from '../pages/ItemList/ItemList';
import { Layout } from '../Layout/Layout';
import { SignUp } from '../pages/SignUp/SignUp';
import { SignIn } from '../pages/SignIn/SignIn';
import { EditProfile } from '../pages/EditProfile/EditProfile';
import { CreateArticle } from '../pages/CreateArticle/CreateArticle';

import './App.module.scss';

export function App() {
  return (
    <Routes>
      <Route path="/articles?" element={<Layout />}>
        <Route index element={<List />} />
        <Route path={'articles/:id'} element={<ItemList />} />
        <Route path={'sign-up'} element={<SignUp />}></Route>
        <Route path={'sign-in'} element={<SignIn />} />
        <Route path={'new-article'} element={<CreateArticle />} />
        <Route path={'articles/:id/edit'} element={<CreateArticle />} />
        <Route path={'profile'} element={<EditProfile />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
