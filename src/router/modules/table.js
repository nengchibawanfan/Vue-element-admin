/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const tableRouter = {
  path: '/table',
  component: Layout,
  redirect: '/table/complex-table',
  name: 'Table',
  meta: {
    title: '做市系统转账记录',
    icon: 'table'
  },
  children: [
    // {
    //   path: 'dynamic-table',
    //   component: () => import('@/views/table/dynamicTable/index'),
    //   name: 'DynamicTable',
    //   meta: { title: 'dynamicTable' }
    // },
    {
      path: 'drag-table',
      // component: () => import('@/views/table/dragTable'),
      name: 'DragTable',
      meta: { title: '与Dice转账记录' }
    },
    // {
    //   path: 'inline-edit-table',
    //   component: () => import('@/views/table/inlineEditTable'),
    //   name: 'InlineEditTable',
    //   meta: { title: 'inlineEditTable' }
    // },
    {
      path: 'complex-table',
      // component: () => import('@/views/table/complexTable'),
      name: 'ComplexTable',
      meta: { title: '与外部交易所转账记录' }
    }
  ]
}
export default tableRouter
