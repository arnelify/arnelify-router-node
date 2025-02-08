#!/usr/bin/env bun

import Ctx from "./contracts/ctx";
import Res from "./contracts/res";

/**
 * Arnelify Router
 */
class ArnelifyRouter {

  #controllers: object[] = [];
  #lib: any = null;

  constructor() {
    this.#lib = require("../build/Release/arnelify-router.node");
    this.#lib.router_create();
  }

  /**
   * Callback
   * @param {string} message 
   * @param {boolean} isError 
   */
  #callback = (message: string, isError: boolean): void => {
    if (isError) {
      console.log(`[Arnelify Router]: NodeJS error: ${message}`);
      return;
    }

    console.log(`[Arnelify Router]: ${message}`);
  };

  /**
   * Any
   * @param {string} pattern 
   * @param {CallableFunction} controller 
   */
  any(pattern: string, controller: (ctx: Ctx) => Res): void {
    this.#controllers.push(controller);
    this.#lib.router_any(pattern);
  }

  /**
   * Get
   * @param {string} pattern 
   * @param {CallableFunction} controller 
   */
  get(pattern: string, controller: (ctx: Ctx) => Res): void {
    this.#controllers.push(controller);
    this.#lib.router_get(pattern);
  }

  /**
   * Post
   * @param {string} pattern 
   * @param {CallableFunction} controller 
   */
  post(pattern: string, controller: (ctx: Ctx) => Res): void {
    this.#controllers.push(controller);
    this.#lib.router_post(pattern);
  }

  /**
   * Put
   * @param {string} pattern 
   * @param {CallableFunction} controller 
   */
  put(pattern: string, controller: (ctx: Ctx) => Res): void {
    this.#controllers.push(controller);
    this.#lib.router_put(pattern);
  }

  /**
   * Patch
   * @param {string} pattern 
   * @param {CallableFunction} controller 
   */
  patch(pattern: string, controller: (ctx: Ctx) => Res): void {
    this.#controllers.push(controller);
    this.#lib.router_patch(pattern);
  }

  /**
   * Delete
   * @param {string} pattern 
   * @param {CallableFunction} controller 
   */
  delete(pattern: string, controller: (ctx: Ctx) => Res): void {
    this.#controllers.push(controller);
    this.#lib.router_delete(pattern);
  }

  /**
   * Find
   * @param {string} method 
   * @param {string} path 
   * @returns 
   */
  find(method: string, path: string): { [key: string]: any } | null {
    const routeOpt: string = this.#lib.router_find(method, path);
    if (routeOpt === "{}") return null;

    let route: { [key: string]: any };

    try {
      route = JSON.parse(routeOpt);
      
    } catch (err) {
      this.#callback("Route must be in valid JSON format.", true);
      process.exit(1);
    }

    return route;
  }

  /**
   * 
   * @param {number} id
   * @returns 
   */
  getController(id: number): any {
    const hasController = !!this.#controllers[id];
    if (hasController) return this.#controllers[id];
    return null;
  }

  /**
   * Destroy
   */
  destroy(): void {
    this.#lib.router_destroy();
  }
}

export default ArnelifyRouter;