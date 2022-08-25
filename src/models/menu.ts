export type Menu = {
  uri: string | null | undefined;
  icon: string;
  label: string;
  children: Array<Menu> | null | undefined;
};
