import { NextResponse } from "next/server";

const DOCTOR_HOSTER_CART_URL = "https://members.doctorhoster.com/cart.php?a=add&currency=3&domain=register";
const DOCTOR_HOSTER_CHECK_URL = "https://members.doctorhoster.com/index.php?rp=/domain/check";
const DEFAULT_TLDS = [".com", ".co", ".net", ".org", ".pk"];

type DoctorHosterDomainResult = {
  domainName?: string;
  status?: string;
  isAvailable?: boolean;
  isRegistered?: boolean;
  isValidDomain?: boolean;
  domainErrorMessage?: string;
  pricing?: Record<string, {
    register?: string;
    transfer?: string;
    renew?: string;
  }>;
  shortestPeriod?: {
    period?: number;
    register?: string;
    transfer?: string;
    renew?: string;
  };
};

function normalizeDomain(value: unknown) {
  if (typeof value !== "string") {
    return "";
  }

  return value
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .split(/[/?#]/)[0]
    .replace(/[^a-z0-9.-]/g, "");
}

function getSearchBase(domain: string) {
  return domain.split(".")[0]?.replace(/^-+|-+$/g, "") ?? "";
}

function getCookieHeader(response: Response) {
  const setCookie = response.headers.get("set-cookie");

  if (!setCookie) {
    return "";
  }

  return setCookie
    .split(/,(?=\s*[^;,=]+=[^;,]+)/)
    .map((cookie) => cookie.split(";")[0]?.trim())
    .filter(Boolean)
    .join("; ");
}

function getCsrfToken(html: string) {
  return (
    html.match(/var csrfToken = '([^']+)'/)?.[1] ??
    html.match(/name="token"\s+value="([^"]+)"/)?.[1] ??
    ""
  );
}

async function checkDomain({
  cookieHeader,
  domain,
  token,
}: {
  cookieHeader: string;
  domain: string;
  token: string;
}) {
  const checkResponse = await fetch(DOCTOR_HOSTER_CHECK_URL, {
    method: "POST",
    cache: "no-store",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      cookie: cookieHeader,
      "user-agent": "Devisgon domain search",
    },
    body: new URLSearchParams({
      token,
      type: "domain",
      domain,
      source: "cartAddDomain",
    }),
  });

  if (!checkResponse.ok) {
    throw new Error("Domain result was not returned.");
  }

  const checkJson = await checkResponse.json();
  return checkJson?.result?.[0] as DoctorHosterDomainResult | undefined;
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const domain = normalizeDomain(body.domain);
    const searchBase = getSearchBase(domain);

    if (!domain || !searchBase) {
      return NextResponse.json({ success: false, error: "Enter a domain name." }, { status: 400 });
    }

    const cartResponse = await fetch(DOCTOR_HOSTER_CART_URL, {
      cache: "no-store",
      headers: {
        "user-agent": "Devisgon domain search",
      },
    });

    if (!cartResponse.ok) {
      return NextResponse.json({ success: false, error: "Domain search is unavailable." }, { status: 502 });
    }

    const cartHtml = await cartResponse.text();
    const token = getCsrfToken(cartHtml);
    const cookieHeader = getCookieHeader(cartResponse);

    if (!token) {
      return NextResponse.json({ success: false, error: "Domain search token was not returned." }, { status: 502 });
    }

    const requestedTld = domain.includes(".") ? `.${domain.split(".").slice(1).join(".")}` : "";
    const tlds = Array.from(new Set([requestedTld, ...DEFAULT_TLDS].filter(Boolean)));
    const checkedResults = await Promise.allSettled(
      tlds.map(async (tld) => checkDomain({ cookieHeader, domain: `${searchBase}${tld}`, token })),
    );

    const results = checkedResults.map((settled, index) => {
      const fallbackDomain = `${searchBase}${tlds[index]}`;

      if (settled.status === "rejected" || !settled.value) {
        return {
          domainName: fallbackDomain,
          status: "Could not check",
          isAvailable: false,
          isRegistered: false,
          isValidDomain: false,
          errorMessage: "Could not check this extension.",
          shortestPeriod: null,
          pricing: null,
        };
      }

      const result = settled.value;

      return {
        domainName: result.domainName ?? fallbackDomain,
        status: result.status ?? "",
        isAvailable: Boolean(result.isAvailable),
        isRegistered: Boolean(result.isRegistered),
        isValidDomain: result.isValidDomain !== false,
        errorMessage: result.domainErrorMessage ?? "",
        shortestPeriod: result.shortestPeriod ?? null,
        pricing: result.pricing ?? null,
      };
    });

    return NextResponse.json({
      success: true,
      query: searchBase,
      results,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Domain search failed.";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
