export type EmployeeCardProps = {
  employee: {
    id: string;
    avatar: string;
    name: string;
    tag: string;
    position: string;
    birthDate: string;
    phone: string;
    email: string;
  };
  showBirthDate: boolean;
  onClick: () => void;
};

export type SearchFormProps = {
  onToggleFilterMenu: () => void;
  isFilterMenuVisible: boolean;
  onSearch: (query: string) => void;
  searchQuery: string;
};

export type NavigationProps = {
  setSelectedCategory: (category: string) => void;
};

export type FilterMenuProps = {
  onClose: () => void;
  isFilterMenuVisible: boolean;
  onFilterChange: (filter: 'alphabet' | 'birthday') => void;
  activeFilter: 'alphabet' | 'birthday';
};

export type YearsBlockProps = {
  year: number;
};

export type CallOnNumberProps = {
  phoneNumber: string | undefined;
  cancel: React.Dispatch<React.SetStateAction<boolean>>;
}
