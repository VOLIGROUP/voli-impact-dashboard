
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart, PieChart, AreaChart, Bar, Line, Pie, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

interface ChartData {
  name: string;
  value: number;
  category?: string;
}

interface ChartCardProps {
  title: string;
  chartType: 'bar' | 'line' | 'pie' | 'area';
  data: ChartData[];
  color?: string;
  multiSeries?: boolean;
}

const COLORS = ['#bfff00', '#a3d900', '#8cb300', '#7a9900', '#d9ff66', '#ffb380', '#ff9933', '#ff8000', '#cc6600', '#994d00'];

const ChartCard: React.FC<ChartCardProps> = ({
  title,
  chartType,
  data,
  color = 'voli-primary',
  multiSeries = false
}) => {
  const renderChart = () => {
    if (multiSeries && data.length > 0 && data[0].category) {
      // Group data by categories for multi-series charts
      const categories = [...new Set(data.map(item => item.category))];
      const names = [...new Set(data.map(item => item.name))];
      
      // Transform data for multi-series charts
      const transformedData = names.map(name => {
        const result: any = { name };
        categories.forEach(category => {
          const dataPoint = data.find(item => item.name === name && item.category === category);
          result[category as string] = dataPoint ? dataPoint.value : 0;
        });
        return result;
      });

      switch (chartType) {
        case 'bar':
          return (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={transformedData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                {categories.map((category, index) => (
                  <Bar 
                    key={category as string} 
                    dataKey={category as string} 
                    fill={COLORS[index % COLORS.length]} 
                    radius={[4, 4, 0, 0]} 
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          );

        case 'line':
          return (
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={transformedData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                {categories.map((category, index) => (
                  <Line 
                    key={category as string} 
                    type="monotone" 
                    dataKey={category as string} 
                    stroke={COLORS[index % COLORS.length]} 
                    strokeWidth={2} 
                    dot={{ fill: COLORS[index % COLORS.length], strokeWidth: 2, r: 4 }} 
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          );

        case 'area':
          return (
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={transformedData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                {categories.map((category, index) => (
                  <Area 
                    key={category as string} 
                    type="monotone" 
                    dataKey={category as string} 
                    stroke={COLORS[index % COLORS.length]} 
                    fill={COLORS[index % COLORS.length]} 
                    fillOpacity={0.2} 
                  />
                ))}
              </AreaChart>
            </ResponsiveContainer>
          );

        default:
          return renderSingleSeriesChart();
      }
    } else {
      return renderSingleSeriesChart();
    }
  };

  const renderSingleSeriesChart = () => {
    switch (chartType) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="value" fill="#bfff00" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );
        
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#bfff00" strokeWidth={2} dot={{ fill: '#bfff00', strokeWidth: 2, r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        );
        
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );
        
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Area type="monotone" dataKey="value" stroke="#bfff00" fill="#bfff00" fillOpacity={0.2} />
            </AreaChart>
          </ResponsiveContainer>
        );
        
      default:
        return null;
    }
  };

  return (
    <Card className="voli-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {renderChart()}
      </CardContent>
    </Card>
  );
};

export default ChartCard;
