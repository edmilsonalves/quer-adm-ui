export const menuItems = [
  {
    title: 'Dashboard',
    routerLink: 'dashboard',
    icon: 'fa-home',
    selected: false,
    expanded: false,
    order: 0
  }, 
  {
    title: 'Gerenciar produtos',
    routerLink: 'gerenciar-produtos',
    icon: 'fa-bar-chart',
    selected: false,
    expanded: false,
    order: 200,
    subMenu: [
      {
        title: 'Produtos',
        routerLink: 'gerenciar-produtos/produtos',
      },
    ]
  }
];
