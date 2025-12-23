
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { TransactionType, ProfessionalType } from '../types';

interface Props {
  onAdd: (transaction: {
    description: string;
    amount: number;
    category: string;
    date: string;
    type: TransactionType;
    professional?: ProfessionalType;
  }) => void;
  onClose: () => void;
  companyName: string;
}

const TransactionForm: React.FC<Props> = ({ onAdd, onClose }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [type, setType] = useState<TransactionType>(TransactionType.INCOME);
  const [professional, setProfessional] = useState<ProfessionalType | ''>('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!description || !amount || !category) {
      setError('Preencha todos os campos obrigatórios.');
      return;
    }
    if (!professional) {
      setError('Escolha um profissional.');
      return;
    }

    onAdd({
      description,
      amount: parseFloat(amount),
      category,
      date,
      type,
      professional: professional as ProfessionalType
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-slate-800">Nova Transação</h2>
        <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-full transition-colors">
          <X className="w-6 h-6 text-slate-400" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex p-1 bg-slate-100 rounded-xl gap-1">
          <button 
            type="button" 
            onClick={() => setType(TransactionType.INCOME)} 
            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${type === TransactionType.INCOME ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500'}`}
          >
            Receita
          </button>
          <button 
            type="button" 
            onClick={() => setType(TransactionType.EXPENSE)} 
            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${type === TransactionType.EXPENSE ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-500'}`}
          >
            Despesa
          </button>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Profissional Responsável</label>
          <div className="flex gap-2">
            {['Erika', 'Edilene'].map(p => (
              <button 
                key={p} 
                type="button" 
                onClick={() => setProfessional(p as ProfessionalType)} 
                className={`flex-1 py-2 rounded-lg text-sm font-bold border-2 transition-all ${professional === p ? 'border-indigo-600 bg-indigo-50 text-indigo-600' : 'border-slate-100 text-slate-400 hover:border-slate-200'}`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1">
          <input 
            type="text" 
            placeholder="Descrição (ex: Limpeza de Pele)" 
            value={description} 
            onChange={e => setDescription(e.target.value)} 
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all" 
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1 space-y-1">
            <input 
              type="number" 
              placeholder="Valor" 
              value={amount} 
              onChange={e => setAmount(e.target.value)} 
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" 
            />
          </div>
          <div className="flex-1 space-y-1">
            <input 
              type="date" 
              value={date} 
              onChange={e => setDate(e.target.value)} 
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" 
            />
          </div>
        </div>

        <select 
          value={category} 
          onChange={e => setCategory(e.target.value)} 
          className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
        >
          <option value="">Selecione uma Categoria</option>
          <option value="Vendas">Vendas</option>
          <option value="Serviços">Serviços</option>
          <option value="Marketing">Marketing</option>
          <option value="Pessoal">Pessoal</option>
          <option value="Produtos">Produtos</option>
          <option value="Outros">Outros</option>
        </select>

        {error && (
          <p className="text-rose-600 text-xs font-medium bg-rose-50 p-2 rounded-lg border border-rose-100">
            {error}
          </p>
        )}

        <button 
          type="submit" 
          className={`w-full py-3 rounded-xl text-white font-bold transition-all shadow-lg active:scale-95 ${type === TransactionType.INCOME ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200' : 'bg-rose-600 hover:bg-rose-700 shadow-rose-200'}`}
        >
          Salvar Lançamento
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
