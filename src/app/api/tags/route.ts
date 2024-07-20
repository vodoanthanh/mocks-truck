import _ from "lodash";
import { NextRequest, NextResponse } from "next/server";

import { SPLIT_ITEM_SYMBOL } from "@/constants";
import { HttpHelper } from "@/helpers";
import { TagService } from "@/services";
import { TagQuery } from "@/types";

export const GET = async (request: NextRequest) => {
  const query: TagQuery = {
    query: request.nextUrl.searchParams.get("query") || undefined,
  };
  if (request.nextUrl.searchParams.has("ids")) {
    query.ids = _.map(
      String(request.nextUrl.searchParams.get("ids")).split(SPLIT_ITEM_SYMBOL),
      Number
    );
  }

  return NextResponse.json(
    HttpHelper.buildSuccessResponse(await TagService.findAll(query))
  );
};

export const POST = async (request: NextRequest) => {
  const data = await request.json();

  return NextResponse.json(
    HttpHelper.buildSuccessResponse(await TagService.create(data))
  );
};
