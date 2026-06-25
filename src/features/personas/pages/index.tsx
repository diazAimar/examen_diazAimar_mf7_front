import { Spin } from "antd";
import useGetPersonas from "../../../hooks/personas/useGetPersonas";
import { PersonasTable } from "../components/PersonasTable";

const PersonasPage = () => {
  const { data, isLoading, error } = useGetPersonas();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-semibold">Personas</h1>

      {isLoading && (
        <div className="flex justify-center py-12">
          <Spin size="large" />
        </div>
      )}

      {error && <div className="text-danger">Error: {error.message}</div>}

      {!isLoading && !error && data && <PersonasTable records={data} />}
    </div>
  );
};

export default PersonasPage;
