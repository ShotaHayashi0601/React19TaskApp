import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import AppLayout from '@/components/templates/AppLayout';
import NomatchPage from '@/components/pages/NomatchPage';
import TaskListPage from '@/components/pages/TaskListPage';
import SignInPage from '@/components/pages/SignInPage';
import SignUpPage from '@/components/pages/SignUpPage';
import { PATHS } from '@/constants';
const Router = () => {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route
            path={PATHS.ROOT}
            element={
              <>
                <SignedIn>
                  <TaskListPage />
                </SignedIn>
                <SignedOut>
                  <SignInPage />
                </SignedOut>
              </>
            }
          />
          <Route path={PATHS.SIGN_IN} element={<SignInPage />} />
          <Route path={PATHS.SIGN_UP} element={<SignUpPage />} />
          <Route path={PATHS.NO_MATCH} element={<NomatchPage />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
};

export default Router;
