import { server} from "@paperpod/common";
import { articleRoutes } from "./routes/routes";


export const app =server.app.appWithBodyParser(
    server.app.appWithEnvironment()
) .use(articleRoutes); 
 