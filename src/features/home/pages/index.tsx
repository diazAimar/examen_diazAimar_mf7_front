import { useMemo } from "react";
import { Alert, Card, Col, Row, Spin, Statistic } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import useGetEstadisticas from "../../../hooks/expedientes/useGetEstadisticas";

const CHART_COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#3b82f6", "#a855f7"];

const HomePage = () => {
  const { data, isLoading, error } = useGetEstadisticas();

  const totalExpedientes =
    data?.por_anno.reduce((acc, item) => acc + item.cantidad, 0) ?? 0;

  const fueros = useMemo(
    () => [...new Set((data?.general ?? []).map((d) => d.fuero))],
    [data],
  );

  const generalPivoted = useMemo(() => {
    const map: Record<string, { label: string; anno: number; ciudad: string; [key: string]: string | number }> = {};
    for (const row of data?.general ?? []) {
      const key = `${row.anno}|${row.ciudad}`;
      if (!map[key]) {
        map[key] = { label: `${row.anno} · ${row.ciudad}`, anno: row.anno, ciudad: row.ciudad };
      }
      map[key][row.fuero] = row.cantidad;
    }
    return Object.values(map);
  }, [data]);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-semibold">Inicio</h1>
        <p className="mt-1 text-foreground/60">
          Estadísticas generales de expedientes
        </p>
      </div>

      {isLoading && (
        <div className="flex justify-center py-16">
          <Spin size="large" />
        </div>
      )}

      {error && (
        <Alert
          type="error"
          message="Error al cargar las estadísticas"
          description={error.message}
        />
      )}

      {data && (
        <>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic title="Total de Expedientes" value={totalExpedientes} />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic title="Años registrados" value={data.por_anno.length} />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic title="Ciudades" value={data.por_ciudad.length} />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic title="Fueros" value={data.por_fuero.length} />
              </Card>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <Card title="Expedientes por Año">
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart
                    data={data.por_anno}
                    margin={{ top: 4, right: 16, left: 0, bottom: 4 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="anno" tick={{ fontSize: 13 }} />
                    <YAxis allowDecimals={false} tick={{ fontSize: 13 }} />
                    <Tooltip
                      formatter={(value) => [Number(value), "Expedientes"]}
                      labelFormatter={(label) => `Año ${label}`}
                    />
                    <Bar dataKey="cantidad" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </Col>

            <Col xs={24} lg={12}>
              <Card title="Expedientes por Fuero">
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart
                    data={data.por_fuero}
                    layout="vertical"
                    margin={{ top: 4, right: 24, left: 8, bottom: 4 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" allowDecimals={false} tick={{ fontSize: 13 }} />
                    <YAxis
                      type="category"
                      dataKey="fuero"
                      tick={{ fontSize: 12 }}
                      width={90}
                    />
                    <Tooltip
                      formatter={(value) => [Number(value), "Expedientes"]}
                    />
                    <Bar dataKey="cantidad" fill="#22c55e" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col xs={24} md={10}>
              <Card title="Expedientes por Ciudad">
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie
                      data={data.por_ciudad}
                      dataKey="cantidad"
                      nameKey="ciudad"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label={(props: any) =>
                        `${props.ciudad} (${((props.percent ?? 0) * 100).toFixed(0)}%)`
                      }
                      labelLine
                    >
                      {data.por_ciudad.map((_, i) => (
                        <Cell
                          key={i}
                          fill={CHART_COLORS[i % CHART_COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [Number(value), "Expedientes"]}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </Col>

            <Col xs={24} md={14}>
              <Card title="Detalle General (Año × Ciudad × Fuero)">
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart
                    data={generalPivoted}
                    margin={{ top: 4, right: 16, left: 0, bottom: 48 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                      dataKey="label"
                      tick={{ fontSize: 11 }}
                      angle={-35}
                      textAnchor="end"
                      interval={0}
                    />
                    <YAxis allowDecimals={false} tick={{ fontSize: 13 }} />
                    <Tooltip />
                    <Legend verticalAlign="top" />
                    {fueros.map((fuero, i) => (
                      <Bar
                        key={fuero}
                        dataKey={fuero}
                        fill={CHART_COLORS[i % CHART_COLORS.length]}
                        radius={[4, 4, 0, 0]}
                      />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default HomePage;
