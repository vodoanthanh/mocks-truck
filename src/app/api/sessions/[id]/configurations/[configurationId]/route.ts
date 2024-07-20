import { NextResponse } from "next/server";

import { HttpStatusCode } from "@/constants";
import { HttpHelper } from "@/helpers";
import { ConfigurationService, SessionService } from "@/services";

export const PUT = async (
  _: any,
  {
    params: { id, configurationId },
  }: { params: { id: string; configurationId: number } }
) => {
  try {
    const configuration = await ConfigurationService.findByIdOrThrowError(
      Number(configurationId)
    );
    return NextResponse.json(
      HttpHelper.buildSuccessResponse(
        SessionService.upsertConfigurationToSession(id, configuration)
      )
    );
  } catch (err: any) {
    return NextResponse.json(HttpHelper.buildErrorResponse(err), {
      status: HttpStatusCode.NotFound,
    });
  }
};
