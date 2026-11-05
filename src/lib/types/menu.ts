export interface MenuItem {
  id: string;
  title: string;
  categoryCode: string;
  categoryName: string;
  iconName: string;
  description?: string;
  permissionKey?: string;
  badge?: string;
}

export interface MenuCategory {
  code: string;
  title: string;
  description: string;
}
