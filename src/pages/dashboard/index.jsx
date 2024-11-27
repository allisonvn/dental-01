import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Users, DollarSign, Activity, Bell, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LineChart, Line, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import MetricCard from '@/components/dashboard/MetricCard';
import GamificationSection from '@/components/dashboard/GamificationSection';
import DaySchedule from '@/components/dashboard/DaySchedule';
import TreatmentsCard from '@/components/dashboard/TreatmentsCard';
import DocumentsCard from '@/components/dashboard/DocumentsCard';

const Dashboard = () => {
  const [selectedPeriod] = useState('hoje');

  const metricsData = {
    consultasHoje: {
      valor: 8,
      variacao: '+12.5%',
      meta: 10
    },
    novosPacientes: {
      valor: 3,
      variacao: '+33.3%',
      meta: 5
    },
    faturamento: {
      valor: 2500,
      variacao: '+15.2%',
      meta: 5000
    },
    procedimentos: {
      valor: 12,
      variacao: '+20%',
      meta: 15
    }
  };

  const gamificationData = {
    level: 5,
    xp: 750,
    nextLevelXp: 1000,
    achievements: [
      { id: 1, name: 'Super Atendimento', icon: '🦷', progress: 80 },
      { id: 2, name: 'Pontualidade', icon: '⏰', progress: 65 },
      { id: 3, name: 'Satisfação', icon: '😊', progress: 90 }
    ],
    dailyChallenges: [
      { id: 1, name: 'Realizar 5 limpezas', progress: 3, total: 5, reward: 100 },
      { id: 2, name: 'Completar 3 restaurações', progress: 2, total: 3, reward: 75 }
    ]
  };

  const revenueData = [
    { name: 'Jan', faturamento: 12500, consultas: 25 },
    { name: 'Fev', faturamento: 15000, consultas: 30 },
    { name: 'Mar', faturamento: 18000, consultas: 35 },
    { name: 'Abr', faturamento: 16500, consultas: 32 },
    { name: 'Mai', faturamento: 19000, consultas: 38 },
    { name: 'Jun', faturamento: 22000, consultas: 42 }
  ];

  const weeklyStats = [
    { name: 'Limpezas', value: 30, fill: '#8884d8' },
    { name: 'Restaurações', value: 25, fill: '#82ca9d' },
    { name: 'Canais', value: 15, fill: '#ffc658' },
    { name: 'Extrações', value: 10, fill: '#ff8042' }
  ];

  const Header = () => (
    <div className="flex justify-between items-center mb-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <div>
        <h1 className="text-2xl font-bold">Bom dia, Dr. Silva!</h1>
        <p className="text-gray-500">Aqui está o resumo do seu consultório</p>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="outline" className="flex items-center gap-2">
          <Plus size={16} />
          Nova Consulta
        </Button>
        <Button variant="ghost" className="relative">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
            3
          </span>
        </Button>
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      <Header />
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard
          title="Consultas Hoje"
          value={metricsData.consultasHoje.valor}
          icon={Calendar}
          variation={metricsData.consultasHoje.variacao}
          color="bg-blue-500"
          progress={(metricsData.consultasHoje.valor / metricsData.consultasHoje.meta) * 100}
        />
        <MetricCard
          title="Novos Pacientes"
          value={metricsData.novosPacientes.valor}
          icon={Users}
          variation={metricsData.novosPacientes.variacao}
          color="bg-green-500"
          progress={(metricsData.novosPacientes.valor / metricsData.novosPacientes.meta) * 100}
        />
        <MetricCard
          title="Faturamento"
          value={`R$ ${metricsData.faturamento.valor}`}
          icon={DollarSign}
          variation={metricsData.faturamento.variacao}
          color="bg-orange-500"
          progress={(metricsData.faturamento.valor / metricsData.faturamento.meta) * 100}
        />
        <MetricCard
          title="Procedimentos"
          value={metricsData.procedimentos.valor}
          icon={Activity}
          variation={metricsData.procedimentos.variacao}
          color="bg-purple-500"
          progress={(metricsData.procedimentos.valor / metricsData.procedimentos.meta) * 100}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Desempenho Mensal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="faturamento" 
                    stroke="#8884d8" 
                    name="Faturamento (R$)"
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="consultas" 
                    stroke="#82ca9d" 
                    name="Consultas"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <GamificationSection data={gamificationData} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <DaySchedule />
        <Card>
          <CardHeader>
            <CardTitle>Procedimentos da Semana</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={weeklyStats}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  />
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TreatmentsCard />
        <DocumentsCard />
      </div>
    </div>
  );
};

export default Dashboard;