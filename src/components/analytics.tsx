import { FC } from "react";
import Script from "next/script";

const Analytics: FC = () => {
  return (
    <>
      <Script
        async
        id="analytics-1"
        src="https://www.googletagmanager.com/gtag/js?id=G-M3TNG81V67"
        strategy="afterInteractive"
      ></Script>
      <Script id="analytics-2">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
  
          gtag('config', 'G-M3TNG81V67');
        `}
      </Script>
    </>
  );
};

export default Analytics;
