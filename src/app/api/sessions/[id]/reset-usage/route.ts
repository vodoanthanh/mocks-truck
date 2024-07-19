import { NextResponse } from "next/server";

import { HttpStatusCode } from "@/constants";
import { HttpHelper } from "@/helpers";
import { SessionService } from "@/services";

export const PUT = async (
  _: any,
  { params: { id } }: { params: { id: string } }
) => {
  try {
    return NextResponse.json(
      HttpHelper.buildSuccessResponse(SessionService.resetUsageById(id))
    );
  } catch (err: any) {
    return NextResponse.json(HttpHelper.buildErrorResponse(err), {
      status: HttpStatusCode.NotFound,
    });
  }
};
