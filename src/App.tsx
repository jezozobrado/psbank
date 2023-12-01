import { useState } from "react";
import useGetData from "./hooks/useGetData";
import { Button, Col, Form, Input, Row } from "antd";
import { IForm } from "./models/data";
import TableSummary from "./components/TableSummary";

const { Search } = Input;

const App = () => {
  const data = useGetData();
  const [form] = Form.useForm();
  const [form2] = Form.useForm();

  const [item, setItem] = useState<IForm[]>([]);

  const handleFinish = (values: IForm) => {
    setItem((old) => [...old, values]);

    form2.setFieldsValue({
      total: item.reduce((acc, a) => acc + a.cost * a.quantity, 0),
    });
  };

  return (
    <>
      <div
        style={{ width: "100vw", display: "flex", justifyContent: "center" }}
      >
        <Form form={form} onFinish={handleFinish}>
          <Search
            placeholder="Search here"
            onSearch={(searchText) => {
              const item = data.find((d) => d.id.toString() === searchText);

              if (item) form.setFieldsValue({ ...item, quantity: undefined });
              else form.resetFields();
            }}
            style={{
              width: "100%",
              display: "block",
              marginBottom: 10,
              marginTop: 10,
            }}
          />

          <Row gutter={12}>
            <Col span={11}>
              <Form.Item label="Product ID" name="id">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item label="Product name" name="name">
                <Input disabled />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span={11}>
              <Form.Item label="Cost" name="cost">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item
                label="Quantity"
                name="quantity"
                rules={[{ required: true, message: "Quantity is required" }]}
              >
                <Input type="number" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Add to cart
            </Button>
          </Form.Item>

          <TableSummary data={item} setData={setItem} />
        </Form>
      </div>
      <div
        style={{ width: "100vw", display: "flex", justifyContent: "center" }}
      >
        <Form form={form2} style={{ marginTop: 10 }}>
          <Row gutter={12}>
            <Col span={11}>
              <Form.Item label="Total amount" name="total">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item label="Payment" name="payment">
                <Input type="number" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default App;
