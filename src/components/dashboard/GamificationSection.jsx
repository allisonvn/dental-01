import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Trophy } from 'lucide-react';

const GamificationSection = ({ data }) => (
  <Card className="col-span-2">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Trophy className="w-5 h-5 text-yellow-500" />
        Progresso e Conquistas
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <div>
              <span className="text-lg font-bold">Nível {data.level}</span>
              <Badge variant="outline" className="ml-2">Dentista Expert</Badge>
            </div>
            <span className="text-sm text-gray-500">
              {data.xp}/{data.nextLevelXp} XP
            </span>
          </div>
          <Progress value={(data.xp/data.nextLevelXp) * 100} className="h-2" />
        </div>

        <div>
          <h4 className="font-semibold mb-3">Conquistas Recentes</h4>
          <div className="grid grid-cols-3 gap-4">
            {data.achievements.map(achievement => (
              <Card key={achievement.id} className="p-4 bg-gray-50 dark:bg-gray-800">
                <div className="text-center">
                  <span className="text-2xl">{achievement.icon}</span>
                  <h5 className="text-sm font-medium mt-2">{achievement.name}</h5>
                  <Progress value={achievement.progress} className="h-1 mt-2" />
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Desafios do Dia</h4>
          <div className="space-y-3">
            {data.dailyChallenges.map(challenge => (
              <Card key={challenge.id} className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h5 className="font-medium">{challenge.name}</h5>
                    <Progress value={(challenge.progress/challenge.total) * 100} className="h-1 mt-2 w-32" />
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-gray-500">
                      {challenge.progress}/{challenge.total}
                    </span>
                    <p className="text-xs text-green-500">+{challenge.reward} XP</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default GamificationSection;