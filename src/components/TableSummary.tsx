import { ColumnsType } from "antd/es/table";
import { IForm } from "../models/data";
import { Button, Form, Input, Popconfirm, Table } from "antd";
import useFormInstance from "antd/es/form/hooks/useFormInstance";

interface Props {
  data?: IForm[];
  setData: React.Dispatch<React.SetStateAction<IForm[]>>;
}

const TableSummary = ({ data, setData }: Props) => {
  const columns: ColumnsType<IForm> = [
    {
      title: "Product name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Cost",
      dataIndex: "cost",
      key: "cost",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "quantity",
      render: (_, record) => <span>{record.cost * record.quantity}</span>,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Popconfirm
          title="Delete item?"
          description="Are you sure you want to delete this item?"
          onConfirm={() =>
            setData((old) => {
              const index = old.findIndex(
                (d) => d.id.toString() === record.id.toString()
              );
              return old.splice(index, 1);
            })
          }
          okText="Yes"
          cancelText="No"
        >
          <Button
            type="link"
            style={{ color: "tomato" }}
            onClick={() => {
              console.log("clicked", record);
            }}
          >
            Remove
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return <Table dataSource={data} columns={columns} />;
};

export default TableSummary;
