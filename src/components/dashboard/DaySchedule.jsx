import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const DaySchedule = () => {
  const appointments = [
    {
      time: '09:00',
      patient: 'Maria Silva',
      procedure: 'Limpeza',
      status: 'confirmed',
      avatar: '/api/placeholder/32/32'
    },
    {
      time: '10:30',
      patient: 'João Santos',
      procedure: 'Restauração',
      status: 'pending',
      avatar: '/api/placeholder/32/32'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Agenda de Hoje</span>
          <Button variant="outline" size="sm">
            Ver toda agenda
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {appointments.map((appointment, index) => (
            <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50">
              <div className="text-sm font-medium w-16">{appointment.time}</div>
              <img
                src={appointment.avatar}
                alt={appointment.patient}
                className="w-8 h-8 rounded-full"
              />
              <div className="flex-1">
                <h4 className="font-medium">{appointment.patient}</h4>
                <p className="text-sm text-gray-500">{appointment.procedure}</p>
              </div>
              <Badge
                variant={appointment.status === 'confirmed' ? 'success' : 'warning'}
              >
                {appointment.status === 'confirmed' ? 'Confirmado' : 'Pendente'}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DaySchedule;