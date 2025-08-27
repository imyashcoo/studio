
'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import Script from 'next/script'
import { useEffect } from 'react'

export const GoogleAnalytics = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_ID;


  useEffect(() => {
    if (!gaMeasurementId) return;
    const url = `${pathname}?${searchParams}`
    window.gtag('config', gaMeasurementId, {
      page_path: url,
    })
  }, [pathname, searchParams, gaMeasurementId])

  if (!gaMeasurementId) {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaMeasurementId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  )
}
