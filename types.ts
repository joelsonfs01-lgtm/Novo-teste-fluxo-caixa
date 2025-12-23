
export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE'
}

export type CompanyType = 'SPA';
export type ProfessionalType = 'Erika' | 'Edilene';

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  type: TransactionType;
  companyId: CompanyType;
  professional?: ProfessionalType;
}

export interface CashFlowSummary {
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

/**
 * Added missing interface to support structured AI insight responses
 */
export interface AIInsightResponse {
  summary: string;
  suggestions: string[];
  warnings: string[];
}
