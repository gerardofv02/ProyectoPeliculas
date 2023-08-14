
import { Application, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { getPelis,getPelisTipos,getPeli } from "./resolvers/get.ts";
import { addPeli } from "./resolvers/post.ts";
import { deletePeli } from "./resolvers/delete.ts";

const router = new Router();
router
.get("/getPelis", getPelis)
.get("/getPelisTipos/:tipo", getPelisTipos)
.get("/getPeli/:name" , getPeli)
.post("/addPeli", addPeli)
.delete("/deletePeli/:_id", deletePeli)


const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
