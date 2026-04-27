import type { Metadata } from "next";
import CloudPhonePage from "./cloud-phone-page";

export const metadata: Metadata = {
  title: "MCM Cloud Phone · AI Business Communications | MyCountryMobile",
  description:
    "Calling, video, SMS, voicemail, and AI on one USA-compliant platform. STIR/SHAKEN ready. 14-day free trial.",
  alternates: { canonical: "/products/cloud-phone" },
  openGraph: {
    type: "website",
    title: "MCM Cloud Phone · AI Business Communications",
    description:
      "Calling, video, SMS, voicemail, and AI on one USA-compliant platform.",
    url: "https://mycountrymobile.com/products/cloud-phone",
  },
  twitter: {
    card: "summary_large_image",
    title: "MCM Cloud Phone · AI Business Communications",
    description:
      "Calling, video, SMS, voicemail, and AI on one USA-compliant platform.",
  },
};

export default function Page() {
  return <CloudPhonePage />;
}
