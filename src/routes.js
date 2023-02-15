// importing pages 
import Index from './pages/Index/Index' ;
import CourseInfo from './pages/CourseInfo/CourseInfo' ;
import Category from './pages/Category/Category' ;
import ArticleInfo from './pages/ArticleInfo/ArticleInfo' ;
import Courses from './pages/Courses/Courses'
import Articles from './pages/Articles/Articles'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Contact from './pages/Contact/Contact'
import Search from './pages/Search/Search'



import ProtectAdminRoutes from './components/ProtectRoutes/ProtectAdminRoutes';
// admin panel ;
import AdminPanel from './pages/AdminPanel/Index';
import Users from './pages/AdminPanel/Users/Users';
import AdminCourses from './pages/AdminPanel/AdminCourses/AdminCourses';
import Menus from './pages/AdminPanel/Menus/Menus';
import AdminArticles from './pages/AdminPanel/AdminArticles/AdminArticles'
import AdminCategories from './pages/AdminPanel/AdminCategories/AdminCategories'
import AdminContacts from './pages/AdminPanel/AdminContacts/AdminContacts'
import Sessions from './pages/AdminPanel/Sessions/Sessions'
import SessionsPage from './pages/SessionsPage/SessionsPage'
import AdminComments from './pages/AdminPanel/AdminComments/AdminComments'
import Discounts from './pages/AdminPanel/Discounts/Discounts'
import DraftArticle from './pages/AdminPanel/draftArticle/DraftArticle'
import AdminIndex from './pages/AdminPanel/AdminIndex/AdminIndex'
import AdminTickets from './pages/AdminPanel/AdminTickets/AdminTickets'


// userPanel ;
import UserPanel from './pages/UserPanel/UserPanel/UserPanel'
import UserIndex from './pages/UserPanel/UserIndex/UserIndex'
import UserOrders from './pages/UserPanel/UserOrders/UserOrders'
import OrderDetail from './pages/UserPanel/OrderDetail/OrderDetail'
import UserCourses from './pages/UserPanel/UserCourses/UserCourses'
import UserTickets from './pages/UserPanel/UserTickets/UserTickets'
import SendTicket from './pages/UserPanel/SendTicket/SendTicket'
import TicketPage from './pages/UserPanel/TicketPage/TicketPage'
import EditAccount from './pages/UserPanel/EditAccount/EditAccount'

const routes = [
  {
    path: "/",
    element: <Index />,
  },
  {
    path : "course-info/:courseName" ,
    element : <CourseInfo />
  },
  {
    path : "category-info/:categoryName/:pageNumber" ,
    element : <Category />
  },
  {
    path : "article-info/:articleName" ,
    element : <ArticleInfo />
  },
  {
    path : "/courses/:pageNumber" ,
    element : <Courses />
  },
  {
    path : "/articles/:pageNumber" ,
    element : <Articles />
  },
  {
    path : '/login' , 
    element : <Login />
  } , 
  {
    path : '/register' , 
    element : <Register />
  },
  {
    path : '/contact' , 
    element : <Contact />
  },
  {
    path : '/search/:searchedValue' , 
    element : <Search />
  },
  {
    path : '/courses/:shortName/:sessionID' , 
    element : <SessionsPage />
  },
  {
    path : '/p-admin/*', 
    element : <AdminPanel />,
    children : [
      {path : '' , element : <AdminIndex />},
      {path : 'users' , element : <Users />},
      {path : 'courses' , element : <AdminCourses />},
      {path : 'menus' , element : <Menus />},
      {path : 'articles' , element : <AdminArticles /> },
      {path : 'categories' , element : <AdminCategories />},
      {path : 'contacts' , element : <AdminContacts />},
      {path : 'sessions' , element : <Sessions />},
      {path : 'comments' , element : <AdminComments />},
      {path : 'discounts' , element : <Discounts />},
      {path : 'articles/draft/:shortName' , element : <DraftArticle />},
      {path : 'tickets' , element : <AdminTickets />}

    ]
  },
  {
    path : '/my-account/*' ,
    element : <UserPanel /> ,
    children : [
      {path : '' , element : <UserIndex />},
      {path : 'orders' , element : <UserOrders />},
      {path : 'orders/details/:id' , element : <OrderDetail />},
      {path : 'courses' , element : <UserCourses />},
      {path : 'tickets' , element : <UserTickets />},
      {path : 'send-ticket' , element : <SendTicket />},
      {path : 'ticketPage/:id' , element : <TicketPage />},
      {path : 'edit-account' , element : <EditAccount />},
    ]
  }
];

export { routes };
