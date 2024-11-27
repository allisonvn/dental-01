import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Award, Activity, Users, Target, Settings } from 'lucide-react';

const treatments = [
  { icon: Star, name: 'Clínica Geral', doctors: '57 Dentistas', time: '08:45' },
  { icon: Award, name: 'Ortodontia', doctors: '85 Dentistas', time: '08:45' },
  { icon: Activity, name: 'Endodontia', doctors: '60 Dentistas', time: '08:45' },
  { icon: Users, name: 'Odontopediatria', doctors: '120 Dentistas', time: '08:45' },
  { icon: Target, name: 'Periodontia', doctors: '25 Dentistas', time: '08:45' },
  { icon: Settings, name: 'Prótese Dentária', doctors: '95 Dentistas', time: '08:45' }
];

const TreatmentsCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Tratamentos Disponíveis</span>
          <Button variant="link" size="sm" className="text-blue-500">
            Ver Todos
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {treatments.map((treatment, index) => (
            <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-100">
                  <treatment.icon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium">{treatment.name}</h4>
                  <p className="text-sm text-gray-500">{treatment.doctors}</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">{treatment.time}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TreatmentsCard;