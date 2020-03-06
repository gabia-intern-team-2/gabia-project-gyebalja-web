/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */
export default [
  /** 사용자 정의 Path */
  {
    path: '/login/register',
    name: 'Login Register',
    view: 'LoginRegister'
  },
  {
    path: '/boardList',
    name: 'Board List',
    view: 'BoardList'
  },
  {
    path: '/boardList/register',
    name: 'Board Register',
    view: 'BoardRegister'
  },
  {
    path: '/boardList/:boardId',
    name: 'Board Detail',
    view: 'BoardDetail'
  },
  {
    path: '/boardList/:boardId/edit',
    name: 'Board Edit',
    view: 'BoardEdit'
  },
  {
    path: '/userProfile',
    name: 'User Profile',
    view: 'UserProfile'
  },
  {
    path: '/userProfile/edit',
    name: 'Profile Edit',
    view: 'ProfileForm'
  },
  {
    path: '/myEducation',
    name: 'My Education',
    view: 'MyEducation'
  },
  {
    path: '/myEducation/register',
    name: 'Education Register',
    view: 'EducationForm'
  },
  {
    path: '/myEducation/:educationId/edit',
    name: 'Education Edit',
    view: 'EducationForm'
  },
  {
    path: '/myEducation/:educationId',
    name: 'Education Detail',
    view: 'EducationDetail'
  },
  {
    path: '/errorPage',
    name: 'Error Page',
    view: 'ErrorPage'
  },
  {
    path: '',
    name: 'Dashboard',
    view: 'Dashboard'
  }
]
