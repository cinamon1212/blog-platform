import { Routes, Route, Navigate } from 'react-router-dom';
// import { Navigation } from '../Navigation/Navigation';

import { List } from '../pages/List/List';
import { ItemList } from '../pages/ItemList/ItemList';
import { Layout } from '../Layout/Layout';
import { SignUp } from '../pages/SignUp/SignUp';
import { SignIn } from '../pages/SignIn/SignIn';
import { EditProfile } from '../pages/EditProfile/EditProfile';
import { CreateArticle } from '../pages/CreateArticle/CreateArticle';
import { Auth } from '../hoc/Auth';
import { NoAuth } from '../hoc/NoAuth';

import './App.module.scss';

export function App() {
   return (
      <Routes>
         <Route path="/articles?" element={<Layout />}>
            <Route index element={<List />} />
            <Route path={'articles/:id'} element={<ItemList />} />
            <Route
               path={'sign-up'}
               element={
                  <NoAuth>
                     <SignUp />
                  </NoAuth>
               }
            ></Route>
            <Route
               path={'sign-in'}
               element={
                  <NoAuth>
                     <SignIn />
                  </NoAuth>
               }
            />
            <Route
               path={'new-article'}
               element={
                  <Auth>
                     <CreateArticle />
                  </Auth>
               }
            />
            <Route
               path={'articles/:id/edit'}
               element={
                  <Auth>
                     <CreateArticle />
                  </Auth>
               }
            />
            <Route
               path={'profile'}
               element={
                  <Auth>
                     <EditProfile />
                  </Auth>
               }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
         </Route>
      </Routes>
   );
}
