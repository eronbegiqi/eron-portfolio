"use client";

import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";

export function CalBooking() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "15min" });
      cal("ui", {
        cssVarsPerTheme: {
          dark: { "cal-brand": "#F59E0B" },
          light: { "cal-brand": "#F59E0B" },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <button
      data-cal-namespace="15min"
      data-cal-link="eronbegiqi/15min"
      data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
      type="button"
      className="w-full"
    />
  );
}
