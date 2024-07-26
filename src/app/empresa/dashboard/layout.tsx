

export default function DashboardLayout({
    children,
    age,
    graphSales,
    graphSex,
    graphPipeline,
    totals,
  }: {
    children: React.ReactNode,
    age: React.ReactNode,
    graphSales: React.ReactNode,
    graphSex: React.ReactNode,
    graphPipeline: React.ReactNode,
    totals: React.ReactNode,
  }) {
    return (
      <div>
        <div>{children}</div>
        <div>{totals}</div>
        <div>{graphSales}</div>
        <div>{graphSex}</div>
        <div>{graphPipeline}</div>
        <div>{age}</div>
      </div>
    );
  }