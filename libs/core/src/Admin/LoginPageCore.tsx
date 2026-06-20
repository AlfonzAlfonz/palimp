"use client";

import { PalimpClientBackendContext } from "@palimp/core";
import { useMutation } from "@tanstack/react-query";
import { Alert, Button, Card, Form, Input, Typography } from "antd";
import { use } from "react";
import { queryClient } from "./queryClient";

interface Props {
  onLogin: () => void;
}

interface FormValues {
  email: string;
  password: string;
}

export const LoginPageCore = ({ onLogin }: Props) => {
  const backend = use(PalimpClientBackendContext);

  const { mutate, error, isPending } = useMutation(
    {
      mutationKey: ["palimp:login"],
      mutationFn: (values: FormValues) =>
        backend.login({
          type: "email-password",
          email: values.email,
          password: values.password,
        }),
      onSuccess: onLogin,
    },
    queryClient,
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        background: "linear-gradient(90deg, #9BF8F4, #6F7BF7)",
      }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: "* { box-sizing: border-box; margin: 0; padding: 0; }",
        }}
      ></style>
      <Card style={{ width: "100%", maxWidth: 400 }}>
        <Typography.Title level={3} style={{ marginTop: 0 }}>
          Sign in
        </Typography.Title>

        <Form<FormValues>
          layout="vertical"
          onFinish={(values) => mutate(values)}
          disabled={isPending}
          requiredMark={false}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input type="email" autoComplete="email" size="large" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password autoComplete="current-password" size="large" />
          </Form.Item>

          {error && (
            <Form.Item>
              <Alert type="error" message={error.message} showIcon />
            </Form.Item>
          )}

          <Form.Item style={{ marginBottom: 0 }}>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={isPending}
            >
              Sign in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
