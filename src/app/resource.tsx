export interface Collectors {
  type: 'wood' | 'stone';
  workersAssigned?: number;
  maxWorkers?: number;
  image?: string;
  extractionCapacity?: number;
}