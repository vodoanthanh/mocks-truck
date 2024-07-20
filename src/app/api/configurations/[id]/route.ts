import { NextRequest, NextResponse } from "next/server";

import { HttpStatusCode } from "@/constants";
import { HttpHelper } from "@/helpers";
import { ConfigurationService } from "@/services";

export const GET = async (
  _: any,
  { params: { id } }: { params: { id: number } }
) => {
  try {
    return NextResponse.json(
      HttpHelper.buildSuccessResponse(
        await ConfigurationService.findByIdOrThrowError(Number(id))
      )
    );
  } catch (err: any) {
    return NextResponse.json(HttpHelper.buildErrorResponse(err), {
      status: HttpStatusCode.NotFound,
    });
  }
};

export const PATCH = async (
  request: NextRequest,
  { params: { id } }: { params: { id: number } }
) => {
  const data = await request.json();

  try {
    return NextResponse.json(
      HttpHelper.buildSuccessResponse(
        await ConfigurationService.updateById(Number(id), data)
      )
    );
  } catch (err: any) {
    return NextResponse.json(HttpHelper.buildErrorResponse(err), {
      status: err.code || HttpStatusCode.NotFound,
    });
  }
};

export const DELETE = async (
  _: any,
  { params: { id } }: { params: { id: number } }
) => {
  try {
    return NextResponse.json(
      HttpHelper.buildSuccessResponse(
        await ConfigurationService.deleteById(Number(id))
      )
    );
  } catch (err: any) {
    return NextResponse.json(HttpHelper.buildErrorResponse(err), {
      status: err.code || HttpStatusCode.NotFound,
    });
  }
};
