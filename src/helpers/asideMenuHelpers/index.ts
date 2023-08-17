import newGuid from '@/helpers/stringHelpers/newGuid';
import type { TAsideMenuItem } from '@/layouts/DashboardLayout';
export function menuItem(config: Partial<TAsideMenuItem>) {
  const item: TAsideMenuItem = {
    id: newGuid(),
    type: 'link',
    ...config,
  };
  return item;
}
export function labelItem(config: Partial<TAsideMenuItem>) {
  const item: TAsideMenuItem = {
    id: newGuid(),
    type: 'label',
    ...config,
  };
  return item;
}
export function divider(config?: Partial<TAsideMenuItem>) {
  const item: TAsideMenuItem = {
    id: newGuid(),
    type: 'divider',
    ...config,
  };
  return item;
}
