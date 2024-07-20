import { NextRequest, NextResponse } from "next/server";

import { HttpStatusCode } from "@/constants";
import { HttpHelper } from "@/helpers";
import { SessionService } from "@/services";
import { Configuration } from "@/types";

export const GET = async (
  _: any,
  { params: { id } }: { params: { id: string } }
) => {
  try {
    return NextResponse.json(
      HttpHelper.buildSuccessResponse(SessionService.findByIdOrThrowError(id))
    );
  } catch (err: any) {
    return NextResponse.json(HttpHelper.buildErrorResponse(err), {
      status: HttpStatusCode.NotFound,
    });
  }
};

export const PUT = async (
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) => {
  const data = (await request.json()) as { configuration: Configuration };
  return NextResponse.json(
    HttpHelper.buildSuccessResponse(
      SessionService.upsertConfigurationToSession(id, data.configuration)
    ),
    { status: HttpStatusCode.Created }
  );
};

export const DELETE = async (
  _: any,
  { params: { id } }: { params: { id: string } }
) => {
  try {
    return NextResponse.json(
      HttpHelper.buildSuccessResponse(SessionService.deleteById(id))
    );
  } catch (err: any) {
    return NextResponse.json(HttpHelper.buildErrorResponse(err), {
      status: HttpStatusCode.NotFound,
    });
  }
};
