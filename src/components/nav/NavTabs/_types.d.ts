import type { SiteMapItem } from "@/types";
export type NavTabItem = SiteMapItem;
export type NavTabsProps = {
  defaultValue?: number;
  dataTabs?: NavTabItem[]
  stickyTop?: boolean
}