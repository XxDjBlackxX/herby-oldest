export interface SuperPaginatedItemsProps {
  itemsPerPage: number;
  itemKey: any;
  class: string;
  request: {
    url: string;
    body?: object;
  };
}

export interface SuperPaginatedItemsEmits {}

export interface SuperPaginatedTableProps {
  itemsPerPage: number;
  itemKey: any;
  class?: string;
  request: {
    url: string;
    body?: object;
  };
  heads: { value: string; name?: string; class?: string }[];
}

export interface SuperPaginatedTableEmits {
  click: any[];
}

export interface AdvancedPaginatedTableProps {
  itemsPerPage: number;
  itemKey: any;
  class?: string;
  request: {
    url: string;
    body?: object;
  };
  heads: { value: string; name?: string }[];
}

export interface AdvancedPaginatedTableEmits {}

export interface AdvancedPaginatedItemsProps {
  itemsPerPage: number;
  itemKey: any;
  class?: string;
  request: {
    url: string;
    body?: object;
  };
}

export interface AdvancedPaginatedItemsEmits {}
