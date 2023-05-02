'use client';

import { StyleProvider, createCache, extractStyle } from "@ant-design/cssinjs";
import React, { useState } from "react";
import { useServerInsertedHTML } from 'next/navigation'
import { ConfigProvider } from "antd";
import { configObj } from "@/config";

// suppress useLayoutEffect warnings when not in browser environment
if (!process.browser) React.useLayoutEffect = React.useEffect;

export function AntdProvider({ children }: { children: React.ReactNode }) {
  const [cache] = useState(() => createCache())

  const render = <>{children}</>

  useServerInsertedHTML(() => {
    return (
      <script
        dangerouslySetInnerHTML={{
          __html: `</script>${extractStyle(cache)}<script>`,
        }}
      />
    )
  })

  if (typeof window !== 'undefined') return render;

  return (
    <StyleProvider hashPriority="high" cache={cache}>
      {render}
    </StyleProvider>
  )
}



export default function AntdConfigProvider({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: configObj.colorPrimary
        }
      }}
    >
      <AntdProvider>{children}</AntdProvider>
    </ConfigProvider>
  )
}