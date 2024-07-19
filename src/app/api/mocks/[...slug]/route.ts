import { NextRequest, NextResponse } from "next/server";

import {
  DEFAULT_SESSION_ID,
  HTTP_SESSION_ID_HEADER,
  HttpMethod,
  HttpStatusCode,
} from "@/constants";
import { HttpHelper } from "@/helpers";
import { SessionService } from "@/services";

const handler = (
  request: NextRequest,
  { params: { slug } }: { params: { slug: string[] } }
) => {
  try {
    const sessionId =
      request.headers.get(HTTP_SESSION_ID_HEADER) || DEFAULT_SESSION_ID;
    const endpoint = "/" + slug.join("/");
    const method = request.method.toUpperCase() as HttpMethod;

    const apiMockResponse = SessionService.getAPIMockResponse(
      sessionId,
      endpoint,
      method
    );
    return NextResponse.json(apiMockResponse.dataResponse, {
      status: apiMockResponse.httpStatus,
    });
  } catch (err: any) {
    return NextResponse.json(HttpHelper.buildErrorResponse(err), {
      status: HttpStatusCode.NotFound,
    });
  }
};

export {
  handler as DELETE,
  handler as GET,
  handler as PATCH,
  handler as POST,
  handler as PUT,
};
