import { useState } from "react";
import axios from "axios";
import { Form, Input, Button, Space, InputNumber, Divider, message } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const CreateOrUpdateInvoice = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values: any) => {
        setLoading(true);

        try {
            // Calculate totalAmount = sum of (quantity * price) for line items
            const totalAmount = values.lineItems.reduce(
                (sum: number, item: any) => sum + item.quantity * item.price,
                0
            );

            const payload = {
                customerDetails: values.clientName,
                date: new Date(),
                totalAmount: String(totalAmount),
                lineItems: values.lineItems.map((item: any) => ({
                    description: item.description,
                    quantity: item.quantity,
                    amount: String(item.price),
                })),
            };

            await axios.post("/api/invoice", payload, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            message.success("Invoice created successfully!");
            form.resetFields();
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                const msg = error.response?.data?.message || error.message || "Server error";
                message.error(msg);
            } else {
                message.error("Unexpected error occurred");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-[380px] mx-auto p-4">
            <h2>Create an Invoice</h2>

            <Form
                form={form}
                name="invoiceForm"
                layout="vertical"
                onFinish={onFinish}
                initialValues={{
                    dueDate: dayjs(),
                    lineItems: [{ description: "", quantity: 1, price: 0 }],
                }}
                autoComplete="off"
            >
                <Form.Item
                    label="Client Name"
                    name="clientName"
                    rules={[{ required: true, message: "Please enter the client name" }]}
                >
                    <Input placeholder="Client Name" />
                </Form.Item>

                <Divider />

                <Form.List
                    name="lineItems"
                    rules={[
                        {
                            validator: async (_, lineItems) => {
                                if (!lineItems || lineItems.length < 1) {
                                    return Promise.reject(new Error("At least one line item is required"));
                                }
                            },
                        },
                    ]}
                >
                    {(fields, { add, remove }, { errors }) => (
                        <div className="flex flex-col gap-4">
                            <label className="block font-semibold mb-2">Line Items</label>
                            {fields.map(({ key, name, ...restField }) => (
                                <Space
                                    key={key}
                                    direction="vertical"
                                    className="w-full border-b pb-4 mb-4"
                                    size={12}
                                >
                                    <Form.Item
                                        {...restField}
                                        name={[name, "description"]}
                                        rules={[{ required: true, message: "Missing description" }]}
                                        className="w-full"
                                    >
                                        <Input placeholder="Description" />
                                    </Form.Item>

                                    <div className="flex gap-4 items-start">
                                        <Form.Item
                                            {...restField}
                                            name={[name, "quantity"]}
                                            rules={[
                                                { required: true, message: "Missing quantity" },
                                                { type: "number", min: 1, message: "Quantity must be > 0" },
                                            ]}
                                            className="w-[100px]"
                                        >
                                            <InputNumber min={1} placeholder="Qty" />
                                        </Form.Item>

                                        <Form.Item
                                            {...restField}
                                            name={[name, "price"]}
                                            rules={[
                                                { required: true, message: "Missing price" },
                                                { type: "number", min: 1, message: "Price must be > 0" },
                                            ]}
                                            className="w-[140px]"
                                        >
                                            <InputNumber<number>
                                                min={1}
                                                placeholder="Price"
                                                formatter={(value) => `$ ${value}`}
                                            // parser={(value) => value?.replace(/\$\s?|(,*)/g, "") || ""}
                                            />
                                        </Form.Item>

                                        <MinusCircleOutlined
                                            className="text-red-600 mt-2 cursor-pointer"
                                            onClick={() => remove(name)}
                                        />
                                    </div>
                                </Space>
                            ))}

                            <Form.Item>
                                <Button
                                    type="dashed"
                                    onClick={() => add()}
                                    block
                                    icon={<PlusOutlined />}
                                    className="mb-4"
                                >
                                    Add Line Item
                                </Button>
                                <Form.ErrorList errors={errors} />
                            </Form.Item>
                        </div>
                    )}
                </Form.List>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} className="w-full">
                        Create Invoice
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export { CreateOrUpdateInvoice };
