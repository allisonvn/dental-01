import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Activity, Download } from 'lucide-react';

const documents = [
  { name: 'Resultado Exame.pdf', size: '2.5mb' },
  { name: 'Resultado Exame.doc', size: '2mb' },
  { name: 'Prescrição.pdf', size: '3mb' },
  { name: 'Radiografia.doc', size: '3mb' },
  { name: 'Glicemia.pdf', size: '3mb' },
  { name: 'Resultado Exame.doc', size: '2mb' }
];

const DocumentsCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Documentos e Relatórios</span>
          <Button variant="link" size="sm" className="text-blue-500">
            Ver Todos
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {documents.map((doc, index) => (
            <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-100">
                  <Activity className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium">{doc.name}</h4>
                  <p className="text-sm text-gray-500">{doc.size}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="text-red-500">
                  <Activity className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-green-500">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentsCard;