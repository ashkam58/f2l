export interface FlowOption {
  label: string;
  nextStepId: string;
  variant?: 'primary' | 'secondary' | 'danger';
}

export interface FlowStep {
  id: string;
  title: string;
  description: string;
  imageType: 'start' | 'question' | 'action' | 'success';
  imageUrl?: string;
  algorithm?: string; // e.g., "R U R'"
  options: FlowOption[];
  tip?: string;
}

export type StepMap = Record<string, FlowStep>;