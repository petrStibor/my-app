import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from 'recharts'

type ChartData = { name: string; value: number }[]

type ChartComponentProps = {
  variant: 'area' | 'pie' | 'bar'
  data: ChartData
  width?: string | number
  height?: string | number
  colors?: string[]
}

const BbChart: React.FC<ChartComponentProps> = ({
  variant,
  data,
  width = '100%',
  height = 400,
  colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'],
}) => {
  const renderChart = () => {
    switch (variant) {
      case 'area':
        return (
          <ResponsiveContainer width={width} height={height}>
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='name' />
              <YAxis />
              <Tooltip />
              <Area
                type='monotone'
                dataKey='value'
                stroke='#8884d8'
                fill='#8884d8'
              />
            </AreaChart>
          </ResponsiveContainer>
        )
      case 'pie':
        return (
          <ResponsiveContainer width={width} height={height}>
            <PieChart>
              <Pie
                data={data}
                innerRadius={60}
                outerRadius={80}
                fill='#8884d8'
                paddingAngle={5}
                dataKey='value'
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        )
      case 'bar':
        return (
          <ResponsiveContainer width={width} height={height}>
            <BarChart data={data}>
              <XAxis dataKey='name' />
              <YAxis />
              <Tooltip />
              <Bar dataKey='value' fill='#8884d8' />
            </BarChart>
          </ResponsiveContainer>
        )
      default:
        return null
    }
  }

  return <>{renderChart()}</>
}

export default BbChart
