// Homepage group configuration
// This defines the order and display of category groups on the homepage
// Categories are auto-discovered, but their grouping on the homepage is defined here

export interface GroupConfig {
  name: string;
  icon: string;
  order: number;
  department: 'Electronics' | 'Computers' | 'Home & Kitchen';
}

export const homepageGroups: Record<string, GroupConfig> = {
  'Camera & Photo': {
    name: 'Camera & Photo',
    icon: '📷',
    order: 1,
    department: 'Electronics'
  },
  'Headphones': {
    name: 'Headphones',
    icon: '🎧',
    order: 2,
    department: 'Electronics'
  },
  'Home Audio': {
    name: 'Home Audio',
    icon: '🔊',
    order: 3,
    department: 'Electronics'
  },
  'Data Storage': {
    name: 'Data Storage',
    icon: '💾',
    order: 4,
    department: 'Computers'
  },
  'Monitors': {
    name: 'Monitors',
    icon: '🖥️',
    order: 5,
    department: 'Computers'
  },
  'Kitchen & Dining': {
    name: 'Kitchen & Dining',
    icon: '🍳',
    order: 6,
    department: 'Home & Kitchen'
  },
  'Storage & Organization': {
    name: 'Storage & Organization',
    icon: '🫙',
    order: 7,
    department: 'Home & Kitchen'
  },
  'Misc': {
    name: 'Other',
    icon: '📦',
    order: 99,
    department: 'Home & Kitchen'
  }
};

// Get groups sorted by order
export function getSortedGroups(): string[] {
  return Object.entries(homepageGroups)
    .sort((a, b) => a[1].order - b[1].order)
    .map(([key]) => key);
}

// Department configuration for homepage display
export const departmentConfig: Record<string, { icon: string; order: number }> = {
  'Electronics': { icon: '🔌', order: 1 },
  'Computers': { icon: '💻', order: 2 },
  'Home & Kitchen': { icon: '🏠', order: 3 }
};

export function getSortedDepartments(): string[] {
  return Object.entries(departmentConfig)
    .sort((a, b) => a[1].order - b[1].order)
    .map(([key]) => key);
}

// Get department for a group name
export function getDepartmentForGroup(group: string): string {
  return homepageGroups[group]?.department || 'Home & Kitchen';
}