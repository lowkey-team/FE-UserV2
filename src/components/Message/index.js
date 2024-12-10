import React, { forwardRef, useImperativeHandle } from "react";
import { message } from "antd";

const MessageNotification = (props, ref) => {
  const [messageApi, contextHolder] = message.useMessage({
    maxCount: 1,
  });

  useImperativeHandle(ref, () => ({
    showSuccess: (content) => {
      messageApi.open({
        type: "success",
        content: content,
      });
    },
    showError: (content) => {
      messageApi.open({
        type: "error",
        content: content,
      });
    },
    showWarning: (content) => {
      messageApi.open({
        type: "warning",
        content: content,
      });
    },
  }));

  return <>{contextHolder}</>;
};

const ForwardedMessageNotification = forwardRef(MessageNotification);

export default ForwardedMessageNotification;
