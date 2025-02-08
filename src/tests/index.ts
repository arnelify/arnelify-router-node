#!/usr/bin/env bun

import ArnelifyRouter from "../index";

import Ctx from "contracts/ctx";
import Res from "contracts/res";

(function main(): number {

  const router: ArnelifyRouter = new ArnelifyRouter();

  router.get("/", (ctx: Ctx): Res => {
    return ctx;
  });

  router.get("/:id", (ctx: Ctx): Res => {
    return ctx;
  });

  const routeOpt: {[key: string]: any} | null = router.find("GET", "/1");
  if (!routeOpt) {
    console.log("[Arnelify Router]: Route not found.");
    return 0;
  }

  const route = routeOpt;
  console.log(`[Arnelify Router]: Route serialized: ${JSON.stringify(route)}`);

  const controllerOpt: CallableFunction | null = router.getController(route.id);
  if (!controllerOpt) {
    console.log('[Arnelify Router]: Controller not found.');
    return 1;
  }

  const controller: CallableFunction = controllerOpt;
  const res = controller({
    code: 200,
    success: "Welcome to Arnelify Router"
  });

  console.log(`[Arnelify Router]: Response: ${JSON.stringify(res)}`);
  return 0;

})();