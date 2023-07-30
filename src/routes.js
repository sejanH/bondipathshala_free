// import { Suspense, lazy } from 'react';

import HeaderLessLayout from "./pages/layouts/HeaderLessLayout";

// Free Exam Components
import FreeBeforeStart from './pages/free_exams/BeforeStart';
import FreeExamRules from './pages/free_exams/ExamRules';
import FreeOngoingExam from './pages/free_exams/OngoingExam';
import LandingPage from "./pages/LandingPage";
// import Result from "./pages/free_exams/Result";

export const pages = [
  {
    element: HeaderLessLayout,
    children: [
      {
        path:'/',
        element: LandingPage
      },
      {
        path:"/before-start",
        element: FreeBeforeStart,
      },
      {
        path:"/rules",
        element: FreeExamRules,
      },
      {
        path:"/ongoing",
        element: FreeOngoingExam,
      },
      // {
      //   path:"/result",
      //   element: Result,
      // }
    ],
  },
];