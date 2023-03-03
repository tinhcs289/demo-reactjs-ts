import type { TSiteMapItem } from "@/types";
export type TNavTabItem = TSiteMapItem;
export type TNavTabsProps = {
  defaultValue?: number;
  dataTabs?: TNavTabItem[]
  stickyTop?: boolean
}