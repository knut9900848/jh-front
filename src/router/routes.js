
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('pages/Index.vue')
      },

      {
        path: '/login',
        name: 'login',
        component: () => import('pages/auth/Login.vue')
      },

      {
        path: '/admin/members',
        name: 'admin-members',
        component: () => import('pages/admin/members/Layout.vue'),
        children: [
          {
            path: '',
            name: 'admin-members-index',
            component: () => import('pages/admin/members/Index.vue')
          },

          {
            path: '/admin/members/:id/edit',
            name: 'admin-members-edit',
            component: () => import('pages/admin/members/Edit.vue')
          },

          {
            path: '/admin/members/create',
            name: 'admin-members-create',
            component: () => import('pages/admin/members/Edit.vue')
          }
        ]
      },

      {
        path: '/admin/settings',
        name: 'admin-settings',
        component: () => import('pages/admin/settings/Layout.vue'),
        children: [
          {
            path: '',
            name: 'admin-settings-branch',
            component: () => import('pages/admin/settings/Branch.vue')
          },
          {
            path: 'bank-accounts',
            name: 'admin-settings-bank-account',
            component: () => import('pages/admin/settings/BankAccount.vue')
          },
          {
            path: 'currencies',
            name: 'admin-settings-currency',
            component: () => import('pages/admin/settings/Currency.vue')
          },
          {
            path: 'units',
            name: 'admin-settings-unit',
            component: () => import('pages/admin/settings/Unit.vue')
          },
          {
            path: 'terms-and-conditions',
            name: 'admin-settings-terms-and-conditions',
            component: () => import('pages/admin/settings/TermsAndConditions.vue')
          }
        ]
      },

      {
        path: '/punches',
        name: 'punches',
        component: () => import('pages/punch/Index.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
