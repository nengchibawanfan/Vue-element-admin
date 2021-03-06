import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'

/** note: sub-menu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']    will control the page roles (you can set multiple roles)
    title: 'title'               the name show in sub-menu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if true, the page will no be cached(default is false)
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
    affix: true                  if true, the tag will affix in the tags-view
  }
**/

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 * */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authRedirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', noCache: true, affix: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
*/
export const asyncRoutes = [

  {
    path: '/statistics',
    component: Layout,
    children: [
      {
        path: '/statistics',

        component: () => import('@/views/statistics/statistics'),
        meta: { title: '资产总览', icon: 'icon' }
      }
    ]
  },
  // {
  //   path: '/market_make_assessment',
  //   component: Layout,
  //   children: [
  //     {
  //       path: '/market_make_assessment',
  //       component: () => import('@/views/marketMakeAssessment/marketMakeAssessment'),
  //       meta: { title: '做市深度评价指标', icon: 'icon' }
  //     }
  //   ]
  // },
  {
    path: '/realuser_chip_distribution',
    component: Layout,
    alwaysShow: true,
    meta: { title: '筹码分布', icon: 'chart' },
    children: [
      {
        path: '/realuser_chip_distribution',
        component: () => import('@/views/realuser/chipDistribution'),
        meta: { title: '所有用户筹码分布', icon: 'icon' }
      },
      {
        path: '/single_realuser_chip_distribution',
        component: () => import('@/views/realuser/singleChipDistribution'),
        meta: { title: '单用户角度筹码分布', icon: 'icon' }
      }
    ]
  },
  // {
  //   path: '/exchange_activity',
  //   component: Layout,
  //   alwaysShow: true,
  //   meta: { title: '交易所活跃度', icon: 'chart' },
  //   children: [
  //     {
  //       path: '/realuser_chip_distribution',
  //       component: () => import('@/views/realuser/chipDistribution'),
  //       meta: { title: '各交易所盘口价差率', icon: 'icon' }
  //     },
  //     {
  //       path: '/single_realuser_chip_distribution',
  //       component: () => import('@/views/realuser/singleChipDistribution'),
  //       meta: { title: '交易所市场深度', icon: 'icon' }
  //     }
  //   ]
  // },

  {
    path: '/tradingVol',
    component: Layout,
    alwaysShow: true,
    meta: { title: '交易统计', icon: 'chart' },
    children: [
      {
        path: 'allmarket',
        name: 'allmarket',
        component: () => import('@/views/tradingVolume/allmarket'),
        meta: { title: '所有市场交易量' }
      },
      {
        path: 'singlemarket',

        component: () => import('@/views/tradingVolume/singlemarket'),
        meta: { title: '自定义市场交易量' }
      },

      {
        // path: 'tradingVol/date/:date',
        path: 'tradingVol',

        name: 'tradingvolumedetails',
        // hidden: true,
        // 隐藏起来
        // component: Layout,
        component: () => import('@/views/tradingVolume/tradingvolumedetails'),
        meta: { title: '单日交易量分布' }

      },

      {
        path: 'realuser_num',
        name: 'realuser_num',
        component: () => import('@/views/tradingVolume/realuser_num'),
        meta: { title: '真实用户交易人数' }
      }
    ]
  },
  {
    path: '/balance',
    component: Layout,
    // redirect: '/balance/show',
    alwaysShow: true,
    meta: { title: '做市资产统计', icon: 'peoples' },
    children: [
      {
        // path: 'singleSymbol/exchange/:exchange/coinid/:coinid',
        path: 'singleSymbol',

        component: () => import('@/views/balance/singleSymbol'),
        meta: { title: '单个资产情况' }
      },
      {
        path: 'allSymbolDistribution',
        component: () => import('@/views/balance/allSymbolDistribution'),
        meta: { title: '所有资产信息' }
      },
      // {
      //   path: 'allSymbolInfo',
      //   component: () => import('@/views/balance/allSymbolInfo'),
      // name: 'hello',
      //   meta: { title: '所有资产信息' }
      // },
      {
        path: 'totalETH',
        name: 'totalETH',
        component: () => import('@/views/balance/totalETH'),
        meta: { title: '做市总ETH数量' }
      }
    ]
  },
  {
    path: '/service_charge',
    component: Layout,
    // redirect: '/balance/show',
    alwaysShow: true,
    meta: { title: '手续费消耗统计', icon: 'chart' },
    children: [
      {
        path: 'btt_info',
        component: () => import('@/views/charge/bttCharge'),
        meta: { title: 'btt情况' }
      },
      {
        path: 'ETH_charge',
        component: () => import('@/views/charge/ethCharge'),
        meta: { title: '所有手续费的消耗(ETH)' }
      }
    ]
  },

  // {
  //   path: '/icon',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/svg-icons/index'),
  //       name: 'Icons',
  //       meta: { title: 'icons', icon: 'icon', noCache: true }
  //     }
  //   ]
  // },

  /** when your routing map is too long, you can split it into small modules **/
  // componentsRouter,
  // chartsRouter,
  // nestedRouter,
  // tableRouter,

  {
    path: '/amount_info',
    hidden: true,
    // 隐藏起来
    component: Layout,
    children: [
      {
        path: '/amount_info/coinname/:coinname',
        component: () => import('@/views/statistics/amountInfo'),
        meta: { title: '数量信息', icon: 'form' }
      }
    ]
  },

  // 首页信息详情

  // 做市综合指数
  {
    path: '/marketmakeIndicator',
    hidden: true,
    // 隐藏起来
    component: Layout,
    children: [
      {
        path: '/marketmakeIndicator',
        name: 'marketmakeIndicator',
        component: () => import('@/views/marketmakeIndicator/marketmakeIndicator'),
        meta: { title: '做市综合指数', icon: 'form' }
      }
    ]
  },

  {
    path: '/marketmakecontral',
    // hidden: true,
    // 隐藏起来
    component: Layout,
    children: [
      {
        path: '/marketmakecontral',
        name: 'marketmakecontral',
        component: () => import('@/views/marketmakecontral/marketmakecontral'),
        meta: { title: '做市系统控制', icon: 'form' }
      }
    ]
  },

  {
    path: '/accountInfo',
    // hidden: true,
    // 隐藏起来
    component: Layout,
    children: [
      {
        path: '/accountInfo',
        name: 'accountInfo',
        component: () => import('@/views/accountInfo/accountInfo'),
        meta: { title: '账户信息（修改密码，充值地址）', icon: 'form' }
      }
    ]
  },
  {
    path: '/marketmakeraccount',
    // hidden: true,
    // 隐藏起来
    component: Layout,
    children: [
      {
        path: '/marketmakeraccount',
        name: 'marketmakeraccount',
        component: () => import('@/views/marketmakeraccount/marketmakeraccount'),
        meta: { title: '做市账户', icon: 'form' }
      }
    ]
  }
  // {
  //   path: '/registmarketmakeaccount',
  //   // hidden: true,
  //   // 隐藏起来
  //   component: Layout,
  //   children: [
  //     {
  //       path: '/registmarketmakeaccount',
  //       name: 'registmarketmakeaccount',
  //       component: () => import('@/views/marketmakeraccount/marketmakeraccount'),
  //       meta: { title: '做市账户', icon: 'form' }
  //     }
  //   ]
  // },

  // // 真实用户数量展示
  // {
  //   path: '/realuser_num_info',
  //   component: Layout,
  //   children: [
  //     {
  //       path: '/realuser_num_info',
  //       component: () => import('@/views/realuser/tradingNum'),
  //       meta: { title: '真实用户数量详情', icon: 'form' }
  //     }
  //   ]
  // },
  // // 真实用户交易量展示
  // {
  //   path: '/realuser_trading_volume_info',
  //   component: Layout,
  //   children: [
  //     {
  //       path: '/realuser_trading_volume_info',Ï
  //       component: () => import('@/views/realuser/tradingVolume'),
  //       meta: { title: '真实用户交易量详情', icon: 'form' }
  //     }
  //   ]
  // }

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/list',
  //   name: 'Example',
  //   meta: {
  //     title: 'example',
  //     icon: 'example'
  //   },
  //   children: [
  //     {
  //       path: 'create',
  //       component: () => import('@/views/example/create'),
  //       name: 'CreateArticle',
  //       meta: { title: 'createArticle', icon: 'edit' }
  //     },
  //     {
  //       path: 'edit/:id(\\d+)',
  //       component: () => import('@/views/example/edit'),
  //       name: 'EditArticle',
  //       meta: { title: 'editArticle', noCache: true },
  //       hidden: true
  //     },
  //     {
  //       path: 'list',
  //       component: () => import('@/views/example/list'),
  //       name: 'ArticleList',
  //       meta: { title: 'articleList', icon: 'list' }
  //     }
  //   ]
  // },

  // {
  //   path: '/tab',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/tab/index'),
  //       name: 'Tab',
  //       meta: { title: 'tab', icon: 'tab' }
  //     }
  //   ]
  // },

  // {
  //   path: '/error',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   name: 'ErrorPages',
  //   meta: {
  //     title: 'errorPages',
  //     icon: '404'
  //   },
  //   children: [
  //     {
  //       path: '401',
  //       component: () => import('@/views/errorPage/401'),
  //       name: 'Page401',
  //       meta: { title: 'page401', noCache: true }
  //     },
  //     {
  //       path: '404',
  //       component: () => import('@/views/errorPage/404'),
  //       name: 'Page404',
  //       meta: { title: 'page404', noCache: true }
  //     }
  //   ]
  // },

  // {
  //   path: '/error-log',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   children: [
  //     {
  //       path: 'log',
  //       component: () => import('@/views/errorLog/index'),
  //       name: 'ErrorLog',
  //       meta: { title: 'errorLog', icon: 'bug' }
  //     }
  //   ]
  // },

  // {
  //   path: '/excel',
  //   component: Layout,
  //   redirect: '/excel/export-excel',
  //   name: 'Excel',
  //   meta: {
  //     title: 'excel',
  //     icon: 'excel'
  //   },
  //   children: [
  //     {
  //       path: 'export-excel',
  //       component: () => import('@/views/excel/exportExcel'),
  //       name: 'ExportExcel',
  //       meta: { title: 'exportExcel' }
  //     },
  //     {
  //       path: 'export-selected-excel',
  //       component: () => import('@/views/excel/selectExcel'),
  //       name: 'SelectExcel',
  //       meta: { title: 'selectExcel' }
  //     },
  //     {
  //       path: 'export-merge-header',
  //       component: () => import('@/views/excel/mergeHeader'),
  //       name: 'MergeHeader',
  //       meta: { title: 'mergeHeader' }
  //     },
  //     {
  //       path: 'upload-excel',
  //       component: () => import('@/views/excel/uploadExcel'),
  //       name: 'UploadExcel',
  //       meta: { title: 'uploadExcel' }
  //     }
  //   ]
  // },

  // {
  //   path: '/zip',
  //   component: Layout,
  //   redirect: '/zip/download',
  //   alwaysShow: true,
  //   meta: { title: 'zip', icon: 'zip' },
  //   children: [
  //     {
  //       path: 'download',
  //       component: () => import('@/views/zip/index'),
  //       name: 'ExportZip',
  //       meta: { title: 'exportZip' }
  //     }
  //   ]
  // },

  // {
  //   path: '/pdf',
  //   component: Layout,
  //   redirect: '/pdf/index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/pdf/index'),
  //       name: 'PDF',
  //       meta: { title: 'pdf', icon: 'pdf' }
  //     }
  //   ]
  // },
  // {
  //   path: '/pdf/download',
  //   component: () => import('@/views/pdf/download'),
  //   hidden: true
  // },

  // {
  //   path: '/theme',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/theme/index'),
  //       name: 'Theme',
  //       meta: { title: 'theme', icon: 'theme' }
  //     }
  //   ]
  // }

  // {
  //   path: '/clipboard',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/clipboard/index'),
  //       name: 'ClipboardDemo',
  //       meta: { title: 'clipboardDemo', icon: 'clipboard' }
  //     }
  //   ]
  // },

  // {
  //   path: '/i18n',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/i18n-demo/index'),
  //       name: 'I18n',
  //       meta: { title: 'i18n', icon: 'international' }
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://github.com/PanJiaChen/vue-element-admin',
  //       meta: { title: 'externalLink', icon: 'link' }
  //     }
  //   ]
  // },

  // { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
