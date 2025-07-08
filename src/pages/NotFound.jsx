import React from 'react';
import { Button } from '../components/ui/button.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card.jsx';
import { Baby, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="max-w-md w-full text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <Baby className="w-16 h-16 text-primary" />
          </div>
          <CardTitle className="text-2xl">ページが見つかりません</CardTitle>
          <CardDescription>
            お探しのページは見つかりませんでした。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={() => window.location.href = '/'}
            className="w-full"
          >
            <Home className="w-4 h-4 mr-2" />
            ホームに戻る
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}