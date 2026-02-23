import React, { useState } from 'react';
import { FaFilePdf, FaFilter, FaSpinner, FaChartBar, FaChartPie, FaTasks, FaChevronDown } from 'react-icons/fa';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  ComposedChart, Line, PieChart, Pie, Cell 
} from 'recharts';
import api from '../../services/api';
import './ReportsPage.css';

function ReportsPage() {
  const [reportType, setReportType] = useState('productivity');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reportData, setReportData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const endpoints = {
    productivity: '/reports/technician-productivity',
    pauses: '/reports/pause-bottlenecks',
    sla: '/reports/sla'
  };

  const handleFetchReport = async () => {
    if (!startDate || !endDate) {
      alert("Por favor, selecione as datas de início e fim.");
      return;
    }

    setIsLoading(true);
    setReportData(null);

    try {
      const response = await api.get(endpoints[reportType], {
        params: { startDate, endDate }
      });
      setReportData(response.data);
    } catch (error) {
      console.error("Erro ao buscar relatório:", error);
      alert("Falha ao gerar o relatório. Verifique a conexão com o servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrintPdf = () => {
    window.print();
  };

  return (
    <div className="reports-page-container">
      <div className="reports-filters no-print">
        <div className="filters-header">
          <h2><FaChartBar /> Painel de Relatórios Gerenciais</h2>
          <p>Selecione os parâmetros abaixo para analisar o desempenho da oficina.</p>
        </div>
        
        <div className="filters-row">
          <div className="filter-group report-selector">
            <label>Tipo de Relatório</label>
            <div className="custom-select-wrapper">
              <select value={reportType} onChange={(e) => { setReportType(e.target.value); setReportData(null); }}>
                <option value="productivity">1. Produtividade Individual dos Técnicos</option>
                <option value="pauses">2. Motivos de Pausa e Gargalos (Pareto)</option>
                <option value="sla">3. SLA das Tarefas (Semáforo)</option>
              </select>
            </div>
          </div>

          <div className="filter-group date-picker">
            <label>Data Início</label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </div>

          <div className="filter-group date-picker">
            <label>Data Fim</label>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>

          <div className="filter-actions">
            <button className="btn-generate" onClick={handleFetchReport} disabled={isLoading}>
              {isLoading ? <FaSpinner className="spinner" /> : <FaFilter />} Gerar Dados
            </button>
            <button className="btn-pdf" onClick={handlePrintPdf} disabled={!reportData}>
              <FaFilePdf /> Exportar PDF
            </button>
          </div>
        </div>
      </div>

      <div className="reports-content printable-area">
        {isLoading && (
          <div className="loading-state no-print">
            <FaSpinner className="spinner large" />
            <p>Processando dados...</p>
          </div>
        )}
        
        {!isLoading && !reportData && (
          <div className="empty-state no-print">
            <FaChartPie className="empty-icon" />
            <p>Os resultados e gráficos aparecerão aqui.</p>
          </div>
        )}

        {!isLoading && reportData && (
          <div className="report-render">
            <div className="report-header print-only">
              <h2>Grupo New Toyota - Relatório Gerencial</h2>
              <p><strong>Período Analisado:</strong> {startDate} até {endDate}</p>
              <hr />
            </div>

            {reportType === 'productivity' && <ProductivityReport data={reportData} />}
            {reportType === 'pauses' && <PausesReport data={reportData} />}
            {reportType === 'sla' && <SlaReport data={reportData} />}
          </div>
        )}
      </div>
    </div>
  );
}

/* --- SUBCOMPONENTES (TABELA NA ESQUERDA, GRÁFICO NA DIREITA) --- */

const ProductivityReport = ({ data }) => {
  if (!Array.isArray(data) || data.length === 0) return <p>Nenhum dado encontrado para o período.</p>;

  return (
    <div className="split-layout">
      {/* Esquerda: Tabela Compacta */}
      <div className="table-container compact">
        <h3>Desempenho da Equipe</h3>
        <table className="data-table">
          <thead>
            <tr>
              <th>Técnico</th>
              <th className="center">Concluídas</th>
              <th className="center">Eficiência</th>
              <th className="center">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td><strong>{item.technicianName}</strong></td>
                <td className="center highlight">{item.totalTasksFinished}</td>
                <td className="center">{item.efficiencyRate}%</td>
                <td className="center"><span className={`status-badge ${item.status?.toLowerCase()}`}>{item.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Direita: Gráfico */}
      <div className="chart-container compact">
        <h3>Produtividade (Tarefas)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="technicianName" tick={{fontSize: 12}} />
            <YAxis tick={{fontSize: 12}} />
            <Tooltip cursor={{fill: 'rgba(0,0,0,0.05)'}} />
            <Legend wrapperStyle={{fontSize: '12px'}} />
            <Bar dataKey="totalTasksFinished" name="Tarefas Concluídas" fill="#2563eb" radius={[4, 4, 0, 0]} barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const PausesReport = ({ data }) => {
  if (!Array.isArray(data) || data.length === 0) return <p>Nenhuma pausa registrada no período.</p>;

  return (
    <div className="split-layout">
      {/* Esquerda: Tabela Compacta */}
      <div className="table-container compact">
        <h3>Gargalos e Pausas</h3>
        <table className="data-table">
          <thead>
            <tr>
              <th>Motivo</th>
              <th className="center">Qtd</th>
              <th className="center">Perdido</th>
              <th className="center">Acum.</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td><strong>{item.pauseReason}</strong></td>
                <td className="center">{item.occurrences}</td>
                <td className="center text-red">{item.totalWastedMinutes}m</td>
                <td className="center"><strong>{item.accumulatedPercentage}%</strong></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Direita: Gráfico */}
      <div className="chart-container compact">
        <h3>Gráfico de Pareto</h3>
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={data} margin={{ top: 20, right: 0, bottom: 0, left: -20 }}>
            <CartesianGrid stroke="#f5f5f5" vertical={false} />
            <XAxis dataKey="pauseReason" scale="band" tick={{fontSize: 10}} />
            <YAxis yAxisId="left" tick={{fontSize: 12}} />
            <YAxis yAxisId="right" orientation="right" tickFormatter={(v) => `${v}%`} tick={{fontSize: 12}} />
            <Tooltip />
            <Legend wrapperStyle={{fontSize: '12px'}} />
            <Bar yAxisId="left" dataKey="occurrences" name="Ocorrências" barSize={30} fill="#f59e0b" radius={[4, 4, 0, 0]} />
            <Line yAxisId="right" type="monotone" dataKey="accumulatedPercentage" name="% Acumulada" stroke="#dc2626" strokeWidth={3} dot={{ r: 4 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const SlaReport = ({ data }) => {
  if (!data || !data.slaGreen) return <p>Formato de dados de SLA inválido ou vazio.</p>;

  const pieData = [
    { name: 'No Prazo', value: data.slaGreen.count, color: '#22c55e' },
    { name: 'Atenção', value: data.slaYellow.count, color: '#f59e0b' },
    { name: 'Atrasado', value: data.slaRed.count, color: '#ef4444' }
  ];

  return (
    <div className="sla-section">
      <div className="sla-summary-cards">
        <div className="sla-card total">
          <FaTasks className="sla-icon" />
          <div>
            <h4>Total de Tarefas</h4>
            <span className="sla-value">{data.totalTasksCompleted}</span>
          </div>
        </div>
        <div className="sla-card success">
          <h4>Índice de Pontualidade</h4>
          <span className="sla-value">{data.slaGreen.percentage}%</span>
        </div>
      </div>

      <div className="split-layout">
        {/* Esquerda: Tabela SLA */}
        <div className="table-container compact">
          <h3>Métricas do Semáforo</h3>
          <table className="data-table sla-table">
            <thead>
              <tr>
                <th>Classificação</th>
                <th className="center">Qtd</th>
                <th className="center">Percentual</th>
              </tr>
            </thead>
            <tbody>
              <tr className="row-green">
                <td><span className="dot green"></span> <strong>No Prazo</strong></td>
                <td className="center">{data.slaGreen.count}</td>
                <td className="center"><strong>{data.slaGreen.percentage}%</strong></td>
              </tr>
              <tr className="row-yellow">
                <td><span className="dot yellow"></span> <strong>Atenção</strong></td>
                <td className="center">{data.slaYellow.count}</td>
                <td className="center"><strong>{data.slaYellow.percentage}%</strong></td>
              </tr>
              <tr className="row-red">
                <td><span className="dot red"></span> <strong>Atrasado</strong></td>
                <td className="center">{data.slaRed.count}</td>
                <td className="center text-red"><strong>{data.slaRed.percentage}%</strong></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Direita: Gráfico de Pizza */}
        <div className="chart-container compact pie-chart">
          <h3>Distribuição</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={5} dataKey="value">
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} tarefas`, 'Quantidade']} />
              <Legend verticalAlign="middle" align="right" layout="vertical" wrapperStyle={{fontSize: '12px'}} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;