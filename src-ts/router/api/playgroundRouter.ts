import { Request, Response, Router } from "express";
import GetPlaygroundHandler from "../../handler/api/playground/GetPlaygroundHandler";
import PostPlaygroundHandler from "../../handler/api/playground/PostPlaygroundHandler";
const router = Router();
router.get('/', async (req: Request, res: Response) => await GetPlaygroundHandler(req, res));
router.post('/', async (req: Request, res: Response) => await PostPlaygroundHandler(req, res));
export default router;
